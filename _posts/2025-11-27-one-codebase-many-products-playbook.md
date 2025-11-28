---
layout: post
title: "The 'One Codebase, Many Products' Playbook"
date: 2025-11-27
categories: [ai, webdev, programming]
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

### 2. **Vibe-Coded Branding**

Products are forked and branded directly in source code—colors, logos, messaging, domains. No abstraction layers:

- **Fast Iteration**: Clone repo, search-replace branding, update Tailwind colors
- **Full Control**: Every pixel customizable
- **Stripe Integration**: Product-specific metadata tags (`product=sig_agent`, `product=doc_router`)

```typescript
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

### DocRouter.AI: The Foundation (3 months)

Our first product extracts structured data from documents using LLMs. Built the full infrastructure from scratch:

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

### 1. **Infrastructure is Commodity, Workflows are Unique**
Every AI product needs auth, billing, observability. Building these repeatedly wastes time. Standardize the core to focus on AI logic and UI—the real differentiators.

### 2. **Vibe Coding Beats Configuration Complexity**
Over-engineered config systems slow development. Fork repositories and customize directly in source code for full control without abstraction overhead.

### 3. **Open Core + Closed Workflows = Perfect Balance**
Open-source infrastructure attracts contributors and builds trust. Closed AI workflows preserve competitive advantages.

### 4. **Speed Compounds in AI**
Launching SigAgent in 3 weeks (vs. 3 months) enabled earlier revenue, faster iteration, and market advantage. Velocity is a multiplier in AI's fast-moving landscape.

---

## Your Implementation Playbook

1. **Identify Commodities**: Auth, billing, observability, LLM routing are table stakes
2. **Build Modular Core**: Invest upfront in reusable infrastructure
3. **Vibe Code Branding**: Fork repos, search-replace strings, customize in source
4. **Encapsulate AI Logic**: Keep workflows separate from infrastructure
5. **Infrastructure-ize Billing**: Wire Stripe from day one for turnkey monetization
6. **Open Plumbing, Close AI**: Share infrastructure, protect unique workflows

---

## The Open-Source Framework

We've packaged this approach into an open-source framework:

**Tech Stack**: Next.js, FastAPI, MongoDB, Stripe, LiteLLM, OpenTelemetry

**Features**:
- Authentication with NextAuth
- Stripe billing with usage metering
- OpenTelemetry observability
- Multi-tenant support
- Pre-built templates for document AI, agent monitoring, chat portals

**Documentation**: Deployment guides for Kubernetes, AWS, GCP with customization tutorials

**Why Open Source?** Every AI builder faces infrastructure challenges. By sharing the plumbing, we raise the ecosystem's bar and differentiate on AI workflows.

**Results Proven**:
- **DocRouter.AI**: 3 months (built infrastructure)
- **SigAgent.AI**: 3 weeks (90% reuse)
- **Client Portals**: 3 weeks (95% reuse, custom workflows)

Ready to build? Start with commodity infrastructure, encapsulate unique AI logic, ship fast. Velocity wins in AI.

Interested? [Contact Analytiq Hub](https://analytiqhub.com/contact) or follow [SigAgent.AI](https://sigagent.ai).

---

## Related Posts

- [How I Built a Reusable AI Monetization Platform with Stripe](/webdev/artificial_intelligence/2025/11/15/reusable-ai-monetization-platform-stripe.html)
- [Cloud Notebooks Architecture](/tech/programming/ai/2025/03/05/cloud-notebooks-architecture.html)

---

*Subscribe to our [RSS feed](/feed.xml) for more on building AI SaaS products.*
