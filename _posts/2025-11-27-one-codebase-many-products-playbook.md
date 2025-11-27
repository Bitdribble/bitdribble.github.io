---
layout: post
title: "The 'One Codebase, Many Products' Playbook"
date: 2025-11-27
categories: [ai, webdev, programming]
---

In the AI era, velocity matters. The faster you can ship products, test monetization strategies, and iterate on customer feedback, the better your odds of finding product-market fit. But building each AI product from scratch—authentication, billing, observability, LLM routing—takes months. What if there was a better way?

Here is our approach: one open-source AI SaaS framework that runs in the cloud as paid products and doubles as a vibe-coded consulting software stack. The same codebase powers [SigAgent.AI](https://sigagent.ai) (real-time AI agent monitoring), [DocRouter.AI](https://docrouter.ai) (smart document understanding), and every internal AI portal we deploy at clients.

This post shares the playbook: how we architected a reusable foundation, what makes it portable across products, and why "one codebase, many products" is the ultimate leverage for AI builders.

---

## The Problem: Every AI Product Needs the Same Infrastructure

When we launched DocRouter.AI, we spent three months building:

- **Authentication**: NextAuth for user sessions, OAuth providers, role-based access.
- **Billing**: Stripe integration for subscriptions, credit packs, usage tracking, and invoices.
- **AI Layer**: LiteLLM for LLM routing, error handling, and cost tracking.
- **Observability**: OpenTelemetry for tracing AI workflows, debugging failures, and performance monitoring.
- **Data Storage**: MongoDB for user data, usage logs, and analytics.

When we decided to build SigAgent.AI, we faced the same list. But this time, instead of starting from scratch, we cloned DocRouter.AI's codebase. In three weeks, SigAgent.AI was live with full Stripe integration, user authentication, and trace-based monitoring—90% of the code unchanged.

That's when we realized: **AI SaaS infrastructure is commodity**. The differentiation is in the AI workflows, not the plumbing.

---

## The Architecture: A Modular, Reusable Stack

Our platform is built on four principles:

### 1. **Shared Core, Custom Workflows**

The core platform provides:
- **Frontend**: Next.js with NextAuth, Tailwind CSS, and shadcn/ui components.
- **Backend**: FastAPI with async endpoints, middleware for auth/billing, and webhook handlers.
- **Database**: MongoDB with schemas for users, organizations, usage logs, and credits.
- **AI Layer**: LiteLLM for multi-provider LLM routing, with fallbacks and retries.
- **Observability**: OpenTelemetry integration for distributed tracing.
- **Billing**: Stripe for subscriptions, one-time purchases, and usage-based invoicing.

Each product adds custom workflows:
- **DocRouter.AI**: Document parsing, field extraction, validation rules.
- **SigAgent.AI**: Trace ingestion, anomaly detection, agent performance analytics.
- **Consulting Portals**: Lab workflow automation, custom reporting, enterprise integrations.

### 2. **Vibe-Coded Branding**

Each product is forked and branded directly in the source code—colors, logos, messaging, domain names. This "vibe coding" approach means:

- **Fast Iteration**: Clone the repo, search-and-replace branding strings, update Tailwind theme colors.
- **Full Control**: No abstraction layer limiting design choices—every pixel is customizable.
- **Stripe Integration**: Product-specific Stripe metadata tags (`product=sig_agent`, `product=doc_router`) stay in code.

```javascript
// Example: SigAgent.AI's branding vibe-coded in layout
<header className="bg-blue-600">
  <img src="/logos/sigagent.svg" alt="SigAgent.AI" />
  <h1>Real-Time AI Agent Monitoring</h1>
</header>
```

**Lesson**: Vibe coding trades abstraction for speed. When you need a new product, you fork and customize—no config frameworks to fight.

### 3. **Modular AI Workflows**

AI logic is encapsulated in modules:

```python
# workflows/document_ai.py
async def process_document(file_path: str, schema: dict):
    # DocRouter.AI-specific logic
    pass

# workflows/trace_ai.py
async def analyze_traces(trace_batch: list):
    # SigAgent.AI-specific logic
    pass
```

The core platform doesn't care what AI workflow runs—it just meters usage, applies credits, and logs traces. This separation means:
- Adding a new product = adding a new workflow module.
- Shared infra (auth, billing, telemetry) stays untouched.

### 4. **Open-Source Core, Closed-Source Products**

The platform core is open-source (Apache license), enabling:
- Community contributions (e.g., new LLM providers, auth integrations).
- Transparency for enterprise buyers ("show me the code").
- Reuse by other builders (our "rising tide lifts all boats" strategy).

Product-specific workflows (DocRouter's extraction logic, SigAgent's OpenTelemetry support) are open source. Customer-specific workflows (SigAgent's anomaly detection) remain closed-source IP. This hybrid model balances openness with competitive advantage.

---

## Product 1: DocRouter.AI (The Foundation)

DocRouter.AI extracts structured data from unstructured documents (PDFs, images, forms) using LLMs. Its monetization model:

- **Free Tier**: 100 Service Processing Units (SPUs), no credit card.
- **Individual/Team Plans**: $250/$1,000/month with SPU allowances.
- **Credit Packs**: A-la-carte SPUs for usage spikes.
- **Enterprise**: Custom contracts with outcome-based pricing.

**Implementation Time**: Three months (first product, learning Stripe's quirks).

**Key Insight**: By treating billing as infrastructure—not a feature—we built once and reused everywhere.

---

## Product 2: SigAgent.AI (The Clone)

SigAgent.AI monitors AI agents in real-time, analyzing OpenTelemetry traces to detect failures, slow steps, and cost anomalies. It uses the same stack:

- **Same Auth**: NextAuth with Google/GitHub OAuth.
- **Same Billing**: Stripe with hybrid model (plans + credit packs). Different pricing: $25/$100/month with SPU allowances.
- **New Observability**: OpenTelemetry, analyzing Claude Agent traces.
- **New AI Logic**: Trace analysis replaces document processing.

**Implementation Time**: Three weeks (90% code reuse).

**Pricing Lesson**: By using Stripe metadata (`product=sig_agent`, `tier=team`), we launched without touching billing code. Configuration, not code changes.

---

## Consulting Use Case: "Vibe-Coded" Client Portals

When clients need custom AI portals, we:

1. **Clone the Repo**: Rebrand via config file.
2. **Add Workflows**: Build client-specific AI logic (e.g., lab report automation).
3. **Deploy Fast**: Kubernetes manifests + Terraform pre-configured.

**Example**: For a lab platform client, we stood up an AI portal to:
- Monitor their coding copilot (Claude agent traces) and their chat agent (OpenAI LLM with tool calls)
- Automate lab workflow validation.

**Timeline**: Three weeks implementation with a product manager (10h/week) + AI architect (20h/week).

**Outcome**: A monetization-ready portal, reusing 95% of SigAgent.AI's infrastructure.

---

## Why This Works: Lessons from the Trenches

### 1. **AI Differentiation is in UI and Workflows, Not Infrastructure**

Every AI product needs auth, billing, and observability. Building these repeatedly is wasted effort. By standardizing the core, we focus energy on AI logic and UI—the actual value proposition.

### 2. **Vibe Coding > Configuration Complexity**

Over-engineered config systems slow you down. Vibe coding—forking repos and customizing directly in source—gives full control without abstraction overhead. When you need a new product, fork, search-replace, and ship.

### 3. **Open Core + Closed Workflows = Leverage**

Open-sourcing the platform attracts contributors and builds trust. Keeping AI workflows closed preserves competitive moats. Both can coexist.

### 4. **Speed Compounds**

Launching SigAgent.AI in three weeks (vs. three months) meant earlier revenue, faster feedback, and more iterations. Speed is a multiplier in AI's fast-moving landscape.

---

## Your Playbook: Building Reusable AI Products

To replicate this pattern:

1. **Identify Commodity Infrastructure**
   - Auth, billing, observability, LLM routing—these are table stakes, not differentiators.

2. **Build Once, Fork Forever**
   - Invest upfront in a modular core. Future products are repo forks away.

3. **Embrace Vibe Coding**
   - Fork, search-replace branding, customize colors/logos in source. Skip config abstraction layers.

4. **Encapsulate AI Logic**
   - Keep workflows separate from infrastructure. This enables clean reuse.

5. **Treat Billing as Infrastructure**
   - Wire Stripe (or equivalent) into the platform from day one. Monetization should be turnkey.

6. **Open What's Commodity, Close What's Unique**
   - Open-source the plumbing, keep the AI workflows proprietary.

---

## The Framework

We've packaged this playbook into an open-source framework:

- **Tech Stack**: Next.js, FastAPI, MongoDB, Stripe, LiteLLM, OpenTelemetry.
- **Features**: Auth, billing, usage metering, trace observability, multi-tenant support.
- **Templates**: Pre-built workflows for document AI, agent monitoring, and chat portals.
- **Docs**: Deployment guides (Kubernetes, AWS, GCP), customization tutorials.

**Why Open Source?** Because every AI builder faces this problem. By sharing the plumbing, we raise the bar for the entire ecosystem—and differentiate on AI workflows, not infrastructure.

Interested in early access? [Contact Analytiq Hub](https://analytiqhub.com/contact) or follow updates at [SigAgent.AI](https://sigagent.ai).

---

## Conclusion: The Ultimate Leverage

In 2025, AI products multiply faster than teams can build infrastructure. The builders who win will master reuse—turning one codebase into many products, one deployment into many clients.

We've proven it works:
- **DocRouter.AI**: Three months to build.
- **SigAgent.AI**: Three weeks to launch.
- **Client Portals**: Three weeks to deploy, integrated with client coding copilot and chat agent.

That's the power of "one codebase, many products." It's not just a technical pattern—it's a business model.

Ready to build yours? Start with the commodity (auth, billing, observability), encapsulate the unique (AI workflows), and ship fast. The AI era rewards velocity.

---

## Related Posts

- [How I Built a Reusable AI Monetization Platform with Stripe](/webdev/artificial_intelligence/2025/11/15/reusable-ai-monetization-platform-stripe.html)
- [Cloud Notebooks Architecture](/tech/programming/ai/2025/03/05/cloud-notebooks-architecture.html)

---

*This post is part of our series on building AI SaaS products. Subscribe to our [RSS feed](/feed.xml) for updates, or reach out to [Analytiq Hub](https://analytiqhub.com) for consulting on reusable AI architectures.*
