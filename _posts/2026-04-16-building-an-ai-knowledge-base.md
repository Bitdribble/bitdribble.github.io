---
layout: post
title: "Building an AI Knowledge Base"
date: 2026-04-16
categories: [machine_learning, artificial_intelligence, rag, llm]
author: "Andrei Radulescu-Banu"
image: /assets/images/blog/ai-knowledge-base-rag.svg
---

An AI knowledge base is a system that ingests documents, processes them into a form that language models can retrieve from, and serves relevant context to an LLM at query time. The dominant pattern is **RAG (Retrieval-Augmented Generation)**. Here's how the pieces fit together.

## The Core Pipeline

At the highest level, you're building two flows:

**Indexing flow** (offline, runs when documents change):

Documents → Parsing → Chunking → Embedding → Vector store + metadata store

**Query flow** (online, runs per user question):

Query → Embedding → Vector search → Reranking → Context assembly → LLM → Answer

## 1. Document Ingestion & Parsing

The unglamorous stage that makes or breaks everything downstream. Real-world documents are messy: PDFs with multi-column layouts, scanned images, tables, PPTX, HTML with nav chrome, Word docs with tracked changes.

Key decisions:

- **Text-native vs. vision-based parsing.** For PDFs, tools like `pypdf`, `pdfplumber`, or `unstructured` extract text directly. For scanned or complex layout docs, vision models (GPT-4V, Claude, or specialized tools like Azure Document Intelligence, AWS Textract, or open-source Docling/Marker) handle layout reconstruction much better.
- **Preserve structure.** Keep headings, section hierarchy, and table boundaries as metadata — you'll use them for chunking and filtering later.
- **Normalize to Markdown or structured JSON.** Markdown is a good lingua franca: it preserves hierarchy, is LLM-friendly, and is easy to chunk.

In my work with DocRouter.AI and n8n Gmail attachment pipelines, I'm already dealing with this layer — dedup logic, metadata structuring, and handling binary attachments is essentially the ingestion front door.

## 2. Chunking

LLMs have context limits and embedding models work best on coherent semantic units. You need to split documents into chunks.

Strategies, roughly from worst to best:

