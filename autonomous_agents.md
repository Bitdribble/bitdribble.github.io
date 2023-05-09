---
layout: page
mathjax: true
title: Autonomous Agents
---
#### Articles
* [Doing more with less: meta-reasoning and meta-learning in humans and machines](https://cocosci.princeton.edu/papers/doing-more-with-less.pdf) (2023)
* M. Reddy,  GMP O'Hare: [The blackboard model: a survey of its application](https://link.springer.com/article/10.1007/BF00143760) (1991)
* Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein: [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442) (2023)

#### Courses
* Old Duke U. class on [Agent Architecture](https://users.cs.duke.edu/~brd/Teaching/Previous/AI/Lectures/Summaries/architectures.html) (table of contents only)


#### Posts
* Swyx: [The Anatomy of Autonomy: Why Agents are the next AI Killer App after ChatGPT](https://www.latent.space/p/agents) (2023)
* LangChain Blog: [Autonomous Agents & Agent Simulations](https://blog.langchain.dev/agents-round/) (2023)
* Matt Schlicht: [The Complete Beginners Guide To Autonomous Agents](https://www.mattprd.com/p/the-complete-beginners-guide-to-autonomous-agents) (2023)
* T.L. Griffiths et al: [Doing more with less: meta-reasoning and meta-learning in humans and machines](https://cocosci.princeton.edu/papers/doing-more-with-less.pdf) (2023)
* Wiki: [SOAR](https://en.wikipedia.org/wiki/Soar_(cognitive_architecture)) architecture

#### Talks
* [Langchain](https://www.crowdcast.io/@langchain) crowdcast:
  * [LangChain Agents webinar](https://www.crowdcast.io/c/46erbpbz609r) (2023): prompt engineering, BabyAGI
  * [Langchain NoCode webinar](https://www.crowdcast.io/c/38stgg2vma7m) (2023)
  * [Langchain Prompt Injection](https://www.crowdcast.io/c/ht7qt3rvesvg) (2023)
  * [Langchain Document Question-Answering](https://www.crowdcast.io/c/rh66hcwivly0)
    * [paper-qa](https://github.com/whitead/paper-qa)
* Sal Khan Ted Talk: [The amazing AI super tutor for students and teachers](https://www.ted.com/talks/sal_khan_the_amazing_ai_super_tutor_for_students_and_teachers/c) (2023)

#### Tools
* [Langchain](https://python.langchain.com/en/latest/getting_started/getting_started.html)
* [Pinecone](https://www.pinecone.io/)
* [Replit](https://replit.com)
* [Camel](https://www.camel-ai.org/)
* [Flowiseai.com](https://flowiseai.com/)
* [Lamini](https://lamini.ai/)
* [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/Auto-GPT), [docs](https://docs.agpt.co/setup/)
* [weaviate.io](https://weaviate.io/)

#### Demos
* [Flowiseai.com](https://flowiseai.com/)
  * Fork [lowiseAI/Flowise](https://github.com/FlowiseAI/Flowise)
  * Clone locally, `cd Flowise`. Or open in Codespace.
  * `yarn install; yarn build; yarn start`
  * You can access the app on [http://localhost:3000](http://localhost:3000)
  * Get OpenAI, Pinecone, Serp API tokens
  
* [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/Auto-GPT), [docs](https://docs.agpt.co/setup/)
  * [Auto-GPT Explained! 10 Ways To Start Using AutoGPT Today! (Better Than ChatGPT)](https://www.youtube.com/watch?v=465RFn6KmiQ) (2023)
  * Steps
    * Fork [Significant-Gravitas/Auto-GPT](https://github.com/Significant-Gravitas/Auto-GPT). Include all branches. Don't tick `copy the master branch only.
    * Select `stable` branch in UI. Click green `Code` button, start `Codespace` on `stable` branch
      * Alternative: Clone locally, cd to folder, run `pipenv shell` to create a virtual environment for the folder
    * At the code space terminal, run `pip install -r requirements.txt`
    * Copy `.env.template` to `.env`. Set the `OPENAPI_API_KEY`, `PINECONE_API_KEY`, `PINECONE_ENV`.
      * The OpenAPI key requires payment, the Pinecone key can be gotten for free.
    * `python -m autogpt` (run with `-h` for parameters)
    * Also see lalab.ai's [Auto-GPT tutorial: How to set up Auto-GPT](https://lablab.ai/t/auto-gpt-tutorial-how-to-set-up-auto-gpt)
  * Prompts that work:
    * Write a python program that takes as input an integer, and returns the prime number factorization. Write a unit tester as well.

#### Repos
* [mbusigin](https://github.com/mbusigin)/[yaml-runner](https://github.com/mbusigin/yaml-runner)

#### Companies
* TO DO

#### Other
* [Artificial Intelligence](artificial_intelligence.md)
* [Autonomous Agents](autonomous_agents.md)
* [Cognitive Science](cognitive_science.md)
* [Computation Theory](computation_theory.md)
* [Meta Learning](meta_learning.md)
* [Natural Language Processing](natural_language_processing.md)
* [Probabilities and Statistics](probabilities_and_statistics.md)
* [Robotics](robotics.md)
* [Self Driving Cars](self_driving_cars.md)
* [Computational Topology](computational_topology.md)
