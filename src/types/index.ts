// src/types/index.ts
// Central type definitions for the Technical Dossier.
// All shared interfaces live here; components import from "@/types".

export interface StackItem {
  name: string;
  category: "runtime" | "database" | "queue" | "framework" | "ai" | "infra";
}

export interface CaseStudy {
  id: string;
  title: string;
  headline: string;
  description: string;
  architecture: StackItem[];
  metric: string;
  codeSnippet?: string;
  codeLanguage?: string;
  mermaidGraph?: string;
  /** Human-readable label for the schematic trigger button */
  schematicLabel?: string;
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  agent: "ORCHESTRATOR" | "SCRAPER" | "VERIFIER" | "SYNTHESIZER";
  level: "INFO" | "WARN" | "SUCCESS" | "ERROR";
  message: string;
  delayMs: number;
}
