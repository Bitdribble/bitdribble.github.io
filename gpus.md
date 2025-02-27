---
layout: page
mathjax: true
title: GPUs
---
#### CUDA
* Nvidia: [CUDA C++ Programming Guide](https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html#abstract)
* Nvidia: [CUDA C/C++ Basics](https://www.olcf.ornl.gov/wp-content/uploads/2013/02/Intro_to_CUDA_C-TS.pdf)

#### Blogs
* [Tim Dettmers](https://timdettmers.com/):
  * [Which GPU(s) to Get for Deep Learning: My Experience and Advice for Using GPUs in Deep Learning](https://timdettmers.com/2023/01/30/which-gpu-for-deep-learning/), 2023
  * [TPUs vs GPUs for Transformers (BERT)](https://timdettmers.com/2018/10/17/tpus-vs-gpus-for-transformers-bert/), 2018
* J. Stern: [A comprehensive guide to memory usage in PyTorch](https://medium.com/deep-learning-for-protein-design/a-comprehensive-guide-to-memory-usage-in-pytorch-b9b7c78031d3) (2021)
* Allan Witt: [Best Computer to Run LLaMA AI Model at Home (GPU, CPU, RAM, SSD)](https://www.hardware-corner.net/guides/computer-to-run-llama-ai-model/) (2023)
* [Nvidia H100 GPUs: Supply and Demand](https://gpus.llm-utils.org/nvidia-h100-gpus-supply-and-demand/#whats-the-most-common-need-from-llm-startups)

#### Quantization
* [Tim Dettmers](https://timdettmers.com/):
  * [LLM.int8() and Emergent Features](https://timdettmers.com/2022/08/17/llm-int8-and-emergent-features/), Aug 2022
* Y. Belkada, T. Dettmers: [A Gentle Introduction to 8-bit Matrix Multiplication for transformers at scale using Hugging Face Transformers, Accelerate and bitsandbytes](https://huggingface.co/blog/hf-bitsandbytes-integration)
  * While, ideally the training and inference should be done in FP32, it is two times slower than FP16/BF16
  * Experimentially, we have discovered that instead of using the 4-byte FP32 precision, we can get an almost identical inference outcome with 2-byte BF16/FP16 half-precision, which halves the model size.
  * LLM.int8(): zero degradation matrix multiplication for Large Language Models
  * In essence, LLM.int8() seeks to complete the matrix multiplication computation in three steps:
    * From the input hidden states, extract the outliers (i.e. values that are larger than a certain threshold) by column.
    * Perform the matrix multiplication of the outliers in FP16 and the non-outliers in int8.
    * Dequantize the non-outlier results and add both outlier and non-outlier results together to receive the full result in FP16.
  * HuggingFace python implementation

#### Companies
* Tesla
  * [Tesla Hardware 3 (Full Self-Driving Computer) Detailed](https://www.autopilotreview.com/tesla-custom-ai-chips-hardware-3/)
  * [Tesla FSD Chip - Revolutionary or Over Hyped?](https://www.youtube.com/watch?v=zdUHp3y8VkU&feature=emb_rel_end)
  

#### Other
* [Artificial Intelligence](/artificial_intelligence)
* [Cloud Data Platform](/cloud_data_platform)
* [Cognitive Science](/cognitive_science)
* [Computation Theory](/computation_theory)
* [Language Models](/language_models)
* [Machine Learning](/machine_learning)
* [Meta Learning](/meta_learning)
* [MLOps](/mlops)
* [Probabilities and Statistics](/probabilities_and_statistics)
* [Robotics](/robotics)
* [Self Driving Cars](/self_driving_cars)
* [Computational Topology](/computational_topology)