- **Fixed-size character/token windows** with overlap (e.g., 512 tokens, 50-token overlap). Simple, works okay, mangles semantics at boundaries.
- **Recursive splitting** (LangChain's `RecursiveCharacterTextSplitter`). Tries to split on paragraph → sentence → word boundaries in order. A solid default.
- **Structure-aware chunking.** Split on headings, sections, or document structure you extracted during parsing. One chunk per section, with the heading path prepended as context.
- **Semantic chunking.** Embed sentences, group adjacent ones by similarity. Slower to build, sometimes better retrieval.
- **Late chunking / contextual retrieval** (Anthropic published a nice writeup on this). You generate a short LLM-written context blurb for each chunk that situates it within the full document ("This chunk is from section 3 of the 2024 annual report, discussing Q4 revenue...") and prepend it before embedding. Significantly improves retrieval quality on long documents.

Chunk size is a tradeoff: smaller chunks give more precise retrieval but less context per hit; larger chunks give more context but dilute embeddings. 300–800 tokens is a common sweet spot, but tune for your corpus.

## 3. Embeddings

An embedding model turns text into a vector where semantic similarity ≈ cosine similarity.

Current options:

- **OpenAI `text-embedding-3-small`/`-large`** — strong general-purpose, cheap, easy.
- **Voyage AI** (Anthropic's recommended partner) — `voyage-3` and `voyage-3-large` are top-tier; domain-specific variants (`voyage-code-3`, `voyage-law-2`, `voyage-finance-2`) matter if your corpus is specialized.
- **Cohere `embed-v3`** — strong multilingual.
- **Open-source** — BGE, E5, GTE, Nomic, Jina. Run locally, no API cost, competitive quality. Good when data can't leave your infra.

Two things matter more than which model you pick:

1. **Use the same model for indexing and querying.** Mixing breaks retrieval.
2. **Re-embed when you switch models.** Vectors aren't portable across model families.

## 4. Vector Store

Where the embeddings (and associated metadata) live. I'm already familiar with the landscape — Pinecone (from STARLIMS RAG work), plus Weaviate and Qdrant.

Quick orientation:

- **Pinecone** — managed, fast, easy, pay-per-use. Good default for production.
- **Qdrant** — open-source, excellent filtering, self-hostable, strong Rust implementation. Great if you want control.
- **Weaviate** — open-source, built-in hybrid search, GraphQL-ish API.
- **pgvector** — Postgres extension. Not the fastest at scale, but if you already run Postgres and have <10M vectors, the operational simplicity is hard to beat.
- **Milvus**, **LanceDB**, **Chroma**, **Vespa** — each have niches.

For MongoDB shops, **Atlas Vector Search** is worth considering — you get vectors alongside your existing documents in the same cluster, which may simplify an Analytiq Hub stack.

Store alongside each vector: the chunk text, document ID, chunk position, section path, source URL, timestamps, access-control tags, and anything you might want to filter on.

## 5. Retrieval

Naive: embed the query, do kNN search, take top 10. This gets you ~70% of the way. The remaining 30% is where systems differentiate.

**Hybrid search.** Combine dense vector search with sparse lexical search (BM25). Dense retrieval nails semantic similarity; BM25 nails rare keywords, product codes, proper nouns, acronyms — the things embeddings are bad at. Fuse scores with Reciprocal Rank Fusion (RRF) or weighted combination. For many enterprise corpora, hybrid beats pure-dense by 10–20% on recall.

**Query transformation.** Raw user queries are often bad retrieval queries. Techniques:

- *Query rewriting* — have an LLM rewrite the query for search (as with GPT-4.1 on STARLIMS).
- *HyDE* (Hypothetical Document Embeddings) — have the LLM generate a fake ideal answer, embed that, search with it.
- *Multi-query* — generate N rephrasings, union the results.
- *Decomposition* — split complex questions into sub-questions, retrieve for each.

**Metadata filtering.** Pre-filter by document type, date range, access permissions, department, etc. before vector search. Much more precise than filtering after.

**Reranking.** After retrieving ~50 candidates via vector/hybrid search, run them through a cross-encoder reranker (Cohere Rerank, Voyage Rerank, or open-source BGE reranker). Cross-encoders are slower but much more accurate than bi-encoders at scoring query-document relevance. Typical impact: 5–15% improvement on retrieval quality, and often more on end-answer quality.

## 6. Context Assembly & Generation

Once you have your top-k chunks, you assemble them into a prompt. Some patterns:

- **Prepend source metadata** to each chunk: `[Source: annual_report_2024.pdf, §3.2]`. Helps the LLM cite and helps you debug.
- **Deduplicate.** If three chunks from the same document made the cut, compress or dedupe.
- **Fit the budget.** Track tokens; truncate the weakest chunks if you're over.
- **Instruct the model.** Tell it to only use the provided context, to say "I don't know" when the answer isn't there, and to cite sources.

For citation-heavy use cases, prompt the model to output structured citations (chunk IDs or span references) that you can post-process into links.

**Prompt caching** — relevant when optimizing Anthropic API latency — works well here. If you have a stable system prompt and a large but reusable retrieved context, cache the prefix. For agentic pipelines hitting the same corpus repeatedly, this is significant cost/latency savings.

## 7. Evaluation

The step most teams skip and then regret. You need to know whether changes help or hurt.

Build two eval sets:

- **Retrieval eval.** Labeled query → relevant chunks. Measure recall@k, MRR, NDCG. You can bootstrap labels with an LLM judge, then spot-check.
- **End-to-end eval.** Query → expected answer (or rubric). Measure faithfulness (is the answer grounded in retrieved context?), answer relevance, and correctness. Frameworks: Ragas, TruLens, DeepEval, LangSmith, Braintrust.

Run this on every meaningful change: new embedding model, new chunking strategy, new reranker. Otherwise you're flying blind.

## 8. Beyond Vanilla RAG

Once the basics work, the frontier is:

- **Agentic retrieval.** Let the LLM issue multiple searches, read results, decide whether to search again, follow citations. Relevant to agentic-workflow design — programmatic tool calling plus a `search_knowledge_base` tool is often better than one-shot RAG for hard questions.
- **Graph-based retrieval (GraphRAG).** Build an entity-relation graph from documents; retrieve by traversing it. Great for questions that span many documents. Microsoft's GraphRAG paper is the canonical reference.
- **MCP-accessible vector lookup.** Expose your knowledge base as an MCP server so Claude (or any MCP client) can query it as a tool. Fits architectures where MCP servers already wrap internal systems (e.g. StarLIMS).
- **Long-context-only.** With Claude's 200k+ context, small corpora (a few hundred pages) don't need retrieval at all. Stuff everything in, use prompt caching, done. Know when you're past that threshold.
- **Contextual retrieval + reranking** (Anthropic's combined approach) — the empirical state of the art for many benchmarks.
- **Continuous learning.** Log queries, retrievals, and user feedback. Use that to improve chunking, identify gaps in the corpus, and fine-tune rerankers or embedding models on your domain.

## Practical Build Order

If you're starting fresh, I'd build in this order:

1. Ingestion + Markdown normalization for your actual document types.
2. Recursive chunking, ~500 tokens, with section headers preserved as metadata.
3. `voyage-3` or `text-embedding-3-large` embeddings.
4. Pinecone or Qdrant, depending on hosting preference.
5. Hybrid search (dense + BM25) with RRF.
6. A reranker (Cohere or Voyage).
7. A simple eval harness with 50 labeled queries.
8. *Then* start layering: contextual retrieval, query rewriting, agentic loops.
