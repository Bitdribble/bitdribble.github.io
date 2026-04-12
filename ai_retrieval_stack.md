---
layout: page
title: The AI Retrieval Stack
mathjax: true
---

The **AI retrieval stack** is the pipeline that takes a query and returns relevant results. Getting it right requires answering a set of workload questions before choosing any particular tool:

* What is the **unit of retrieval**? (sentences, paragraphs, chunks, files, documents)
* Does the application need **semantic similarity**, **exact-match search**, or both?
* What **metadata filters** matter? (tenant, date, repo, workflow state)
* Is the product fundamentally a **search engine**, a **database with search**, or a **retrieval substrate**?
* Is the workload closer to **consumer AI search**, **enterprise document retrieval**, or **codebase chunk retrieval**?

A typical stack looks like:

```text
content
  ↓
chunking / parsing / field selection
  ↓
embeddings
  ↓
vector retrieval
  + lexical retrieval
  + metadata filters
  + reranking
  + application logic
  ↓
final results
```

Each layer has its own choices. The sections below cover each in turn.

---

## Vector databases: role in the stack

An embedding model maps a raw object — a sentence, paragraph, image, or code chunk — into a point in high-dimensional space. Nearby points correspond to similar meaning.

A **vector database** stores and indexes those vectors so that approximate nearest-neighbor (ANN) search is practical at production scale. It typically provides:

* storage for vectors and IDs
* ANN indexes
* metadata filters
* updates and deletes
* multitenancy or namespace isolation
* replication, scaling, and operations

That makes a vector database more than an in-process library but less than a complete search product. It handles one stage of the pipeline well. The rest — chunking, lexical search, reranking, application logic — lives outside it.

For many applications, the decisions around chunking, hybrid retrieval, filters, and reranking matter more than the specific ANN backend.

---

## Embeddings: inputs, outputs, geometry

Think of an embedding model as a function that maps a **raw object** to a **point in d-dimensional space**.

Typical pipeline:

```text
Raw input → tokenizer / preprocessing → neural encoder → embedding vector
                                                      ↓
                    search · clustering · classification · recommendation · RAG
```

You rarely inspect the coordinates directly. What matters is **relative position**:

* similar meaning → nearby vectors
* unrelated meaning → distant vectors

Training usually tries to make this geometry useful for the task by **pulling** related examples together and **pushing** unrelated examples apart.

## Choosing an embedding model

Choosing an embedding model is not just a benchmark exercise. It depends on the shape of the retrieval problem.

The main decision axes are:

* **Modality** — is the corpus text-only, image-heavy, or truly multimodal?
* **Task** — is the goal retrieval, clustering, classification, recommendation, or reranking support?
* **Query/document asymmetry** — should queries and stored documents use different embedding modes?
* **Domain** — is the corpus general text, code, legal, finance, biomedical, or something else with specialized language?
* **Dimension and storage cost** — higher-dimensional vectors may improve quality, but they also increase storage, bandwidth, and retrieval cost.
* **Latency, privacy, and deployment constraints** — can the embeddings be generated through a hosted API, or do they need to run in a private environment?

A practical sequence is:

```text
modality → task → domain → query/document asymmetry → cost/latency → provider choice
```

For many teams, the right first move is to start with a strong general-purpose retrieval embedding model, measure it on a realistic evaluation set, and only then decide whether a domain-specific or multimodal model is justified.

One subtle but important point: query embeddings are not always the same as document embeddings. Some providers explicitly optimize different embedding modes for **search queries** and **search documents**, which can improve retrieval quality.

Providers like Cohere explicitly distinguish `search_query` and `search_document`, Voyage distinguishes `query` and `document` input types, and Vertex AI supports task-type-aware embeddings for retrieval and related use cases. 

### Domain-specific and task-specific embeddings

A strong general-purpose embedding model is often the right place to start. But it is not always the right place to stop.

Some retrieval problems benefit from **domain-specific embeddings** because the meaning of similarity is different in different fields. Code, legal documents, financial text, and biomedical corpora often contain specialized language, structure, and relevance criteria that a generic model may not represent as well.

