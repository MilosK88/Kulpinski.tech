"use client";

// src/hooks/useScrollLock.ts
// Prevents body scroll while a modal/lightbox is open.
// Handles cleanup on unmount to avoid leaving overflow: hidden stuck.

import { useEffect } from "react";

export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);
}
