---
id: use-case-multi-team
title: "Use Case: Multi-Team Agent Deployment"
description: How Plate Agent Factory gives platform teams visibility and control when 5+ engineering teams are independently deploying AI agents.
---

# Use Case: Multi-Team Agent Deployment

**Persona:** Platform Engineering Lead  
**Problem:** 5+ engineering teams each deploying AI agents independently — no registry, no ownership, no visibility.

---

## The Situation

Your organisation has scaled beyond the point where one team can know what another team is building. The payments team ships agents for invoice reconciliation. Data Eng ships agents for dataset profiling. Product squads ship conversational agents for different verticals.

Three months in, nobody can answer:

- How many agents are running in production?
- Which team owns the Bedrock agent that spent $4,200 last month?
- If a model is deprecated, which agents are affected?

```mermaid
flowchart TB
    subgraph BEFORE["❌ Before Agent Factory"]
        T1["🏦 Payments Team\nBedrock agent\n→ Self-managed"]
        T2["📊 Data Eng Team\nVertex agent\n→ Self-managed"]
        T3["🛍️ Commerce Team\nkagent pods\n→ Self-managed"]
        T4["🔒 Security Team\nAzure AI agent\n→ Self-managed"]
        X["Platform Team\n❓ No visibility\n❓ No registry\n❓ No ownership"]
        T1 & T2 & T3 & T4 -.->|"unknown"| X
    end
```

---

## How Agent Factory Solves It

Agent Factory provides a **single source of truth** for every agent across every team — without centralising control or slowing teams down.

```mermaid
flowchart TB
    subgraph AFTER["✅ With Agent Factory"]
        subgraph TEAMS["Engineering Teams — self-serve"]
            T1["🏦 Payments\nbilling-agent\nBedrock"]
            T2["📊 Data Eng\nprofile-agent\nVertex"]
            T3["🛍️ Commerce\nrec-agent\nkagent"]
            T4["🔒 Security\naudit-agent\nAzure AI"]
        end

        subgraph AF["Agent Factory Control Plane"]
            REG["Registry\nAll agents · all teams · all providers"]
            OWN["Ownership\nTeam mapping · contact · SLA"]
            MOD["Model Index\nModel → agents affected on deprecation"]
            GOV["Kovern Governance\nPer-team budget enforcement"]
        end

        T1 & T2 & T3 & T4 -->|Register on deploy| REG
        REG --> OWN & MOD & GOV
    end
```

---

## What Each Stakeholder Gets

| Stakeholder | What they see |
|---|---|
| **Platform Team** | Full registry — every agent, owner, provider, model, status |
| **Engineering Team** | Their own agents + ability to discover other teams' catalog |
| **FinOps** | Per-team spend breakdown, burn rate trends, budget alerts |
| **Security** | Tool access matrix — what each agent can actually call |
| **On-call SRE** | Ownership contact for any agent running in production |

---

## Deployment Flow

When a team deploys a new agent through Agent Factory, the following happens automatically:

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant AF as Agent Factory
    participant Git as Gitea (GitOps)
    participant CD as ArgoCD
    participant K8s as Kubernetes
    participant KV as Kovern

    Dev->>AF: Register agent (name, provider, tools, team)
    AF->>Git: Commit kagent CRD + TokenQuota manifest
    Git->>CD: ArgoCD detects change
    CD->>K8s: Apply kagent Agent + ServiceAccount
    K8s->>KV: Kovern webhook registers budget
    KV-->>Dev: Agent live with budget enforcement active
```

---

## Key Outcome

> One platform team of 3 can now safely support 150+ engineers deploying AI agents — because the registry, ownership, and budget guardrails are all automated.
