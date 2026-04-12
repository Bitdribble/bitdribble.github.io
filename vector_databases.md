---
layout: page
title: Vector Databases
---

This page collects how **embeddings**, **lexical search**, and **vector databases** fit together for retrieval (RAG, semantic search, recommenders), plus how major **search engines** and **databases** implement similar ideas.

#### Embeddings: inputs, outputs, geometry

Think of an embedding model as a function that maps a **raw object** (sentence, paragraph, image, chunk of code) to a **point in d-dimensional space** (often **d** is one of 384, 768, 1024, 1536, …). You rarely inspect coordinates directly; you care about **relative position**: similar meaning → nearby vectors.

Typical pipeline:

```text
Raw input → tokenizer / preprocessing → neural encoder → embedding vector
                                                      ↓
                    search · clustering · classification · recommendation · RAG
```

**Library vs database** — in-process embedding + search vs persisted, replicated, multi-tenant services: [Vector Library versus Vector Database](https://weaviate.io/blog/vector-library-vs-vector-database) (Weaviate blog, 2023).

Example geometry (intuition only): phrases about pets cluster away from vehicles. Training **pulls** positive pairs together and **pushes** negatives apart so that geometry matches your notion of relevance.

#### How embedding models are trained (common patterns)

* **Masked / causal language modeling** — predict missing or next tokens; useful representations arise in transformer layers even though the head is generative. Pooling often uses `[CLS]`, mean pooling over tokens, or a dedicated projection head.
* **Contrastive learning** — positive pairs (query, relevant passage) should have high similarity; hard negatives (same domain, wrong answer) teach fine distinctions. Central to modern **sentence / passage** encoders and retrieval.
* **Supervised classification with a bottleneck** — encoder → embedding → classifier; the bottleneck vector is reused for search or clustering.
* **Triplet loss** — anchor, positive, negative; enforce *distance(anchor, positive) ≪ distance(anchor, negative)*.

For retrieval-focused encoders, **hard negatives** (e.g. “Python list comprehension” vs “Python for loops tutorial” instead of vs “banana smoothie”) usually matter more than easy random negatives.

#### Train, validation, and test

* **Train** — parameters are updated on this data.
* **Validation** — choose architecture, early stopping, thresholds, and hyperparameters; not used for gradient updates, but you **do** make decisions from it.
* **Test** — **one** honest benchmark at the end; if you repeatedly tune using the test set, it stops measuring generalization.

```text
All labeled data
├── train      (fit weights)
├── validation (choose settings)
└── test       (final report only)
```

#### After training: how vectors are used

* **Semantic search** — query and documents embedded; nearest neighbors by cosine or dot product.
* **Classification / clustering** — linear probe or clustering in embedding space.
* **Recommendation** — user and item vectors aligned in a shared space.
* **RAG** — retrieve chunks, then feed them to an LLM; quality depends on chunking, negatives, and reranking as much as on the backbone model.

#### Precision, recall, and practical knobs

**Precision** — among returned hits, how many are relevant?

```text
precision = |relevant ∩ returned| / |returned|
```

**Recall** — among all relevant items in the corpus, how many appear in the result set?

```text
recall = |relevant ∩ returned| / |relevant|
```

Usually **tension** with precision: stricter thresholds ↑ precision, ↓ recall.

**Levers** that often improve **precision** (especially in production RAG):

1. Strong **evaluation sets** (hard queries, near-misses, real user phrasing).
2. **Chunking** at semantic boundaries; avoid one vector spanning unrelated topics.
3. **Hard negatives** and cleaner relevance labels in training.
4. **Domain fine-tuning** when jargon dominates (legal, medical, code).
5. **Loss / objective** suited to ranking (contrastive, multiple negatives ranking, etc.).
6. **Similarity threshold** and **top‑K** — cheap operational tradeoff curve.
7. **Reranking** — bi-encoder retrieval for recall + cross-encoder (or dedicated reranker) on the top‑*K* candidates for precision.
8. **Metadata filters** — restrict by time, tenant, product line, etc.
9. **Hybrid retrieval** — combine dense vectors with **BM25** when SKUs, APIs, or exact phrases matter.

Recipe order that often pays off before exotic training: eval set → chunking → hard negatives → stronger embedding model → filters → reranker → threshold / K → domain tuning → hybrid search.

#### BM25 (lexical relevance)

BM25 ranks documents for a **keyword** query using, per query term: **IDF** (rare terms matter more), **saturated term frequency** (repeating a word helps with diminishing returns), and **length normalization** (long docs do not win only by bulk). Default **similarity** in Elasticsearch and OpenSearch for classic full‑text fields is BM25; parameters **k1** (term frequency saturation, often ~1.2–2.0) and **b** (length norm, often ~0.75) are tunable.

**BM25 vs embeddings** — BM25: exact tokens and statistics. Embeddings: paraphrase and meaning (“flat tire” vs “punctured wheel”). **Hybrid** systems sum or fuse both scores; [Weaviate](/vector_databases/weaviate) documents parallel **vector + BM25** hybrid search and fusion in product docs.

#### Elasticsearch, OpenSearch, and Lucene

At a high level, **Elasticsearch** and **OpenSearch** are distributed **Java** servers around **Apache Lucene**: each **shard** is a Lucene index made of **immutable segments**; **indexing** goes through analyzers, **translog**, **refresh** (searchable segments), **flush/commit**; **search** fans out from a coordinating node to shards, runs Lucene queries per segment, then merges hits and aggregations. **BM25 scoring** executes inside Lucene; the server handles routing, replication, query DSL, and plugins (for example **k‑NN** in OpenSearch). OpenSearch adds distinct product choices (governance, plugins, features such as segment replication) on top of the same Lucene core.

**Lucene** itself (per segment): inverted **postings** (term → doc ids), **stored fields**, **doc values** (sorting, facets), **points** (numeric/geo), **norms**, soft deletes; **IndexWriter** / **IndexSearcher** / **Collector** APIs; **codec** layer encodes on-disk formats. Mental model: **Lucene = per‑shard engine**; **OpenSearch / Elasticsearch = distributed OS around that engine**.

#### MongoDB Atlas Search and Vector Search

MongoDB documents **Atlas Search** as Lucene‑backed full‑text search and runs a separate **`mongot`** process (with **`mongod`**) that owns search indexes. **<code>$search</code>** and **<code>$searchMeta</code>** aggregation stages run lexical search; explain output can surface **Lucene** query details. **Atlas Vector Search** (**<code>$vectorSearch</code>**) performs **ANN** retrieval (documented default index structure **HNSW** in many deployments) with optional **pre‑filtering**; both paths are typically served via **`mongot`**, then the rest of the aggregation pipeline continues in **`mongod`**.

#### Weaviate, Vespa, MongoDB (search “shape”)

* **[Weaviate](/vector_databases/weaviate)** — vector‑native database with **keyword (BM25), vector, and hybrid** search as first‑class APIs; hybrid runs lexical and dense retrieval in parallel then **fuses** scores. Good default when retrieval (especially RAG) is the product focus.
* **MongoDB Search / Vector Search** — strongest when **MongoDB is already the system of record** and you want **<code>$search</code>** / **<code>$vectorSearch</code>** inside aggregation with minimal extra infrastructure.
* **Vespa** — open‑source **search + ranking + serving** engine; excels at **multi‑stage retrieval**, **rank profiles**, and combining lexical, vector, and business signals in one serving stack. Often chosen when **relevance engineering** is central (e.g. large consumer search).

#### Feature matrix (high level)

| | MongoDB Atlas Search / Vector Search | Weaviate | Vespa |
| :--- | :--- | :--- | :--- |
| **Core identity** | Document DB + embedded search | Vector / AI database + hybrid | Search + ranking + serving |
| **Lexical default** | Lucene analyzers, <code>$search</code> (aggregation stage) | BM25 keyword search | BM25 / text in rank profiles |
| **Vector / ANN** | <code>$vectorSearch</code>, HNSW-style indexes | Native vector search | <code>nearestNeighbor</code> and related APIs |
| **Hybrid** | Composable in app / pipeline | Named hybrid + fusion | Composed via queries + rank phases |
| **Custom ranking depth** | Moderate | Moderate; reranking supported | Very strong (rank profiles, phases) |
| **Best fit** | Data already in MongoDB | Semantic + hybrid RAG | Large-scale tuned retrieval |

#### Workload tilt: DocRouter-style vs code-editor retrieval

| Dimension | Document / workflow retrieval | Code-editor style chunk retrieval |
| :--- | :--- | :--- |
| **Unit** | Sections, tables, form regions | Small chunks, symbols, files |
| **Churn** | Often batch + reprocess | Very high incremental updates |
| **Metadata** | Doc type, dates, workflow state | Repo, branch, path, language |
| **Typical stack lean** | MongoDB or Vespa if ranking is strategic | Dedicated ANN store (e.g. Turbopuffer-class) or Weaviate |

Scores in chat notes are subjective; treat them as **heuristics**, not benchmarks. For **AI coding assistants**, some vendors document a dedicated vector / search tier for chunked code (namespaces per user or repo) plus local or obfuscated metadata; see for example [Cursor — Security](https://cursor.com/security) for how that product describes its stack.

#### Landscape: names to keep in mind

**Dedicated vector / ANN products (illustrative):** Pinecone, Milvus, Qdrant, Weaviate, Chroma, LanceDB, Turbopuffer, …  

**Search engines with strong vectors:** Vespa, OpenSearch (and Elasticsearch), …  

**Vectors inside general databases:** **pgvector** on Postgres, **MongoDB** Vector Search, …  

For a longer curated link list (pgvector, Unstructured, Chroma Docker, etc.), see the [Vector Database Examples](/machine_learning/2023/08/13/vector-database-examples/) post.

#### Retrieval metrics (beyond binary precision)

* **Precision@K**, **Recall@K**, **MRR**, **MAP**, **NDCG** — standard IR metrics on ranked lists.
* **Classification** — accuracy, precision/recall per class, F1, ROC / PR AUC.
* **Embedding quality** — silhouette, kNN label purity, or downstream task performance.

#### Failure modes (checklist)

Bad or easy negatives; **domain mismatch**; **multi‑topic chunks**; **train/test leakage**; uncalibrated similarity threshold; ignoring **exact‑match** needs (SKUs, legal cites); benchmarks that are **too easy**.

#### Systems and stacks (this site)

* **Postgres + pgvector** — [Google Cloud: pgvector, LLMs, and LangChain](https://cloud.google.com/blog/products/databases/using-pgvector-llms-and-langchain-with-google-cloud-databases), [video](https://www.youtube.com/watch?v=FDBnyJu_Ndg).
* **Chroma** — [Chromadb software stack](/software_stacks/chromadb).
* **Weaviate** — [Weaviate software stack](/vector_databases/weaviate).
* **Surveys** — Dmitry Kan: [Not All Vector Databases Are Made Equal](https://towardsdatascience.com/milvus-pinecone-vespa-weaviate-vald-gsi-what-unites-these-buzz-words-and-what-makes-each-9c65a3bd0696) (2023); [12 Vector Databases For 2023](https://lakefs.io/blog/12-vector-databases-2023/); Duncan Blythe: [overview of vector search libraries and databases](https://www.linkedin.com/pulse/overview-vector-search-libraries-databases-duncan-blythe/) (2023).

#### Articles and posts

* Hacker News: [Vector search just got up to 10x faster…](https://news.ycombinator.com/item?id=32487856).
* Reddit: [Open source vector databases?](https://www.reddit.com/r/ChatGPTCoding/comments/14112ol/open_source_vector_databases/) (2023).
* Dmitry Kan (Haystack 2022): [Where Vector Search is Taking Us](https://haystackconf.com/files/slides/haystack2022/Dmitry-Haystack-Keynote.pdf) (PDF).

#### Other

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
