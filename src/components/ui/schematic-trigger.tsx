"use client";

import { useState } from "react";
import ImageLightbox from "./image-lightbox";

interface SchematicTriggerProps {
  src: string;
  alt: string;
  title: string;
}

export default function SchematicTrigger({
  src,
  alt,
  title,
}: SchematicTriggerProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setLightboxOpen(true)}
        className="relative w-full rounded-sm border border-[#1A2E24] bg-[#0A0A0A] p-6 text-center group cursor-zoom-in"
        aria-label={`View expanded schematic diagram for ${title}`}
      >
        <span className="text-xs font-mono uppercase tracking-widest text-white/50 group-hover:text-[#6A9A77] transition-colors duration-300">
          VIEW CONCURRENCY SCHEMATIC
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