Task-specific behavior matters too. A model optimized for **document retrieval** may not be ideal for clustering, and a model optimized for **queries** may not be ideal for stored corpus documents.

In practice, the progression often looks like this:

```text
general retrieval model
→ realistic evaluation set
→ identify failure cases
→ domain-specific or task-specific model if needed
```

That sequence is usually better than prematurely fine-tuning or choosing a niche model before understanding the retrieval workload.

Voyage explicitly recommends different models for domains like legal, finance, and code, while Cohere and Vertex both expose task-aware embedding modes for retrieval and related use cases. 

## Embedding provider cheat sheet

The choice of vector database is only half the story. The embedding provider matters just as much.

| Provider | Strengths | Best fit |
| :--- | :--- | :--- |
| **OpenAI** | Strong general-purpose text embeddings; simple API; good default for many retrieval tasks | teams that want a straightforward hosted baseline |
| **Cohere** | Retrieval-oriented embedding stack; explicit `search_query` and `search_document` modes; strong RAG tooling | semantic search and RAG systems that want query/document-aware embeddings |
| **Voyage AI** | Retrieval-focused models; query/document modes; domain-specific models for code, law, and finance; multimodal support | teams optimizing retrieval quality in specialized domains |
| **Google Vertex AI** | Task-type-aware embeddings; configurable output dimensionality for text embeddings; multimodal embeddings for text, image, and video | teams already in GCP, or teams needing task-specific and multimodal support |

A useful way to think about providers is:

* **OpenAI** — strong general-purpose baseline
* **Cohere** — retrieval-first and RAG-friendly
* **Voyage** — retrieval specialist, especially for domain-specific workloads
* **Vertex AI** — task-aware and multimodal, especially attractive inside Google Cloud
````

OpenAI’s embeddings API exposes `text-embedding-3-small` and `text-embedding-3-large`. Cohere’s Embed API requires an `input_type` for newer models, including `search_document` and `search_query`. Voyage documents query/document input types and domain-specific families such as finance, law, and code. Vertex AI documents task types for embeddings and configurable output dimensionality for text embeddings, alongside a separate multimodal embeddings API. 

### Common training patterns

* **Masked / causal language modeling** — predict missing or next tokens; useful representations emerge in the hidden states
* **Contrastive learning** — positive pairs should be close, negatives far apart
* **Supervised classification with an embedding bottleneck** — encoder → embedding → classifier
* **Triplet loss** — anchor, positive, negative; enforce $d(\text{anchor}, \text{positive}) \ll d(\text{anchor}, \text{negative})$

For retrieval-focused models, **hard negatives** usually matter a lot more than easy random negatives (e.g. "Python list comprehension" vs "Python for loops tutorial" instead of vs "banana smoothie").

---

## After training: how vectors are used

Vectors support several kinds of applications:

* **semantic search** — nearest-neighbor retrieval
* **classification** — linear probes or downstream heads
* **clustering** — grouping similar items
* **recommendation** — users and items embedded in a shared space
* **RAG** — retrieve chunks to condition an LLM
* **code retrieval** — retrieve relevant files, symbols, or chunks
* **multimodal search** — align text and images or other modalities

In many systems, vectors are the **first-stage retriever**, not the final answer generator.

## Multimodal retrieval: when OCR is not enough

Many retrieval systems are described as “multimodal,” but there are really three different cases:

### 1. Text-only retrieval

This is the simplest case. The corpus is already text, or can be reduced to text without losing much meaning.

Examples:

* plain documents
* knowledge bases
* contracts
* source code
* emails

### 2. OCR-first retrieval

This is common for scanned PDFs and forms. The retrieval pipeline extracts text with OCR, then treats the result as ordinary text retrieval.

This works well when most of the important information is still captured in words.

### 3. True multimodal retrieval

This is needed when the **visual structure itself carries meaning**, not just the text.

Examples:

* screenshots
* slide decks
* diagrams
* tables where layout matters
* charts and figures
* image-heavy PDFs
* document page images
* search by screenshot or image

In these settings, OCR alone can lose important information. A multimodal embedding model can place text, images, and mixed inputs into a shared retrieval space.

