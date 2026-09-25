---
id: use-case-federated-catalog
title: "Use Case: Federated Agent Catalog"
description: How Agent Factory's cross-team catalog helps teams discover, reuse, and fork agents built by other teams — without rebuilding.
---

# Use Case: Federated Agent Catalog

**Persona:** Engineering Manager / Senior Developer  
**Problem:** Three teams have independently built Salesforce query agents. Nobody knew the others existed.

---

## The Situation

When agents are deployed in isolation — per-team, per-cloud, with no shared registry — parallel development is inevitable. A team builds an agent that queries Salesforce. Two months later, a different team builds the same thing from scratch. Then a third.

In a company with 10+ product teams each shipping agents, this is the default outcome without a catalog.

---

## How Agent Factory Solves It

The Federated Agent Catalog is a queryable index of every registered agent across all teams and providers. Teams can search by capability, model, tool, or team name — and fork proven agents rather than building from scratch.

```mermaid
flowchart TB
    subgraph CAT["Federated Agent Catalog"]
        SEARCH["Search by capability, model, tool, or team"]
        FORK["Fork — adopt another team's agent definition"]
        AUDIT["Audit history — who built it, when, what changed"]
    end

    subgraph TEAMS["Teams Publishing to Catalog"]
        P["🏦 Payments\nbilling-agent\ntools: stripe-query, pdf-extract"]
        D["📊 Data Eng\nprofile-agent\ntools: bigquery-read, schema-diff"]
        S["🛍️ Commerce\nsalesforce-agent\ntools: sfdc-query, crm-write"]
    end

    subgraph CONSUME["Teams Consuming the Catalog"]
        R1["Risk Team\nSearches: salesforce-query\nFinds: commerce/salesforce-agent\nForks → governs under own budget"]
        R2["Marketing Team\nSearches: crm-write\nFinds same agent\nForks → governed separately"]
    end

    P & D & S -->|Publish on registration| CAT
    CAT -->|Discover| CONSUME
```

---

## Catalog Query Example

```bash
# Find all agents that have a Salesforce tool
GET /catalog/agents?tool=sfdc-query

# Response
[
  {
    "id": "agt_commerce_sf_01",
    "name": "salesforce-agent",
    "team": "commerce",
    "provider": "kagent",
    "model": "claude-sonnet-4-5",
    "tools": ["sfdc-query", "sfdc-write", "crm-read"],
    "runs_last_30d": 1420,
    "avg_cost_per_run": "$0.012",
    "status": "stable"
  }
]
```

---

## Fork and Govern

When a team forks an agent from the catalog, Agent Factory:

1. Copies the agent definition into the new team's namespace
2. Creates a new `TokenQuota` scoped to the new team's ServiceAccount
3. Maintains a lineage link to the original — so model deprecations and security patches propagate

```mermaid
sequenceDiagram
    participant Risk as Risk Team Dev
    participant Cat as Catalog
    participant AF as Agent Factory
    participant KV as Kovern

    Risk->>Cat: GET /catalog/agents?tool=sfdc-query
    Cat-->>Risk: Returns commerce/salesforce-agent
    Risk->>AF: POST /agents/fork { source: agt_commerce_sf_01, team: risk }
    AF->>AF: Clone agent definition
    AF->>KV: Create TokenQuota for risk/sfdc-agent (budget: $100/mo)
    KV-->>Risk: Agent ready — governed under Risk team budget
```

---

## Key Outcome

> Stop rebuilding what another team already tested in production. The Federated Catalog is effectively an internal npm registry — but for AI agents.

| Metric | Without Catalog | With Catalog |
|---|---|---|
| Time to deploy proven agent | 3–6 weeks (build from scratch) | 1–2 hours (fork + configure) |
| Duplicate agents | Unknown — no visibility | Zero — detected at registration |
| Security review surface | Per-team, ad-hoc | Inherited from source agent |
