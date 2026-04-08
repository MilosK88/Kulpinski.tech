"use client";

// src/components/ui/schematic-trigger.tsx
// Type: Client Component — holds lightbox open/close state.
// ImageLightbox is dynamically imported: its JS payload (Framer Motion modal)
// is deferred until the user clicks the trigger button, not on initial page load.

import { useState } from "react";
import dynamic from "next/dynamic";

// Deferred: ImageLightbox is never visible above the fold and only needed on interaction.
// No loading fallback needed — the modal is triggered by user action, not rendered on mount.
const ImageLightbox = dynamic(() => import("./image-lightbox"), {
  ssr: false,
});

interface SchematicTriggerProps {
  src: string;
  alt: string;
  title: string;
  /** Button label text — should describe the specific schematic type */
  label: string;
}

export default function SchematicTrigger({
  src,
  alt,
  title,
  label,
}: SchematicTriggerProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setLightboxOpen(true)}
        className="relative w-full rounded-sm border border-border-accent bg-base p-6 text-center group cursor-zoom-in"
        aria-label={`View expanded schematic diagram for ${title}`}
      >
        <span className="text-xs font-mono uppercase tracking-widest text-white/50 group-hover:text-accent-hover transition-colors duration-300">
          {label}
        </span>
      </button>

      {lightboxOpen && (
        <ImageLightbox
          src={src}
          alt={alt}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