This matters in practice because many enterprise corpora are only partially textual. A text-heavy invoice workflow may be well served by OCR plus text embeddings. A slide deck, dashboard screenshot, or visually complex form may require true multimodal retrieval.

A useful rule of thumb is:

```text
if the meaning survives text extraction → OCR-first may be enough
if the meaning depends on layout, figures, or images → consider multimodal embeddings
```

Vertex AI says its multimodal embeddings generate vectors from image, text, and video in a shared semantic space, and Voyage documents multimodal models for text plus content-rich images such as slide decks, screenshots, tables, and figures. Cohere also documents embedding support for text, images, and mixed text/image inputs, including PDFs.

---

## Precision, recall, and the practical knobs

**Precision** — among returned hits, how many are relevant?

$$\text{precision} = \frac{|\text{relevant} \cap \text{returned}|}{|\text{returned}|}$$

**Recall** — among all relevant items in the corpus, how many appear in the result set?

$$\text{recall} = \frac{|\text{relevant} \cap \text{returned}|}{|\text{relevant}|}$$

Usually there is tension between them:

* stricter thresholds ↑ precision, ↓ recall
* broader retrieval ↑ recall, ↓ precision

In practice, the biggest quality levers are often:

1. strong evaluation sets
2. good chunking
3. metadata modeling
4. hard negatives
5. hybrid lexical + vector retrieval
6. reranking
7. threshold and top-*K* tuning
8. domain fine-tuning

A good production recipe is usually:

```text
eval set → chunking → stronger embeddings → filters → reranker → threshold / K → domain tuning
```

before exotic modeling.

---

## BM25 and lexical search

BM25 ranks documents for a **keyword** query. It rewards:

* rare terms more than common terms
* multiple mentions, but with diminishing returns
* shorter, more focused documents over long noisy ones

For each query term $t$ in document $d$:

$$\text{BM25}(q,d) = \sum_{t ,\in, q} \underbrace{\ln!\frac{N - n_t + 0.5}{n_t + 0.5}}_{\text{IDF}} \cdot \frac{f(t,d),(k_1+1)}{f(t,d) + k_1!\left(1 - b + b,\dfrac{|d|}{\text{avgdl}}\right)}$$

where $N$ is corpus size, $n_t$ is the number of documents containing $t$, $f(t,d)$ is term frequency, $\lvert d\rvert$ is document length, $\text{avgdl}$ is average document length across the corpus, and $k_1 \approx 1.2$–$2.0$ (term-frequency saturation) and $b \approx 0.75$ (length normalization) are the tunable parameters.

### BM25 vs vectors

* **BM25** is strong on exact terms, IDs, names, and phrases
* **vectors** are strong on semantic similarity and paraphrase
* **hybrid** often works best in production

This is especially true in enterprise systems where both exact identifiers and fuzzy semantic matches matter.

---

## The real retrieval stack: lexical, vector, hybrid, reranking

Modern retrieval systems usually fit one of four patterns.

### 1. Pure lexical search

Best when exact token matching dominates:

* product codes
* case IDs
* SQL keywords
* API names
* legal citations

### 2. Pure vector search

Best when semantic similarity dominates and exact tokens matter less:

* recommendations
* some semantic FAQ lookup
* some multimodal applications

### 3. Hybrid search

Best when both matter:

* enterprise documents
* code search
* support knowledge bases
* RAG over heterogeneous corpora

### 4. Two-stage retrieval

Often best in serious systems:

```text
retriever → top-K candidates → reranker → final results
```

The retriever may be lexical, vector, or hybrid; the reranker adds precision.

---

## The vector database landscape

The term **vector database** is used loosely, but the landscape actually has three broad categories.

### 1. Dedicated vector databases / vector engines

These are built primarily around vector storage and similarity search:

* Pinecone
* Milvus
* Qdrant
* Weaviate
* Turbopuffer
* Chroma
* LanceDB

These vary in maturity, operational model, and how strongly they also support lexical or hybrid search.

### 2. Search engines with strong vector support

