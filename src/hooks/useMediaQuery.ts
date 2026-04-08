"use client";

// src/hooks/useMediaQuery.ts
// Reactive media query hook — replaces imperative window.innerWidth checks.
// Returns false during SSR (no window), then syncs on mount.

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    // Set initial value after mount
    setMatches(mediaQueryList.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
