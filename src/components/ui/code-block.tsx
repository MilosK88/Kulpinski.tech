// src/components/ui/code-block.tsx
// Type: React Server Component (Async)
// Uses shiki v4 codeToHtml() for zero-JS server-side syntax highlighting.

import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  lang: string;
}

export default async function CodeBlock({ code, lang }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "vitesse-dark",
  });

  return (
    <div
      className="relative rounded-sm border border-white/10 overflow-x-auto"
      style={{ backgroundColor: "#121212" }}
    >
      {/* Language badge */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <span
          className="text-xs uppercase tracking-widest text-white/40"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          {lang}
        </span>
      </div>

      {/* Highlighted code — shiki inlines all styles, zero client JS.
          pre.shiki margin/padding/bg reset is handled in globals.css */}
      <div
        className="p-4 text-sm leading-relaxed overflow-x-auto"
        style={{ fontFamily: "var(--font-geist-mono)" }}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output is server-generated, not user input
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
