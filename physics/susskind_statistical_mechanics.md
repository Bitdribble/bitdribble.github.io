---
layout: page
mathjax: true
title: Leonard Susskind - Statistical Mechanics - Andrei's Notes
---

[Statistical Mechanics](https://theoreticalminimum.com/courses/statistical-mechanics/2013/spring) (Spring 2013)

[L1: Entropy and conservation of information](https://www.youtube.com/watch?v=D1RzvXDXyqA)
* Given $$N$$ states, assuming the system can take one of $$M \le N$$ states with equal probability $$\frac{1}{M}$$, its entropy is defined as $$S=\log M$$.
  * It is a measure of uncertainty - of lack of information.
* Liouville theorem:
  * The volume in phase space of a system does not change in time.
  * If you start with a uniform distribution in the phase space, the distribution remains uniform over time.
* 0th law of thermodynamics: if system A is in thermal equilibrium with B, and B with C, then A is in thermal equilibrium with C. But we will define later what thermal equilibrium is.
* 1st law of thermodynamics is, essentially, the conservation of energy for a closed system: $$\frac{\mathrm{d}E}{\mathrm{d}t} = 0$$
* In this course, $$T$$ is $$k_Bt$$, for the classic Kelvin temperature $$t$$, and entropy $$S$$ is defined probabilistically as $$S=-\int p \ln p$$, which is $$k_B$$ times classic thermodynamic entropy.
  * Computer scientists use $$\log_2$$, physicists use $$\log_e$$
* In the 1st law of thermodynamics $$\mathrm{d}E = T \mathrm{d}S$$, if we switch units for $$T$$ and $$S$$ and use the classic thermodynamic definition of temperature and entropy, the 1st law of thermodynamics still holds.

[L2: Temperature](https://www.youtube.com/watch?v=MCRHXHskWnE&list=PLpGHT1n4-mAsJ123W3fjPzvlDHOvIhHA0&index=2)
* Temperature really has units of energy
* Entropy is unitless
  * Any physical property that is defined in terms of logarithms, usually, should be expected to be unitless.
* States, probability distributions, energy, entropy
* Definition of temperature as $$T = \frac{\partial E}{\partial S}$$
* 1st law of thermodynamics: $$\mathrm{d}E = T \mathrm{d}S$$
* 2nd law of thermodynamics: the entropy of an isolated system will increase
* The two laws of thermodynamics imply that temperature equalizes in a system that comes to thermodynamic equilibrium (begin proof)

[L3: Maximizing entropy](https://www.youtube.com/watch?v=EmM1jOV1uSY&list=PLpGHT1n4-mAsJ123W3fjPzvlDHOvIhHA0&index=3)
* 1st law of thermodynamics
* The two laws of thermodynamics imply that temperature equalizes in a system that comes to thermodynamic equilibrium (complete proof)
* Why a system's probability distribution seeks to occupy states that maximize its entropy
* Shown by creating $$N$$ identical replicas of the system, and pointing out that the $$N$$ systems would seek to maximize their total number of states
* Proof of the Stirling formula $$N! \approx N^N e^{-N}$$, by estimating $$\sum_{x=1}^N \ln x \approx \int_{x=1}^N \ln x$$, and noticing that $$\int \ln x = x \ln x - x$$
* The method of Lagrange multipliers, explained
  * The variables will the the probability values in the distribution
  * Two constraints: Probabilities add up to $$1$$. Average energy $$E = \sum p_i E_i$$ is given.
* Next class will solve the Lagrange multipliers for maximizing entropy with a given average energy constraint
* Temperature will be a Lagrange multiplier

[L4: The Boltzmann distribution](https://www.youtube.com/watch?v=rhFkYjaM5kE&list=PLpGHT1n4-mAsJ123W3fjPzvlDHOvIhHA0&index=4)
* Occupation number of an ensemble
* Lagrange multipliers
* Maximizing entropy under constraints
* $$p_i &= -\frac{1}{Z} e^{-\beta E_i}$$
* Partition function $$Z = \sum_i e^{-\beta E_i}$$
* Entropy comes before temprature
* Temperature is $$\frac{1}{\beta}$$
* Ideal Gas
* Energy of Ideal Gas
* Adding Gravity to Partition function

[L5: Pressure of an ideal gas and fluctuations](https://www.youtube.com/watch?v=2BJYXuZZK3c&list=PLpGHT1n4-mAsJ123W3fjPzvlDHOvIhHA0&index=5)
* Express entropy $$E$$ using the partition function

$$
\begin{align*}
S &= -\sum_i p_i \ln p_i \\
  &= \frac{1}{Z}\sum_i e^{-\beta E_i} \left( \ln  e^{-\beta E_i} - \ln Z\right) \\
  &= \frac{1}{Z}\sum_i e^{-\beta E_i} \left( -\beta E_i - \ln Z\right) \\
  &= E + \ln Z
\end{align*}
$$

[L6: Weakly interacting gases, heat, and work](https://www.youtube.com/watch?v=bW30Rj6w8VI&list=PLpGHT1n4-mAsJ123W3fjPzvlDHOvIhHA0&index=6)

[L7: Entropy versus reversibility](https://www.youtube.com/watch?v=sg15UClUY48&list=PLpGHT1n4-mAsJ123W3fjPzvlDHOvIhHA0&index=7)

[L8: Entropy, reversibility, and magnetism](https://www.youtube.com/watch?v=3hh0lJZbUfo)

[L9: Ising Model](https://www.youtube.com/watch?v=AT4_S9vQJgc)
* 1-dimensional Ising Model
* Duality
* 2-dimensional Ising Model
* Mean field approximation
* Adding an external magnetic field
* Spontaneous symmetry breaking

[L10: Liquid-gas phase transition](https://www.youtube.com/watch?v=IWtcFAP3ju4)

#### Other
* [Physics](../physics.md)