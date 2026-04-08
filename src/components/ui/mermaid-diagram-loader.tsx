"use client";

// src/components/ui/mermaid-diagram-loader.tsx
// Type: Client Component — wrapper that defers MermaidDiagram via next/dynamic.
// `ssr: false` is only valid inside Client Components in Next.js 16 App Router.
// This thin loader isolates the dynamic import boundary from the RSC tree.

import dynamic from "next/dynamic";

// Geometry-matched fallback prevents CLS while mermaid.js loads
function MermaidFallback() {
  return (
    <div
      className="w-full rounded-sm border border-white/10 p-4 bg-base"
      style={{ minHeight: "120px" }}
      aria-hidden="true"
    />
  );
}

const MermaidDiagram = dynamic(() => import("./mermaid-diagram"), {
  ssr: false,
  loading: MermaidFallback,
});

interface MermaidDiagramLoaderProps {
  graph: string;
}

export default function MermaidDiagramLoader({
  graph,
}: MermaidDiagramLoaderProps) {
  return <MermaidDiagram graph={graph} />;
}
