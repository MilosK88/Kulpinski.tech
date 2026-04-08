// src/lib/content.ts
// All static content data for the Technical Dossier.
// Types are imported from @/types — this file is data-only.

import type { CaseStudy, TerminalLog } from "@/types";

export type { StackItem, CaseStudy, TerminalLog } from "@/types";

export const HERO_CONTENT = {
  name: "Miloš Kulpinski",
  title: "Fractional CTO & Systems Architect",
  thesis:
    "I engineer reliable backend systems and grounded AI infrastructure. My focus is on eliminating technical debt and replacing operational instability with predictable code.",
};

export const GATEWAY_CONTENT = {
  availability:
    "Currently accepting select architectural consulting engagements.",
  alignment:
    "Optimized for asynchronous execution across US (EST/PST) and EU (CET) timezones.",
  minimumEngagement: "$50/hr",
  contactLabel: "Initiate Handshake ↘",
  email: "mailto:milos@kulpinski.tech",
  signature:
    "Solving scaling bottlenecks and engineering verifiable AI orchestration for data-intensive products.",
};

export const TELEMETRY_LOGS: TerminalLog[] = [
  {
    id: "1",
    timestamp: "00:00:01.012",
    agent: "ORCHESTRATOR",
    level: "INFO",
    message: "Initializing Multi-Agent RAG Pipeline...",
    delayMs: 400,
  },
  {
    id: "2",
    timestamp: "00:00:01.450",
    agent: "SCRAPER",
    level: "INFO",
    message: "Ingesting target enterprise document (PDF/A).",
    delayMs: 800,
  },
  {
    id: "3",
    timestamp: "00:00:02.105",
    agent: "VERIFIER",
    level: "WARN",
    message: "Anomaly detected. Cross-referencing immutable database.",
    delayMs: 1200,
  },
  {
    id: "4",
    timestamp: "00:00:02.890",
    agent: "SYNTHESIZER",
    level: "SUCCESS",
    message: "Data validated. Hallucination suppressed. JSON generated.",
    delayMs: 1500,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "lukul-crm",
    title: "LuKul (B2B SaaS Architecture)",
    headline: "Custom B2B CRM & Multi-Tenant Architecture",
    description:
      "Architected a scalable CRM for the fitness industry. Integrated Supabase for real-time state management and automated billing pipelines.",
    architecture: [
      { name: "Node.js", category: "runtime" },
      { name: "Supabase", category: "database" },
      { name: "RBAC", category: "infra" },
    ],
    metric: "Eliminated 120+ hrs manual overhead",
    schematicLabel: "VIEW SYSTEM SCHEMATIC",
    codeLanguage: "sql",
    codeSnippet: `-- Enterprise Multi-Tenant RLS Policy
CREATE POLICY "Strict Tenant Isolation" 
ON public.billing_records 
FOR ALL 
USING (
  tenant_id = NULLIF(
    current_setting('request.jwt.claims', true)::json->>'tenant_id', 
    ''
  )::uuid
);`,
  },
  {
    id: "ticketing-engine",
    title: "Event Ticketing Engine",
    headline: "High-Concurrency Ticketing & Atomicity",
    description:
      "Built a transaction-safe backend handling spikes via prisma.$transaction. Guaranteed zero phantom seats.",
    architecture: [
      { name: "TypeScript", category: "runtime" },
      { name: "Prisma", category: "database" },
      { name: "ACID", category: "infra" },
    ],
    metric: "Zero phantom seats under load",
    schematicLabel: "VIEW CONCURRENCY SCHEMATIC",
    mermaidGraph: `sequenceDiagram
    participant C as Client
    participant Q as Redis Queue
    participant DB as Prisma (PostgreSQL)
    
    C->>Q: POST /cancel-ticket
    Q->>DB: BEGIN SERIALIZABLE
    
    rect rgb(10, 10, 10)
    Note over DB: Atomicity Block
    DB->>DB: SELECT * FROM Inventory WHERE id=1 FOR UPDATE
    DB->>DB: UPDATE Waitlist SET status='PROMOTED'
    DB->>DB: UPDATE Inventory SET available=available-1
    end
    
    DB-->>Q: COMMIT
    Q-->>C: 200 OK (Atomic Success)`,
  },
  {
    id: "learnwith-ai",
    title: "LearnWith.AI / Algorithmic Auditing",
    headline: "LLM Verification & Mathematical Logic Auditing",
    description:
      "Conducted rigorous RLHF and algorithmic auditing for complex mathematical reasoning models. Validated LLM output determinism and identified edge-case hallucinations in high-stakes logic pathways.",
    architecture: [
      { name: "LLM Auditing", category: "ai" },
      { name: "RLHF", category: "framework" },
      { name: "Logic Verification", category: "infra" },
    ],
    metric: "Ranked in Top 1% of Global Auditors",
  },
  {
    id: "multi-agent-orchestrator",
    title: "Enterprise Multi-Agent Orchestration Pipeline",
    headline: "Asynchronous Multi-Agent Systems & RAG Infrastructure",
    description:
      "Engineered a deterministic, fault-tolerant backend system where multiple AI agents collaborate asynchronously for complex document processing and immutable verification.",
    architecture: [
      { name: "Next.js", category: "framework" },
      { name: "Redis / Upstash", category: "queue" },
      { name: "LLM Orchestration", category: "ai" },
    ],
    metric: "100% Fault Tolerance (Auto-Fallback Routing)",
    schematicLabel: "VIEW ORCHESTRATION SCHEMATIC",
    mermaidGraph: `graph TD
    subgraph Client [External Request]
        A[API Route / Webhook]
    end

    subgraph Memory [State & Queue]
        B[(Redis: Rate Limit & Pub/Sub)]
    end

    subgraph Runtime [Node.js Orchestrator]
        C{Router: State Manager}
        D[Agent A: Scraper Tool]
        E[Agent B: JSON Extractor]
        F[Agent C: Logic Verifier]
    end

    subgraph LLM [Model Providers]
        G((OpenAI API))
        H((Anthropic Claude API))
    end

    A -->|Async Payload| B
    B -->|Dequeue| C
    C -->|Task 1| D
    D -.->|Function Call| G
    D -->|Raw Text| E
    E -.->|Structured JSON| G
    E -->|Parsed Data| F
    F -->|Validation| C
    
    C -->|If OpenAI Fails| H
    C -->|Final Output| DB[(Immutable PostgreSQL)]
    
    classDef infra fill:#0A0A0A,stroke:#333,stroke-width:1px,color:#fff;
    classDef db fill:#0A0A0A,stroke:#10B981,stroke-width:1px,color:#fff;
    class A,B,C,D,E,F,G,H infra;
    class DB db;`,
  },
];
