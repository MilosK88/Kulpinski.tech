"use client";

// src/components/ui/fade-in.tsx
// Type: Client Component
// Lightweight scroll-reveal wrapper using Framer Motion.
// Ruthlessly tight animation curve per spec: 0.5s easeOut, once, -10% margin.

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
}

export default function FadeIn({ children, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