These are broader search/ranking systems that also handle vectors well:

* Vespa
* OpenSearch
* Elasticsearch

These often make more sense when search, ranking, and serving are core to the product.

### 3. General databases with vector support

These keep vectors close to operational data:

* MongoDB Vector Search
* Postgres + pgvector

These are attractive when data locality and operational simplicity matter more than having a specialized search stack.

---

## A conceptual map of the major systems

### Pinecone, Milvus, Qdrant

These are easiest to think of as **dedicated vector database products**.

They are often chosen when the main need is:

* vector similarity search
* metadata filtering
* scalable ANN
* production operational support

### Weaviate

Weaviate is best thought of as a **vector-native / AI database** with strong built-in support for:

* vector search
* keyword search
* hybrid search

That makes it a strong middle ground between “pure vector DB” and “full search engine.”

See also: [Weaviate software stack](/vector_databases/weaviate)

### Turbopuffer

Turbopuffer is best thought of as a **retrieval substrate** optimized for large-scale search over vectors and metadata, with support for full-text and hybrid behavior as well.

It is especially interesting for workloads with:

* many isolated namespaces
* high update rates
* lots of small chunks
* low-latency nearest-neighbor retrieval

### Vespa

Vespa is not best understood as a vector database. It is an open-source **search + ranking + serving engine**.

Its strength is not just storing vectors, but combining:

* lexical retrieval
* vector retrieval
* filters
* business logic
* multi-stage ranking
* serving logic

Vespa is a strong choice when **relevance engineering** is central.

### OpenSearch and Elasticsearch

OpenSearch and Elasticsearch are not “pure vector DBs” either. They are Lucene-based distributed search engines that support:

* BM25 full-text search
* filters and aggregations
* vector search
* hybrid search patterns

They are especially strong when traditional search features matter alongside vectors.

### MongoDB Atlas Search and Vector Search

MongoDB provides both:

* **Atlas Search** for Lucene-backed lexical search
* **Atlas Vector Search** for semantic nearest-neighbor retrieval

These are strongest when MongoDB is already the system of record and the goal is to keep retrieval close to application data and aggregation pipelines.

### Postgres + pgvector

This is often the simplest option when:

* the app already uses Postgres
* scale is moderate
* operational simplicity matters
* vector retrieval is important, but not the entire product

It is frequently a very good default for early-stage products.

---

## How different products use different retrieval systems

The best way to understand the landscape is by application shape.

### Perplexity: search and ranking are the product

Perplexity publicly describes using **Vespa** to power AI search at scale.

That makes sense because Perplexity’s problem is not just semantic retrieval. It is closer to:

* search engine retrieval
* ranking
* freshness
* structured filtering
* serving at scale

This is a natural fit for a search-and-ranking engine rather than a pure vector DB.

### Cursor: code retrieval is a chunked nearest-neighbor problem

Cursor publicly documents using **Turbopuffer** for codebase indexing: chunk files, embed them, store vectors plus obfuscated metadata, then perform nearest-neighbor search at inference time.

This also makes sense. Cursor’s problem looks like:

* lots of small code chunks
* high churn
* many user/repo namespaces
* metadata filters such as path and line range
* extremely fast retrieval

That shape favors a fast retrieval substrate over a heavy search-engine stack.

### MongoDB: integrated database + search

MongoDB’s model is different. It says: keep your operational data in MongoDB, and add lexical and vector retrieval in the same platform.

This is strongest when the system already needs:

* document storage
* app data
* workflow state
* search
* vector retrieval
* filters and aggregation

with minimal extra infrastructure.

### DocRouter-style document retrieval

A DocRouter-style workload is usually **not** just a vector search problem. It is a **document retrieval and workflow problem**.

Typical needs include:

* exact IDs and exact phrases
* semantic similarity
* metadata filters
* grouped or field-aware retrieval
* hybrid search
* reranking
* explainability
* workflow and permission logic

That usually means the right architecture is:

```text
lexical retrieval
+ vector retrieval
+ metadata filters
+ reranking
+ application logic
```

not just “pick a vector DB.”

---

## Workload tilt: DocRouter-style vs code-editor retrieval

