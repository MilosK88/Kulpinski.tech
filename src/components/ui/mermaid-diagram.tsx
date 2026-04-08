"use client";

// src/components/ui/mermaid-diagram.tsx
// Type: Client Component — mermaid.run() requires browser DOM.
// Renders only after hydration to avoid SSR/client mismatch.
// AGENTS.md memory safety: timeout IDs collected via useRef, cleared on unmount.

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MermaidDiagramProps {
  graph: string;
}

export default function MermaidDiagram({ graph }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lightboxContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  // Collect timeout IDs per AGENTS.md memory safety rule
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [svgContent, setSvgContent] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  // Reactive media query — replaces imperative window.innerWidth checks
  const isMobile = useMediaQuery("(max-width: 767px)");

  // Prevent body scroll while lightbox is open
  useScrollLock(isOpen);

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
          setSvgContent(svg);
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
    setMounted(true);

    return () => {
      cancelled = true;
      // AGENTS.md: clearTimeout in useEffect return block
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [graph]);

  // ESC key to close lightbox
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <>
      {/* Card thumbnail — scales naturally to container width, click to enlarge on mobile */}
      <div
        ref={containerRef}
        className="w-full rounded-sm border border-white/10 p-4 cursor-pointer md:cursor-default transition-opacity hover:opacity-80 md:hover:opacity-100 hover:ring-1 hover:ring-white/20 md:hover:ring-0 md:hover:ring-transparent"
        style={{ backgroundColor: "var(--color-base)", minHeight: "120px" }}
        role="button"
        tabIndex={0}
        aria-label="Architecture diagram — click to enlarge"
        onClick={() => {
          if (isMobile) setIsOpen(true);
        }}
        onKeyDown={(e) => {
          if (isMobile && (e.key === "Enter" || e.key === " ")) setIsOpen(true);
        }}
      />

      {/* Lightbox modal — portalled to document.body to escape parent stacking context */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={overlayRef}
                className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-md"
                style={{ backgroundColor: "rgba(10,10,10,0.82)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => {
                  // Click-outside: close if clicking the overlay itself
                  if (e.target === overlayRef.current) setIsOpen(false);
                }}
                role="dialog"
                aria-modal="true"
                aria-label="Expanded architecture diagram"
              >
                <motion.div
                  className="relative rounded-sm overflow-hidden border border-border-accent shadow-2xl bg-surface-dark w-[100vw] h-[100vh] md:w-[90vw] md:h-[90vh]"
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.88, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 28,
                    mass: 0.8,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white/60 hover:text-white hover:bg-black/80 transition-colors font-mono text-xs border border-white/10"
                    aria-label="Close diagram lightbox"
                  >
                    ✕
                  </button>

                  {/* Full-size diagram — overflow-auto enables native pinch-to-zoom & panning on mobile */}
                  <div
                    ref={lightboxContainerRef}
                    className="w-full h-full overflow-auto p-4 md:p-8 touch-pan-x touch-pan-y grid place-items-center"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: mermaid SVG is server-generated, not user input
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
