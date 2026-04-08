// src/components/ui/case-study-card.tsx
// Type: React Server Component
// Renders a CaseStudy object with architecture badges, optional CodeBlock, MermaidDiagram,
// and a SchematicTrigger (isolated client component for lightbox state).
//
// Performance: MermaidDiagram and ImageLightbox are dynamically imported (next/dynamic)
// with ssr: false to defer their JS bundles from the initial page load payload.
// Fallbacks are geometry-matched to prevent Cumulative Layout Shift (CLS).

import type { CaseStudy, StackItem } from "@/types";
import CodeBlock from "./code-block";
import SchematicTrigger from "./schematic-trigger";
// MermaidDiagramLoader is a Client Component that wraps the dynamic import of MermaidDiagram.
// `ssr: false` is not permitted in RSC files — the loader isolates that boundary.
import MermaidDiagramLoader from "./mermaid-diagram-loader";

// Default badge style — applied to all categories unless overridden
const BADGE_DEFAULT = "border-white/20 text-white/70";

// Category-specific overrides — only categories with distinct styling are listed
const CATEGORY_OVERRIDES: Partial<Record<StackItem["category"], string>> = {
  ai: "border-white/30 text-white/80",
};

function getBadgeStyle(category: StackItem["category"]): string {
  return CATEGORY_OVERRIDES[category] ?? BADGE_DEFAULT;
}

// Schematic image mapping by study.id — keys must match CASE_STUDIES[n].id exactly
// Note: lukul-system_schematic.png avoids ad-blocker false positives on "crm" string
const SCHEMATIC_IMAGES: Record<string, string> = {
  "lukul-crm": "/assets/lukul-system_schematic.png",
  "ticketing-engine": "/assets/ticketing-engine_schematic.png",
  "multi-agent-orchestrator": "/assets/multi-agent-orchestrator_schematic.png",
};

interface CaseStudyCardProps {
  study: CaseStudy;
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  const schematicSrc: string | undefined = SCHEMATIC_IMAGES[study.id];

  return (
    <article
      className="flex flex-col gap-6 rounded-sm border border-white/10 bg-surface p-6"
      aria-labelledby={`case-study-title-${study.id}`}
    >
      {/* Header */}
      <header className="flex flex-col gap-2">
        <p
          className="text-xs uppercase tracking-widest text-white/40"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          {study.title}
        </p>
        <h2
          id={`case-study-title-${study.id}`}
          className="text-xl font-semibold text-text leading-snug"
        >
          {study.headline}
        </h2>
      </header>

      {/* Description */}
      <p className="text-sm text-white/60 leading-relaxed">
        {study.description}
      </p>

      {/* Architecture stack badges */}
      {study.architecture.length > 0 && (
        <div className="flex flex-wrap gap-2" aria-label="Technology stack">
          {study.architecture.map((item) => (
            <span
              key={item.name}
              className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs ${getBadgeStyle(item.category)}`}
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}

      {/* Metric callout */}
      <div className="border-l-2 border-white/20 pl-4">
        <p
          className="text-xs uppercase tracking-widest text-white/40 mb-1"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          Outcome
        </p>
        <p
          className="text-sm text-white/80"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          {study.metric}
        </p>
      </div>

      {/* Discrete Racing Green schematic trigger (Isolated Client Component) */}
      {schematicSrc !== undefined && (
        <SchematicTrigger
          src={schematicSrc}
          alt={`${study.headline} architecture schematic`}
          title={study.title}
          label={study.schematicLabel ?? "VIEW SCHEMATIC"}
        />
      )}

      {/* Optional: Code snippet via CodeBlock RSC */}
      {study.codeSnippet && study.codeLanguage && (
        <CodeBlock code={study.codeSnippet} lang={study.codeLanguage} />
      )}

      {/* Optional: Architecture diagram via MermaidDiagramLoader (deferred client component) */}
      {study.mermaidGraph && (
        <MermaidDiagramLoader graph={study.mermaidGraph} />
      )}
    </article>
  );
}
