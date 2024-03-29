---
title: "The Exponential Family"
categories: probabilities staristics
author:
- Andrei Radulescu-Banu
layout: post
mathjax: true
---

A distribution is in the _exponential family_ if it is of the form

$$
\begin{align*}
p(y; \eta) = b(y) e^{\eta^T \cdot T(y) - a(\eta)}
\end{align*}
$$

- $$T(y)$$ is called the _sufficient statistics_
- $$\eta$$ is the _natural_ or _canonical_ parameter.
- Both $$T(y)$$ and $$\eta$$ are column vectors in $$\mathbb{R}^n$$.
- Usually $$T(y) = y$$.
- $$a(\eta)$$ is called the _log partition_ function, or the _cumulant_ function. 


As we vary $$\eta$$ with fixed $$a, b, T$$ we get a family of distributions parametrized by the canonical parameter $$\eta$$.

## The Bernoulli distribution is in the exponential family

The Bernoulli distribution with mean $$\phi$$ is

$$
\begin{align*}
Bernoulli(y; \phi) &= \phi^y \cdot (1-\phi)^{1-y} \\
                        &= e^{y \ln \phi + (1-y) \ln (1-\phi)} \\
                        &= e^{(\ln \frac{\phi}{1-\phi}) y + \ln(1-\phi)}
\end{align*}
$$

We get the exponential family form with

$$
\begin{align*}
\eta    &= \ln \frac{\phi}{1-\phi} & \iff & \phi = \frac{e^\eta}{1+ e^\eta} \\
b(y)    &= 1 \\
T(y)    &= y \\
a(\eta) &= \ln(1+e^\eta)
\end{align*}
$$

## The Gaussian distribution is in the exponential family

The Gaussian distribution with mean $$\mu$$ and variance $$\sigma^2$$ is

$$
\begin{align*}
\mathcal{N}(y; \mu, \sigma^2) &= \frac{1}{\sigma \sqrt{2 \pi}} e^{-\frac{1}{2}(\frac{y-\mu}{\sigma})^2} \\
                         &= \frac{1}{\sigma \sqrt{2 \pi}} e^{\left[-\frac{1}{2\sigma^2}, \frac{\mu}{\sigma}\right][y^2, y] - a(\eta)}
\end{align*}
$$

where we define the canonical parameter $$\eta = \left[-\frac{1}{2\sigma^2}, \frac{\mu}{\sigma}\right]$$, and we define the log partition function $$a(\eta)$$ such that the distribution integrates over $$y$$ to 1.

Similarly, the multivariate Gaussian is in the exponential family.

## The Poisson distribution is in the exponential family

The Poisson distribution with mean and variance $$\lambda$$ is

$$
\begin{align*}
Poisson(k ; \lambda) &= \frac{\lambda^k}{k!} e^{-\lambda} \\
                     &= \frac{1}{k!} e^{ k \ln \lambda - \lambda}
\end{align*}
$$

where we define

$$
\begin{align*}
\eta &= \ln \lambda \\
T(k) &= k \\
a(\eta) &= \eta \\
b(k) &= \frac{1}{k!} \\
\end{align*}
$$

## The Gamma distribution is in the exponential family

The Gamma distribution is defined as:

$$
\begin{align*}
Gamma(y; \alpha, \beta) &= \frac{y^{\alpha-1} e^{-\beta y} \beta^\alpha}{\Gamma(\alpha)}
\end{align*}
$$

for $$\alpha, \beta \gt 0$$ where $$\Gamma(\alpha) = \int_{0}^\infty t^{\alpha -1}e^{-t}dt$$. The $$\Gamma()$$ function extends the factorial, in the sense that $$\Gamma(n) = (n -1)!$$ for natural numbers $$n$$.

We rewrite

$$
\begin{align*}
Gamma(y; \alpha, \beta) &= \frac{y^{\alpha-1} e^{-\beta y} \beta^\alpha}{\Gamma(\alpha)} \\
                        &= e^{-\ln \Gamma(\alpha) + (\alpha -1)\ln y + \alpha \ln \beta}
\end{align*}
$$

where we define

$$
\begin{align*}
\eta &= [\alpha-1, \beta] \\
T(y) &= [\ln y, 0] \\
\end{align*}
$$

and we define the log partition function $$a(\eta)$$ such that the distribution integrates over $$x$$ to 1.


## The Beta distribution

Defined as

$$
\begin{align*}
Beta(y ; \alpha, \beta) = \frac{y^{\alpha - 1} (1-y)^{\beta - 1}}{B(\alpha, \beta)}
\end{align*}
$$

for $$\alpha, \beta \gt 0$$, where

$$
\begin{align*}
B(\alpha, \beta) = \frac{\Gamma(\alpha) \Gamma(\beta)}{\Gamma(\alpha + \beta)}
\end{align*}
$$

We rewrite

$$
\begin{align*}
Beta(y ; \alpha, \beta) &= e^{(\alpha - 1) \ln y + (\beta - 1) \ln (1-y) - \ln B(\alpha, \beta)} \\
\end{align*}
$$

and we can define

$$
\begin{align*}
\eta &= [\alpha -1, \beta -1] \\
T(y) &= [ \ln y, \ln (1-y)] \\
A(\eta) &= \ln B(\alpha, \beta)
\end{align*}
$$

