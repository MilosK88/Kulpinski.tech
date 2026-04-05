"use client";

// src/components/ui/mermaid-diagram.tsx
// Type: Client Component — mermaid.run() requires browser DOM.
// Renders only after hydration to avoid SSR/client mismatch.
// AGENTS.md memory safety: timeout IDs collected via useRef, cleared on unmount.

import { useEffect, useRef } from "react";

interface MermaidDiagramProps {
  graph: string;
}

export default function MermaidDiagram({ graph }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Collect timeout IDs per AGENTS.md memory safety rule
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!containerRef.current) return;

      // Dynamically import mermaid to keep it out of the server bundle
      const mermaid = (await import("mermaid")).default;

      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          // Align with our #0A0A0A base palette
          background: "#0a0a0a",
          mainBkg: "#111111",
          nodeBorder: "rgba(255,255,255,0.1)",
          clusterBkg: "#111111",
          titleColor: "#ededed",
          edgeLabelBackground: "#111111",
          lineColor: "rgba(255,255,255,0.3)",
          textColor: "#ededed",
          primaryColor: "#111111",
          primaryTextColor: "#ededed",
          primaryBorderColor: "rgba(255,255,255,0.15)",
          secondaryColor: "#1a1a1a",
          tertiaryColor: "#1a1a1a",
        },
      });

      if (cancelled) return;

      // Unique ID required by mermaid per render call
      const id = `mermaid-${Math.random().toString(36).slice(2)}`;

      try {
        const { svg } = await mermaid.render(id, graph);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = `<p class="text-red-400 text-xs font-mono p-4">Diagram render error</p>`;
          console.error("[MermaidDiagram] render error:", err);
        }
      }
    }

    // Defer slightly to ensure DOM is fully hydrated
    timeoutRef.current = setTimeout(render, 0);

    return () => {
      cancelled = true;
      // AGENTS.md: clearTimeout in useEffect return block
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [graph]);

  return (
    <div
      className="w-full overflow-x-auto rounded-sm border border-white/10 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent pb-2"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div
        ref={containerRef}
        className="min-w-[600px] md:min-w-0 p-4"
        style={{ minHeight: "120px" }}
        role="img"
        aria-label="Architecture diagram"
      />
    </div>
  );
}
