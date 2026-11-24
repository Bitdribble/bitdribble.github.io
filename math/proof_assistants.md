---
layout: page
mathjax: true
title: Proof Assistants and Proof Checkers
---
#### Overview
* A **proof checker** verifies that a complete formal proof is correct, step by step, against the rules of a logic. A **proof assistant** (interactive theorem prover) helps you *build* that proof, usually through tactics, automation and an editor that shows the current goals.
* **De Bruijn criterion**: the proof is ultimately checked by a small, trusted *kernel*. Tactics and automation can be large and buggy, since everything they produce is re-checked by the kernel.
* Main foundations
  * Dependent type theory (Curry–Howard: propositions are types, proofs are programs): Lean, Rocq (Coq), Agda
  * Higher-order logic: Isabelle/HOL, HOL Light, HOL4
  * Set theory on first-order logic: Metamath (set.mm), Mizar
* Freek Wiedijk: [The Seventeen Provers of the World](https://www.cs.ru.nl/~freek/comparison/comparison.pdf) (2006) - the same proof ($\sqrt{2}$ is irrational) in seventeen systems
* Notices of the AMS special issue on formal proof (2008)
  * Thomas Hales: [Formal Proof](https://www.ams.org/notices/200811/tx081101370p.pdf)
  * Georges Gonthier: [Formal Proof - The Four-Color Theorem](https://www.ams.org/notices/200811/tx081101382p.pdf)
  * John Harrison: [Formal Proof - Theory and Practice](https://www.ams.org/notices/200811/tx081101395p.pdf)

#### Systems

##### Lean
* [Lean](https://lean-lang.org/), [Wikipedia](https://en.wikipedia.org/wiki/Lean_(proof_assistant)), [Lean FRO](https://lean-fro.org/), [Community](https://leanprover-community.github.io/), [Zulip](https://leanprover.zulipchat.com/)
* [Mathlib](https://leanprover-community.github.io/mathlib4_docs/) - the unified library of formalized mathematics, [stats](https://leanprover-community.github.io/mathlib_stats.html)
* Tutorials
  * [Natural Number Game](https://adam.math.hhu.de/#/g/leanprover-community/nng4) - the best first contact
  * [Theorem Proving in Lean 4](https://lean-lang.org/theorem_proving_in_lean4/)
  * [Mathematics in Lean](https://leanprover-community.github.io/mathematics_in_lean/)
  * [Functional Programming in Lean](https://lean-lang.org/functional_programming_in_lean/)
* Leonardo de Moura & Sebastian Ullrich: [The Lean 4 Theorem Prover and Programming Language](https://link.springer.com/chapter/10.1007/978-3-030-79876-5_37) (2021)
* Videos
  * [Lean for the Curious Mathematician '20](https://www.youtube.com/watch?v=8mVOIGW5US4&list=PLlF-CfQhukNlxexiNJErGJd2dte_J1t1N&index=1)
    * [Mathematics in Lean introduction - Patrick Massot](https://www.youtube.com/watch?v=lw8EfTmWzRU&list=PLlF-CfQhukNlxexiNJErGJd2dte_J1t1N&index=4)
* Kevin Buzzard: [Xena Project blog](https://xenaproject.wordpress.com/)

##### Rocq (formerly Coq)
* [Rocq](https://rocq-prover.org/) - Coq was renamed Rocq in 2025, [Coq (old site)](https://coq.inria.fr/)
* Libraries: [Mathematical Components](https://math-comp.github.io/), [UniMath](https://github.com/UniMath/UniMath)
* Books and tutorials
  * [Software Foundations](https://softwarefoundations.cis.upenn.edu/), B. Pierce et al
  * [Mathematical Components book](https://math-comp.github.io/mcb/), A. Mahboubi & E. Tassi
  * [Coq in a hurry](https://cel.archives-ouvertes.fr/inria-00001173v6/document), Yves Bertot (2017)
  * [Spartan Martin-Löf Type Theory](https://unimath.github.io/Schools/2019-04-Birmingham/Part1_Spartan_Type_Theory/Spartan-Type-Theory.pdf), Andrej Bauer (2019)
* Video
  * [How to use Coq with Proof General](https://www.youtube.com/watch?v=l6zqLJQCnzo), Andrej Bauer (2011). I [installed UniMath Coq](https://unimath.github.io/Schools/installation.html) on MacBook, had to create `pierce_lem.v` in a subfolder under `UniMath/UniMath`, and had to `Require Export UniMath.Foundations.Propositions.` at the top. Also, I had to place `etags` in the `PATH`.

##### Isabelle
* [Isabelle](https://isabelle.in.tum.de/), [Archive of Formal Proofs](https://www.isa-afp.org/)
* Sledgehammer: calls external automated provers and SMT solvers, then reconstructs their proofs in Isabelle
* T. Nipkow & G. Klein: [Concrete Semantics](http://www.concrete-semantics.org/)
* [Comparison of Two Theorem Provers: Isabelle/HOL and Coq](https://arxiv.org/pdf/1808.09701.pdf)
* [Isabelle Theorem Prover tutorial](https://www.youtube.com/watch?v=1nEpUoVopT0)

##### Agda
* [Agda documentation](https://agda.readthedocs.io/), [Wikipedia](https://en.wikipedia.org/wiki/Agda_(programming_language))
* Cubical Agda: computational univalence, for [Homotopy Type Theory](https://homotopytypetheory.org) ([Coq-HoTT library](https://github.com/HoTT/Coq-HoTT))
* P. Wadler et al: [Programming Language Foundations in Agda](https://plfa.github.io/)

##### HOL family
* [HOL Light](https://www.cl.cam.ac.uk/~jrh13/hol-light/), John Harrison - tiny kernel, used for Flyspeck
* [HOL4](https://hol-theorem-prover.org/)

##### Metamath
* [Metamath](https://us.metamath.org/) - a minimal verifier; set.mm builds mathematics on ZFC
* [Metamath book](http://us.metamath.org/downloads/metamath.pdf), by Norman Megill, revised by David A. Wheeler (2019)
* [Metamath Zero](https://github.com/digama0/mm0), Mario Carneiro

##### Mizar
* [Mizar](http://mizar.org/) - one of the oldest systems (1973), with a large Mizar Mathematical Library, proofs written in a readable, mathematical style

##### Others
* [F*](https://fstar-lang.org/), [Idris](https://www.idris-lang.org/) - dependently typed languages focused on verified programs

#### Comparison

| System | Foundation | Kernel | Automation | Main library | Typical use |
|---|---|---|---|---|---|
| Lean 4 | Dependent type theory (CIC) | Small | Tactics, `simp`, `omega`, `aesop` | Mathlib | Research mathematics, programming |
| Rocq | Dependent type theory (CIC) | Small | Tactics, SSReflect | MathComp, UniMath | Mathematics, verified software (CompCert) |
| Isabelle/HOL | Higher-order logic | Small (LCF) | Strong: Sledgehammer | AFP | Verified software (seL4), mathematics |
| Agda | Dependent type theory (MLTT) | Type checker | Weak, interactive holes | agda-stdlib, cubical | Type theory, HoTT, PL research |
| HOL Light | Higher-order logic | Tiny | Moderate | Multivariate analysis | Flyspeck, floating point verification |
| Metamath | Set theory (ZFC) | Tiny verifier | Minimal | set.mm | Foundations, fully explicit proofs |
| Mizar | Set theory (Tarski–Grothendieck) | Checker | Moderate | MML | Classical mathematics |

#### Landmark Formalizations
* Four Color Theorem, Coq, G. Gonthier (2005) - see the Notices article above
* Feit–Thompson (Odd Order) Theorem, Coq, G. Gonthier et al: [A Machine-Checked Proof of the Odd Order Theorem](https://hal.inria.fr/hal-00816699) (2013)
* Kepler Conjecture (Flyspeck), HOL Light + Isabelle, T. Hales et al: [A formal proof of the Kepler conjecture](https://arxiv.org/abs/1501.02155) (2015)
* Liquid Tensor Experiment, Lean: [Scholze's challenge](https://xenaproject.wordpress.com/2020/12/05/liquid-tensor-experiment/) (2020), [completion](https://leanprover-community.github.io/blog/posts/lte-final/) (2022)
* Polynomial Freiman–Ruzsa conjecture, Lean, T. Tao et al: [PFR project](https://teorth.github.io/pfr/) (2023), formalized within weeks of the paper
* Fermat's Last Theorem, Lean, K. Buzzard et al: [FLT project](https://imperialcollegelondon.github.io/FLT/) (ongoing)
* Equational Theories Project, Lean, T. Tao et al: [project](https://teorth.github.io/equational_theories/) (2024) - large scale collaboration, humans and computers, on 22 million implications between magma laws
* Software: [CompCert](https://compcert.org/) verified C compiler (Coq), [seL4](https://sel4.systems/) verified microkernel (Isabelle)

#### Tracking Progress
* Freek Wiedijk: [Formalizing 100 Theorems](https://www.cs.ru.nl/~freek/100/)
* [100 theorems in Lean](https://leanprover-community.github.io/100.html)

#### AI and Proof Checkers
The checker makes AI output trustworthy: an LLM can propose a proof, and the kernel accepts or rejects it. For the research literature, see [Automated Theorem Proving](/math/automated_theorem_proving).
* Google DeepMind: [AlphaProof - AI achieves silver-medal standard solving IMO problems](https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level/) (2024), Lean
* [DeepSeek-Prover-V2](https://github.com/deepseek-ai/DeepSeek-Prover-V2) (2025), Lean
* [LeanDojo](https://leandojo.org/) - tools and datasets for machine learning on Lean, [Lean Copilot](https://github.com/lean-dojo/LeanCopilot)
* K. Zheng et al: [MiniF2F: A Cross-System Benchmark for Formal Olympiad-Level Mathematics](https://arxiv.org/pdf/2109.00110.pdf) (2022)

#### People
* [Kevin Buzzard](https://www.imperial.ac.uk/people/k.buzzard) - Lean, FLT project
* Leonardo de Moura - creator of Lean
* Patrick Massot - Mathematics in Lean
* [Terence Tao](https://terrytao.wordpress.com/) - PFR, Equational Theories Project
* Georges Gonthier - Four Color Theorem, Feit–Thompson
* Thomas Hales - Flyspeck
* [John Harrison](https://www.cl.cam.ac.uk/~jrh13/) - HOL Light
* [Larry Paulson](https://www.cl.cam.ac.uk/~lp15/) - Isabelle
* [Thierry Coquand](http://www.cse.chalmers.se/~coquand/) - Calculus of Constructions
* [Vladimir Voevodsky](https://www.math.ias.edu/vladimir/home) (1966-2017) - univalent foundations

#### Other
* [Automated Theorem Proving](/math/automated_theorem_proving)
* [Philosophy of Math](/math/philosophy_of_math)
* [Computation Theory](/computation_theory)