| Dimension                     | Document / workflow retrieval                        | Code-editor style retrieval                        |
| :---------------------------- | :--------------------------------------------------- | :------------------------------------------------- |
| **Unit**                      | sections, tables, form regions, document families    | small code chunks, symbols, files                  |
| **Churn**                     | moderate; often batch ingest + reprocessing          | very high incremental updates                      |
| **Metadata**                  | doc type, tenant, date, workflow state, vendor, case | repo, branch, path, language, symbol type          |
| **Exact-match need**          | very high                                            | high                                               |
| **Hybrid need**               | very high                                            | high                                               |
| **Typical stack lean**        | MongoDB / Weaviate / Vespa                           | Turbopuffer / Weaviate / Qdrant / Pinecone         |
| **When ranking is strategic** | Vespa becomes especially attractive                  | Vespa can matter, but is often heavier than needed |

---

## Feature matrix (high level)

|                               | MongoDB Atlas Search / Vector Search | Weaviate                      | Vespa                          | Turbopuffer            | Pinecone / Qdrant / Milvus |
| :---------------------------- | :----------------------------------- | :---------------------------- | :----------------------------- | :--------------------- | :------------------------- |
| **Core identity**             | document DB + embedded search        | vector / AI database + hybrid | search + ranking + serving     | retrieval substrate    | dedicated vector DB        |
| **Lexical search**            | strong                               | strong                        | strong                         | some / hybrid-friendly | varies                     |
| **Vector search**             | yes                                  | yes                           | yes                            | yes                    | yes                        |
| **Hybrid search**             | composable                           | first-class                   | composable and powerful        | supported              | varies                     |
| **Custom ranking depth**      | moderate                             | moderate                      | very strong                    | lower                  | lower to moderate          |
| **Namespace-heavy workloads** | moderate                             | strong                        | possible                       | very strong            | strong                     |
| **Best fit**                  | app data already in MongoDB          | semantic + hybrid RAG         | search/ranking as product core | code/chunk retrieval   | dedicated ANN workloads    |

---

## Choosing the right system by application need

### Choose MongoDB Search / Vector Search when

* MongoDB is already the system of record
* you want minimal infrastructure sprawl
* metadata-heavy filtering and app integration matter
* retrieval is important, but not a standalone serving product

### Choose Weaviate when

* retrieval is central to the application
* you want strong keyword + vector + hybrid search
* you want a dedicated retrieval database without going all the way to a search-engine platform

### Choose Vespa when

* search and ranking are core differentiators
* you want multi-stage ranking and richer relevance engineering
* the product looks more like search/recommendation/serving than a CRUD app with vectors

### Choose Turbopuffer when

* the workload is mostly fast chunk retrieval
* there are many namespaces or tenants
* metadata filters matter
* the application looks like a code assistant, retrieval substrate, or large-scale vector index

### Choose Pinecone, Qdrant, or Milvus when

* you want a dedicated vector database
* the main need is vector retrieval plus filtering
* you do not need the full complexity of a search-engine platform

### Choose pgvector when

* you already use Postgres
* scale is moderate
* simplicity matters
* vector retrieval is important, but not the center of the platform

### Choose OpenSearch or Elasticsearch when

* you already need classic search-engine features
* lexical search remains central
* vectors are an addition to a search stack, not the entire product

---

## Metrics that matter

Beyond raw ANN benchmarks, what actually matters depends on the application.

### Retrieval metrics

* **Precision@K** — of the top K results returned, what fraction are actually relevant? Measures how much noise the user sees.
* **Recall@K** — of all relevant items in the corpus, what fraction appear in the top K? Measures how much the system misses.
* **MRR (Mean Reciprocal Rank)** — averages the reciprocal of the rank of the first relevant result across queries. Rewards systems that surface a correct answer near the top.
* **MAP (Mean Average Precision)** — averages precision across all recall levels for each query, then averages across queries. A single number that captures both ranking quality and coverage.
* **NDCG (Normalized Discounted Cumulative Gain)** — rewards highly relevant results appearing early, with a logarithmic discount for lower ranks. Handles graded relevance, not just binary relevant/not-relevant.

