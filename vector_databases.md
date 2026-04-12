---
layout: page
mathjax: true
title: Vector Databases
---

Vector databases store **embedding vectors** (fixed-size numerical representations of text, images, audio, or other modalities) so applications can run **similarity search**, **metadata filtering**, and **hybrid** retrieval (vector + keyword) at scale. They sit between **embedding models** (which produce vectors, often from fine-tuned or foundation encoders) and **downstream systems** such as RAG pipelines, recommenders, and semantic search UIs.

Supplementary notes from a ChatGPT thread on **embeddings and model training** (shared conversation; access may require login): [Embeddings and Model Training](https://chatgpt.com/share/69db919e-42b4-8326-8086-740f00451957).

#### Concepts

* **Embeddings** map data into a space where distance or inner product reflects semantic relatedness; training objectives (contrastive learning, supervised fine-tuning on pairs, multi-task encoders) shape that geometry.
* **Dense retrieval** uses those vectors instead of lexical overlap alone, which matters for paraphrases and cross-lingual or multimodal use cases.
* **Approximate nearest neighbor (ANN)** indexes (for example HNSW, IVF, product quantization) trade a small amount of recall for latency and memory suitable for large corpora.
* **Vector library vs vector database**: in-process libraries embed and search in application memory; databases add persistence, replication, access control, and operational APIs. Erika Cardenas: [Vector Library versus Vector Database](https://weaviate.io/blog/vector-library-vs-vector-database) (2023).

#### Systems and stacks

* **Postgres + pgvector** — vectors as a column type inside an existing relational database; strong when transactional data and vectors live together. [Google Cloud: pgvector, LLMs, and LangChain](https://cloud.google.com/blog/products/databases/using-pgvector-llms-and-langchain-with-google-cloud-databases), [video overview](https://www.youtube.com/watch?v=FDBnyJu_Ndg).
* **Chroma** — open-source embedding store often used with LangChain; [Chromadb software stack](/software_stacks/chromadb).
* **Weaviate** — open-source vector search engine with modules for hybrid search, reranking, and generative workflows; local notes and links: [Weaviate software stack](/vector_databases/weaviate).
* **Others** — Pinecone, Milvus, Qdrant, Vespa, Marqo, Vald, and cloud-managed offerings differ on hosting model, filtering, multi-tenancy, and disk vs memory tradeoffs. Dmitry Kan: [Not All Vector Databases Are Made Equal](https://towardsdatascience.com/milvus-pinecone-vespa-weaviate-vald-gsi-what-unites-these-buzz-words-and-what-makes-each-9c65a3bd0696) (2023); [12 Vector Databases For 2023: A Review](https://lakefs.io/blog/12-vector-databases-2023/).
* Duncan Blythe: [An overview of vector search libraries and databases](https://www.linkedin.com/pulse/overview-vector-search-libraries-databases-duncan-blythe/) (2023).

#### Articles and posts

* Hacker News: [Vector search just got up to 10x faster, easier to set up, and vertically scalable](https://news.ycombinator.com/item?id=32487856).
* Reddit: [Open source vector databases?](https://www.reddit.com/r/ChatGPTCoding/comments/14112ol/open_source_vector_databases/) (2023).
* Dmitry Kan (Haystack 2022 keynote PDF): [Where Vector Search is Taking Us](https://haystackconf.com/files/slides/haystack2022/Dmitry-Haystack-Keynote.pdf).

#### Blog

* Longer link collection and experiments (Chroma Docker, Unstructured, Weaviate Q&A): [Vector Database Examples](/machine_learning/2023/08/13/vector-database-examples/) (2023 post).

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
