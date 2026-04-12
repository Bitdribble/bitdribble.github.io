---
title: "Vector Database Examples"
layout: post
categories: machine_learning 
---

* [The AI Retrieval Stack](/ai_retrieval_stack) (site page)

References:
* [Building AI-powered apps on Google Cloud databases using pgvector, LLMs and LangChain](https://cloud.google.com/blog/products/databases/using-pgvector-llms-and-langchain-with-google-cloud-databases), [colab](https://colab.research.google.com/github/GoogleCloudPlatform/python-docs-samples/blob/main/cloud-sql/postgres/pgvector/notebooks/pgvector_gen_ai_demo.ipynb#scrollTo=DS7GdlJ1XowY)
* [Postgres pgvector Extension - Vector Database with PostgreSQL / Langchain Integration](https://www.youtube.com/watch?v=FDBnyJu_Ndg)
* Duncan Blythe: [An overview of vector search libraries and databases](https://www.linkedin.com/pulse/overview-vector-search-libraries-databases-duncan-blythe/) (2023)
* Hacker News thread: [Vector search just got up to 10x faster, easier to set up, and vertically scalable](https://news.ycombinator.com/item?id=32487856)
* Dmitry Kan:
  * [Not All Vector Databases Are Made Equal](https://towardsdatascience.com/milvus-pinecone-vespa-weaviate-vald-gsi-what-unites-these-buzz-words-and-what-makes-each-9c65a3bd0696) (2023)
  * [Where Vector Search is Taking Us](https://haystackconf.com/files/slides/haystack2022/Dmitry-Haystack-Keynote.pdf) (Sept 2022)
* Reddit: [Open source vector databases?](https://www.reddit.com/r/ChatGPTCoding/comments/14112ol/open_source_vector_databases/) (2023)
* Marqo
  * [Simple wiki demo](https://docs.marqo.ai/0.0.10/End-to-End%20Examples/simple_wiki_demo/) - gives errors
  * Create marqo venv, `pip install marqo pytorch``
* [https://healthsearch-frontend.onrender.com/](https://healthsearch-frontend.onrender.com/)
* [Tutorial: How to get GPT to “read” from PDFs](https://medium.com/@brianlimyisheng1997/tutorial-how-to-get-gpt-to-read-from-pdfs-cccc4d189a2b)
* [ 12 Vector Databases For 2023: A Review](https://lakefs.io/blog/12-vector-databases-2023/)

* LabelStudio
  * [Customized Layout Detection for Scientific PDFs with LayoutParser and Label Studio](https://www.youtube.com/watch?v=puOKTFXRyr4) (2022)

* Unstructured
  * Install
    * `pip install unstructured unstructured-inference`
    * `pip install git+https://github.com/facebookresearch/detectron2.git`
    * `sudo apt install tesseract-ocr`
    * `sudo apt install libtesseract-dev`    
  * [examples](https://github.com/Unstructured-IO/unstructured/tree/main/examples)
  * Matt Robinson: [The Unstructured library now includes utilities to make loading Unstructured outputs into Weaviate quick and easy.](https://www.linkedin.com/posts/mthwrobinson_ingesting-pdfs-into-weaviate-weaviate-activity-7070142403541655552-XptZ/)
  * https://unstructured-io.github.io/unstructured/bricks.html#stage-for-weaviate
  * https://baincapitalventures.com/insight/how-unstructured-is-powering-the-llm-data-stack/
  * [Who here were able to use Unstructured for parsing scanned PDFs? #5969 ](https://github.com/langchain-ai/langchain/discussions/5969)

* Weaviate:
  * Install
    * Requires `unstructured`
  * Erika Cardenas: [Vector Library versus Vector Database](https://weaviate.io/blog/vector-library-vs-vector-database) (2023)
  * Erika Cardenas, Mohd Shukri Hasan: [Ingesting PDFs into Weaviate](https://weaviate.io/blog/ingesting-pdfs-into-weaviate) (2023)


* Weavite chat:
  * Andrei: Hi, I'm trying to use Weaviate to have chat and summarization with a large number of PDFs (hundreds). But I can't seem to find a good blog post that explains the process end to end.Any suggestions on which blog post or tutorial to use as example?Been trying to use unstructured to parse the pdf, and insert it into Weaviate. That seems to work. However, the class properties of the pdf parsed by unstructured do not seem to be documented anywhere. There is one blog example, https://weaviate.io/blog/ingesting-pdfs-into-weaviate, but that only inserts document summaries.There is also a 2021 blog post, https://towardsdatascience.com/getting-started-with-weaviate-python-client-e85d14f19e4f, which shows how to insert news articles into Weaviate. However, the code in that blog post is not running with the latest Weaviate.
    * Erika: I recommend using the Unstructured data loader on [LlamaHub](https://github.com/emptycrown/llama-hub): [file-unstructured](https://llamahub.ai/l/file-unstructured). You can then build your vector store with Weaviate, and then use the query engine. An example of this is here: [episode1.ipynb](https://github.com/weaviate/recipes/blob/main/integrations/llamaindex/data-loaders-episode1/episode1.ipynb). If you want to summarize the PDF docs, you should build out the index using the [Tree Index](https://gpt-index.readthedocs.io/en/latest/core_modules/data_modules/index/index_guide.html#tree-index)


* Chroma
  * Clone https://github.com/chroma-core/chroma
  * In `docker-compose.yaml`
    * Change port 8000 to 8002, to avoid conflict with Airbyte port 8000
    * Add `ALLOW_RESET=TRUE`

Here is the `docker-compose.yaml`:
```yaml
version: '3.9'

networks:
  net:
    driver: bridge

services:
  server:
    image: server
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ./:/chroma
      - index_data:/index_data
    command: uvicorn chromadb.app:app --reload --workers 1 --host 0.0.0.0 --port 8002 --log-config log_config.yml
    environment:
      - IS_PERSISTENT=TRUE
      - ALLOW_RESET=TRUE
      - CHROMA_SERVER_AUTH_PROVIDER=${CHROMA_SERVER_AUTH_PROVIDER}
      - CHROMA_SERVER_AUTH_CREDENTIALS_FILE=${CHROMA_SERVER_AUTH_CREDENTIALS_FILE}
      - CHROMA_SERVER_AUTH_CREDENTIALS=${CHROMA_SERVER_AUTH_CREDENTIALS}
      - CHROMA_SERVER_AUTH_CREDENTIALS_PROVIDER=${CHROMA_SERVER_AUTH_CREDENTIALS_PROVIDER}
    ports:
      - 8002:8002
    networks:
      - net

volumes:
  index_data:
    driver: local
  backups:
    driver: local
```

Do `docker-compose up -d --build` to bring up, and `docker-compose down` to bring down. Then, you can connect to remote Chroma DB as follows:

```python
# create the chroma client
import chromadb
import uuid
from chromadb.config import Settings

client = chromadb.HttpClient(host='localhost', port=8002, settings=Settings(allow_reset=True))
client.reset()  # resets the database
collection = client.create_collection("my_collection")
for doc in docs:
    collection.add(
        ids=[str(uuid.uuid1())], metadatas=doc.metadata, documents=doc.page_content
    )

# tell LangChain to use our client and collection name
db4 = Chroma(client=client, collection_name="my_collection", embedding_function=embedding_function)
query = "What did the president say about Ketanji Brown Jackson"
docs = db4.similarity_search(query)
print(docs[0].page_content)
```

* Aug 31st Unstructured, Weaviate, Arize webinar
  * [Exploring%20Chunking%20Techniques%20%26%20Reranking%20for%20Enhanced%20Results.ipynb](https://colab.research.google.com/github/ron-unstructured/arize-weaviate-unstructured-webinar/blob/main/Exploring%20Chunking%20Techniques%20%26%20Reranking%20for%20Enhanced%20Results.ipynb#scrollTo=cf9be012c5da0323)
  * [weaviate_llama_index_search_and_retrieval.ipynb](https://colab.research.google.com/github/ruiciroT/phoenix/blob/weaviate/tutorials/weaviate_llama_index_search_and_retrieval.ipynb)
  * [unstructured handling tables in pdfs](https://unstructured-io.github.io/unstructured/bricks/partition.html#partition-pdf)