### System metrics

* latency
* throughput
* freshness
* update cost
* filter correctness
* multitenancy behavior
* operational burden

### Application-specific metrics

* document systems: exact identifier retrieval, section relevance, workflow correctness
* code assistants: chunk relevance, namespace isolation, freshness after edits
* consumer search: ranking quality, freshness, personalization, serving latency

---

## Failure modes

Common retrieval failures include:

* easy negatives instead of hard negatives
* bad chunking
* poor metadata modeling
* domain mismatch
* ignoring lexical exact-match needs
* too much faith in vector similarity alone
* evaluating only on easy benchmarks
* no reranking
* no permission or tenant filtering

Many disappointing “vector database” results are actually failures of the surrounding retrieval design.

---

## Practical takeaway

The most important conceptual point is:

A **vector database** is usually not the right abstraction to optimize first.

For most real systems, the better question is:

**What retrieval architecture does this application need?**

* For **consumer AI search**, search and ranking engines like **Vespa** may be the right center of gravity.
* For **code retrieval**, fast namespace-heavy ANN systems like **Turbopuffer** may be a better fit.
* For **application-integrated retrieval**, **MongoDB Search / Vector Search** or **pgvector** may be simplest.
* For **semantic + hybrid retrieval as a product**, **Weaviate**, **Qdrant**, **Pinecone**, or **Milvus** may be the right class.
* For **enterprise document retrieval**, the answer is often **hybrid lexical + vector + filters + reranking**, not just “choose a vector DB.”

---

## Systems and stacks (this site)

* **Postgres + pgvector** — [Google Cloud: pgvector, LLMs, and LangChain](https://cloud.google.com/blog/products/databases/using-pgvector-llms-and-langchain-with-google-cloud-databases), [video](https://www.youtube.com/watch?v=FDBnyJu_Ndg)
* **Chroma** — [Chromadb software stack](/software_stacks/chromadb)
* **Weaviate** — [Weaviate software stack](/vector_databases/weaviate)
* **Vector DB examples** — [Vector Database Examples](/machine_learning/2023/08/13/vector-database-examples/)

---

## Related

* [AI Agents](/ai_agents)
* [Artificial Intelligence](/artificial_intelligence)
* [Cloud Data Platform](/cloud_data_platform)
* [Cognitive Science](/cognitive_science)
* [Computation Theory](/computation_theory)
* [Computational Topology](/computational_topology)
* [Document Classification](/document_classification)
* [Finance](/finance)
* [Graph Databases](/graph_databases)
* [Language Models](/language_models)
* [Machine Learning](/machine_learning)
* [Meta Learning](/meta_learning)
* [Probabilities and Statistics](/probabilities_and_statistics)
* [Robotics](/robotics)
* [Self Driving Cars](/self_driving_cars)

---

## External references

* Cursor — Security: [https://cursor.com/security](https://cursor.com/security)
* Vespa blog — Perplexity builds AI search at scale on Vespa: [https://blog.vespa.ai/perplexity-builds-ai-search-at-scale-on-vespa-ai/](https://blog.vespa.ai/perplexity-builds-ai-search-at-scale-on-vespa-ai/)
* MongoDB Atlas Search docs: [https://www.mongodb.com/docs/atlas/atlas-search/](https://www.mongodb.com/docs/atlas/atlas-search/)
* MongoDB Atlas Vector Search docs: [https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-overview/](https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-overview/)
* Weaviate search concepts: [https://docs.weaviate.io/weaviate/concepts/search](https://docs.weaviate.io/weaviate/concepts/search)
* Weaviate hybrid search: [https://docs.weaviate.io/weaviate/search/hybrid](https://docs.weaviate.io/weaviate/search/hybrid)
* OpenSearch keyword search: [https://docs.opensearch.org/latest/search-plugins/keyword-search/](https://docs.opensearch.org/latest/search-plugins/keyword-search/)
* Pinecone overview: [https://docs.pinecone.io/guides/get-started/overview](https://docs.pinecone.io/guides/get-started/overview)
