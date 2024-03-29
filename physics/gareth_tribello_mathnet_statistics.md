---
layout: page
mathjax: true
title: Gareth Tribello - MathNet - Statistics
---
Notes on [MathNet](http://gtribello.github.io/mathNET)

This is a multi-part post:
* [MathNet - Classical Thermodynamics](gareth_tribello_mathnet_classical_thermodynamics.md)
* [MathNet - Statistical Mechanics](gareth_tribello_mathnet_statistical_mechanics.md)
* [MathNet - Statistics](gareth_tribello_mathnet_statistics.md)

[Markov chains - Definition and Transition Matrix](http://gtribello.github.io/mathNET/markov-property-video.html)

[Markov chains - Chapman Kolmogorov relation](http://gtribello.github.io/mathNET/chapman-kolmogorov-video.html)
* Given a stationary Markov chain with transition matrix $$A$$, the transition matrix for going $$n$$ steps is $$A^n$$

[Markov chains - Transient and Recurrent states](http://gtribello.github.io/mathNET/transient-recurrent-video.html)
* Transient states are those where $$P(R_i \le \infty) \lt 1$$
* Recurrent states are those where $$P(R_i \le \infty) = 1$$
  * Here, $$R_i$$ is the number of steps it takes to return to state $$i$$,

[Ergodic Markov chains - Derivation of the Ergodic theorem](http://gtribello.github.io/mathNET/limiting-stationary-dist-video1.html)
* If all states are recurrent, then $$\lim_{n \rightarrow \infty} A^n$$ has identical rows.
  * The transition probabilities for all states in $$A^n$$, at the limit, settle to the same values
* A chain is ergodic if it has a limiting stationary distribution and if none of the elements of this distribution are zero
  * Ergodic Markov chains cannot have transient states
* Notation:
  * $$M_i(n)$$ is the number of visits to state $$i$$, $$n$$ is the number of steps in chain
  * $$T_i$$ is the return time to state $$i$$
* Ergodic Theorem:
  * $$\lim_{n \rightarrow \infty} \frac{M_i(n)}{n} = \frac{1}{\mathbb{E}(T_i)}$$, for recurrent states $$i$$
    * (Andrei) For some reason, Gareth changes notation $$R_i \rightarrow T_i$$
    * If the state $$i$$ is transient, then $$P(R_i \le \infty) \lt 1$$, and $$R_i$$ is not a proper random variable. So we can't compute $$\mathbb{E}(R_i)$$.
* Proof of the Ergodic Theorem:
  * For $$n \gt 0$$, build a chain of length $$n$$ starting with state $$i$$.
    * We return $$M_i(n)-1$$ times to state $$i$$ in $$n$$ steps, and $$M_i(n)$$ times in more than $$n$$ steps
    * $$\sum_{k=1}^{M_i - 1} T_i \le n \le \sum_{k=1}^{M_i} T_i$$
    * $$\lim_{n \rightarrow \infty} \frac{1}{M_i}\sum_{k=1}^{M_i - 1} T_i \le \lim_{n \rightarrow \infty} \frac{n}{M_i} \le \lim_{n \rightarrow \infty} \frac{1}{M_i}\sum_{k=1}^{M_i} T_i$$
    * By the law of large numbers, $$\mathbb{E}(T_1) \le ac{1}{M_i}\sum_{k=1}^{M_i - 1} T_i \le \mathbb{E}(T_1)$$
    * This completes the proof
* A states period is the GCD of its return times $$d(j) = gcd\{n\,:\, p^n_{jj} \gt 0\}$$
* The proof of the Ergodic theorem breaks down if there are periodic states

[Ergodic Markov chains - Why the limiting stationary distribution can be found from the principal left eigenvector of the transition matrix](http://gtribello.github.io/mathNET/limiting-stationary-dist-video2.html)

[Monte Carlo Simulation - Brief Introduction](http://gtribello.github.io/mathNET/monte-carlo-video.html)

[Monte Carlo Simulation - Using Block Averages to Calculate the Statistical Error](http://gtribello.github.io/mathNET/block_averaging_video.html)

[Markov Chains in Continuous Time](http://gtribello.github.io/mathNET/continuous-time-markov.html)
* Suppose a rectangle changes color randomly. How can that be modeled?
  * Could be modeled with a discrete Markov chain. Divide the time axis in intervals of size $$t$$, and at interval boundary $$n$$, assume that the color changes with a probability $$p_n$$ independent of earlier states.
  * Problem with this is that the transition points are discrete.
  * Why not divide the time intervals into half-intervals of size $$t/2$$?
* Solution is to use calculus. Write the transition probability matrix as a function of time.
* At start, probability matrix is $$P(0)$$. At time $$t$$, it is $$P(t)$$.
* The $$P(t)$$ gives us a matrix, not a number.
* We have $$\frac{\mathrm{d}P(t)}{\mathrm{d}t} = \lim_{\delta t \rightarrow 0} \frac{P(t+\delta t) - P(t)}{\delta t}$$
* Chapman-Kolmogorov relation for a discrete Markov chain was $$A^{m+n}=A^m A^n$$
* A continuous analogue is $$P(t+h)=P(t)P(h)$$
* Assuming continuous Chapman-Kolmogorov:

$$
\begin{align*}
\frac{\mathrm{d}P(t)}{\mathrm{d}t} &= \lim_{\delta t \rightarrow 0} \frac{P(t+\delta t) - P(t)}{\delta t} = \lim_{\delta t \rightarrow 0} P(t)\frac{P(\delta t) - I}{\delta t} \\
&= P(t) \lim_{\delta t \rightarrow 0} \frac{P(\delta t) - I}{\delta t} = P(t) \frac{\mathrm{d}P(0)}{\mathrm{d}t}
\end{align*}
$$

* Let $$\frac{\mathrm{d}P(0)}{\mathrm{d}t} = Q$$
* We can set $$Q$$ to anything, the only condition is that the sum of each row's elements is zero - because $$P(\delta t)$$ is a probability matrix, so each of its rows has sum $$1$$.
* The differential equation $$\frac{\mathrm{d}P(t)}{\mathrm{d}t} = P(t)Q$$ is called the Kolmogorov forward relationship. $$Q$$ is called the jump rate matrix.
* Solution is $$P(t) = e^{tQ}$$, where $$e^{tQ} = \sum_{i=0}^\infty \frac{1}{n!}t^nQ^n$$
* If a non-zero vector $$\pi$$ satisfies $$\pi Q = 0$$, then $$\pi$$ would be the stationary distribution of the Markov chain, because $$P(t)=\pi$$ is a solution to the Kolmogorov equation.
