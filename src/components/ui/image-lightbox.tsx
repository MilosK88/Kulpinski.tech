"use client";

// src/components/ui/image-lightbox.tsx
// Type: Client Component
// Framer Motion spring lightbox — true full-screen (95vw × 95vh) with backdrop blur.
// AGENTS.md memory safety: no timers; cleanup via event listener removal.

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useScrollLock } from "@/hooks/useScrollLock";

interface ImageLightboxProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({
  src,
  alt,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll while open
  useScrollLock(isOpen);

  return (
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
            if (e.target === overlayRef.current) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded view: ${alt}`}
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
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white/60 hover:text-white hover:bg-black/80 transition-colors font-mono text-xs border border-white/10"
              aria-label="Close lightbox"
            >
              ✕
            </button>

            {/* Full-screen image — object-contain preserves diagram proportions */}
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain p-2 md:p-8 lg:p-12"
              sizes="90vw"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
