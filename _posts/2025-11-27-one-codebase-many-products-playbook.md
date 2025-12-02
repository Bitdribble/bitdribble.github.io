---
layout: post
title: "The 'One Codebase, Many Products' Playbook"
date: 2025-11-27
categories: [ai, webdev, programming]
image: /assets/images/blog/one-codebase-many-products.svg
---

In the AI era, velocity matters. Building each AI product from scratch—authentication, billing, observability, LLM routing—takes months. What if you could reuse the same codebase for multiple products?

This playbook shows how we built one open-source AI SaaS framework that powers [SigAgent.AI](https://sigagent.ai) (real-time AI agent monitoring), [DocRouter.AI](https://docrouter.ai) (smart document understanding), and client consulting portals. The same infrastructure, different AI workflows.

---

## The Problem: Infrastructure is Commodity

When we launched DocRouter.AI, we spent three months building the same infrastructure every AI product needs:

- **Authentication**: NextAuth for user sessions, OAuth providers, role-based access
- **Billing**: Stripe integration for subscriptions, credit packs, usage tracking
- **AI Layer**: LiteLLM for LLM routing, error handling, cost tracking
- **Observability**: OpenTelemetry for tracing AI workflows, debugging failures
- **Data Storage**: MongoDB for user data, usage logs, analytics

When we built SigAgent.AI, we cloned DocRouter's codebase. In three weeks, it was live with full Stripe integration, authentication, and monitoring—90% code reuse.

**Key Insight**: AI SaaS infrastructure is commodity. Differentiation lies in AI workflows, not plumbing.

---

## The Solution: Modular, Reusable Stack

Our platform follows four principles:

### 1. **Shared Core, Custom Workflows**

The core provides:
- **Frontend**: Next.js with NextAuth and Tailwind CSS
- **Backend**: FastAPI with MongoDB
- **AI Layer**: LiteLLM for multi-provider LLM APIs
- **Observability**: OpenTelemetry integration
- **Billing**: Stripe for subscriptions, credit packs, usage-based invoicing

Each product adds specialized workflows:
- **DocRouter.AI**: Document parsing, field extraction, validation
- **SigAgent.AI**: Trace ingestion, anomaly detection, performance analytics
- **Consulting Portals**: Lab automation, custom reporting, enterprise integrations

#### Architecture Comparison

Here's how the two products differ architecturally while sharing the same foundation. These diagrams are rendered directly from Excalidraw files:

<div class="architecture-comparison">
  <div class="arch-diagram">
    <div data-excalidraw="/assets/excalidraw/sig_agent_architecture.excalidraw" class="excalidraw-container">
      <div class="loading-placeholder">Loading diagram...</div>
    </div>
    <div class="arch-label">
      <a href="/excalidraw-edit?file=/assets/excalidraw/sig_agent_architecture.excalidraw" target="_blank" style="color: #2563eb; text-decoration: none; font-weight: 500;">
        📝 Edit in Excalidraw
      </a>
    </div>
  </div>
  <div class="arch-diagram">
    <div data-excalidraw="/assets/excalidraw/doc_router_architecture.excalidraw" class="excalidraw-container">
      <div class="loading-placeholder">Loading diagram...</div>
    </div>
    <div class="arch-label">
      <a href="/excalidraw-edit?file=/assets/excalidraw/doc_router_architecture.excalidraw" target="_blank" style="color: #2563eb; text-decoration: none; font-weight: 500;">
        📝 Edit in Excalidraw
      </a>
    </div>
  </div>
</div>

<style>
.architecture-comparison {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin: 2rem 0;
}

.arch-diagram {
  cursor: pointer;
  transition: transform 0.2s;
  text-align: center;
}

.arch-diagram:hover {
  transform: scale(1.02);
}

.excalidraw-container {
  width: 100%;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background: white;
  display: block;
  overflow: hidden;
  padding: 0;
}

.excalidraw-container svg {
  width: 100%;
  height: auto;
  display: block;
  margin: 0;
}

.loading-placeholder {
  color: #666;
  font-size: 0.9rem;
  padding: 2rem;
}

.arch-label {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arch-label a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .architecture-comparison {
    grid-template-columns: 1fr;
  }
}
</style>

<script type="module" src="/packages/excalidraw/render-excalidraw.js"></script>

Both architectures share:
- **Next.js** frontend with **NextAuth** authentication
- **FastAPI** backend integrated with **Stripe** for payments
- **MongoDB** for data persistence
- **REST APIs, Python & TypeScript SDKs** for programmatic access
- **MCP Server** and **Claude agent**

The key difference is in the specialized routes and data models:
- **SigAgent** adds telemetry, traces, and OpenTelemetry endpoints
- **DocRouter** adds documents, OCR, forms, schemas, and prompts

### 2. **Vibe-Coded Branding**

Products are forked and branded directly in source code—colors, logos, messaging, domains. No abstraction layers:

- **Fast Iteration**: Clone repo, search-replace branding, update Tailwind colors
- **Full Control**: Every pixel customizable
- **Stripe Integration**: Product-specific metadata tags (`product=sig_agent`, `product=doc_router`)

```tsx
// SigAgent.AI branding in Layout.tsx
export const metadata = {
  title: 'SigAgent.AI',
  description: 'Real-time AI agent monitoring and telemetry...',
};

<header className="bg-blue-600 border-b border-blue-700">
  <Link href="/" className="text-xl font-semibold text-white">
    SigAgent.AI
  </Link>
</header>

// DocRouter.AI branding (same file, different values)
export const metadata = {
  title: 'Smart Document Router',
  description: 'AI-powered document understanding...',
};

<header className="bg-green-600 border-b border-green-700">
  <Link href="/" className="text-xl font-semibold text-white">
    <span className="block sm:hidden">DocRouter.AI</span>
    <span className="hidden sm:block">Smart Document Router</span>
  </Link>
</header>
```

**Why it works**: Vibe coding trades abstraction for speed. Need a new product? Fork, customize, ship.

### 3. **Open Core, Closed Workflows**

- **Open-source core**: Apache license enables community contributions, transparency for enterprise buyers
- **Closed workflows**: AI logic (SigAgent's anomaly detection, DocRouter's extraction) remains proprietary IP
- **Hybrid advantage**: Open plumbing attracts contributors, closed AI preserves competitive moats

---

## Real-World Applications

### DocRouter.AI: The Foundation (3 months to develop)

Our first product extracts structured data from documents using LLMs. We built the full infrastructure from scratch in 3 months:

**Monetization Model**:
- **Free Tier**: 100 Service Processing Units (SPUs)
- **Individual/Team**: $250/$1,000/month with SPU allowances
- **Credit Packs**: A-la-carte SPUs for usage spikes
- **Enterprise**: Custom contracts with outcome-based pricing

**Key Lesson**: Treat billing as infrastructure, not a feature. Build once, reuse everywhere.

### SigAgent.AI: The Clone (3 weeks)

Real-time AI agent monitoring using OpenTelemetry traces. 90% code reuse:

**Same Infrastructure**:
- NextAuth authentication with Google/GitHub OAuth
- Stripe billing with product-specific metadata (`product=sig_agent`)
- OpenTelemetry for trace analysis

**New AI Logic**: Trace anomaly detection replaces document processing

**Pricing**: $25/$100/month (scaled down from DocRouter's enterprise focus)

### Client Consulting Portals (3 weeks)

When clients need custom AI portals, we fork and customize:

**Process**:
1. Clone repository and rebrand via source code changes
2. Add client-specific AI workflows (lab automation, custom reporting)
3. Deploy with pre-configured Kubernetes + Terraform

**Example**: Lab platform client got an AI portal monitoring their Claude coding copilot and OpenAI chat agents, with automated workflow validation.

**Team**: Product manager (10h/week) + AI architect (20h/week)

**Result**: Monetization-ready portal reusing 95% of existing infrastructure.

---

## Why This Works: Key Lessons

<div class="lessons-container">

<div class="lesson-card lesson-odd">
<div class="lesson-header">
<span class="lesson-num">1</span>
<span class="lesson-title">Infrastructure is Commodity, Workflows are Unique</span>
</div>
<ul class="lesson-list">
<li>Every AI product needs auth, billing, observability</li>
<li>Building these repeatedly wastes time</li>
<li>Standardize the core to focus on AI logic and UI—the real differentiators</li>
</ul>
</div>

<div class="lesson-card lesson-even">
<div class="lesson-header">
<span class="lesson-num">2</span>
<span class="lesson-title">Vibe Coding Beats Configuration Complexity</span>
</div>
<ul class="lesson-list">
<li>Over-engineered config systems slow development</li>
<li>Fork repositories and customize directly in source code</li>
<li>Full control without abstraction overhead</li>
</ul>
</div>

<div class="lesson-card lesson-odd">
<div class="lesson-header">
<span class="lesson-num">3</span>
<span class="lesson-title">Open Core + Closed Workflows = Perfect Balance</span>
</div>
<ul class="lesson-list">
<li>Open-source infrastructure attracts contributors and builds trust</li>
<li>Closed AI workflows preserve competitive advantages</li>
</ul>
</div>

<div class="lesson-card lesson-even">
<div class="lesson-header">
<span class="lesson-num">4</span>
<span class="lesson-title">Speed Compounds in AI</span>
</div>
<ul class="lesson-list">
<li>Launching SigAgent in 3 weeks (vs. 3 months) enabled earlier revenue</li>
<li>Faster iteration and market advantage</li>
<li>Velocity is a multiplier in AI's fast-moving landscape</li>
</ul>
</div>

</div>

<style>
.lessons-container {
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.lesson-card {
  padding: 1.5rem;
}

.lesson-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.lesson-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  background-color: #3b82f6;
  color: #fff;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: 700;
}

.lesson-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.3;
  transition: color 0.2s ease;
}

.lesson-title:hover {
  color: #2563eb;
}

.lesson-list {
  margin: 0 0 0 3rem;
  padding: 0;
  list-style: disc;
  color: #475569;
}

.lesson-list li {
  margin-bottom: 0.4rem;
  line-height: 1.5;
}

.lesson-list li:last-child {
  margin-bottom: 0;
}

.lesson-odd {
  background-color: #f8fafc;
}

.lesson-even {
  background-color: #ffffff;
}
</style>

---

## Your Implementation Playbook

<img src="/assets/images/implementation_playbook.svg" alt="Implementation Playbook - 6 steps from identifying commodities to shipping products" style="width: 100%; max-width: 900px; margin: 2rem auto; display: block;">

1. **Identify Commodities**: Auth, billing, observability, LLM routing are table stakes
2. **Build Modular Core**: Invest upfront in reusable infrastructure
3. **Vibe Code Branding**: Fork repos, search-replace strings, customize in source
4. **Encapsulate UI + AI Logic**: Keep specialized UI and AI workflows separate from infrastructure
5. **Infrastructure-ize Billing**: Wire Stripe from day one for turnkey monetization
6. **Open Plumbing, Close AI**: Share infrastructure, protect unique UI + AI logic

---

## The Open-Source Framework

We've packaged this approach into an open-source framework:

<img src="/assets/images/open_source_framework.svg" alt="Open-Source Framework - Reusable AI SaaS Infrastructure with Next.js, FastAPI, MongoDB, Stripe, LiteLLM, and OpenTelemetry" style="width: 100%; max-width: 900px; margin: 2rem auto; display: block;">

**Tech Stack**: Next.js, FastAPI, MongoDB, Stripe, LiteLLM, OpenTelemetry

**Features**:
- Authentication with NextAuth
- Stripe billing with usage metering
- OpenTelemetry observability
- Multi-tenant support
- Pre-built templates for document AI, agent monitoring, chat portals

**Documentation**: Deployment guides for AWS or Kubernetes

**Why Open Source?** Every AI builder faces infrastructure challenges. By sharing the plumbing, we raise the ecosystem's bar and differentiate on AI workflows.

**Results Proven**:
- **DocRouter.AI**: 3 months (built infrastructure)
- **SigAgent.AI**: 3 weeks (90% reuse)
- **Client Portals**: 3 weeks (95% reuse, custom workflows)

Ready to build? Start with commodity infrastructure, encapsulate unique AI logic, ship fast. Velocity wins in AI.

Interested? [Contact Analytiq Hub](https://analytiqhub.com/contact) or follow [SigAgent.AI](https://sigagent.ai) and [DocRouter.AI](https://docrouter.ai)

---

## Related Posts

- [How I Built a Reusable AI Monetization Platform with Stripe](https://analytiqhub.com/tech/programming/ai/tutorials/how-we-integrated-stripe-into-docrouter-ai/)
- [How To Train Your AI Agent](https://analytiqhub.com/ai/programming/tutorials/how-to-train-your-ai-agent/)
- [DocRouter.AI: An AI Backbone for Document Processing](https://analytiqhub.com/talks/#an-ai-backbone-for-document-processing)

---

*Subscribe to our [RSS feed](/feed.xml) for more on building AI SaaS products.*
