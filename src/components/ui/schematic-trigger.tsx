"use client";

import { useState } from "react";
import ImageLightbox from "./image-lightbox";

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

      <ImageLightbox
        src={src}
        alt={alt}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
