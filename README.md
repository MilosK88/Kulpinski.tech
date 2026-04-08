# kulpinski.tech — Technical Dossier

A high-performance, single-page technical dossier built with Next.js 16.2.2 App Router. Designed to demonstrate architectural depth through the medium of the site itself — the implementation _is_ the portfolio.

## Architecture Overview

### Rendering Strategy

This project applies a strict **React Server Component (RSC) default** policy. Every component is a Server Component unless it explicitly requires browser APIs, DOM interaction, or animation.

| Component                | Type      | Reason                         |
| ------------------------ | --------- | ------------------------------ |
| `page.tsx`               | RSC       | Pure layout composition        |
| `layout.tsx`             | RSC       | Metadata, fonts, JSON-LD       |
| `case-study-card.tsx`    | RSC       | Static data rendering          |
| `code-block.tsx`         | Async RSC | Shiki server-side highlighting |
| `opengraph-image.tsx`    | Async RSC | `ImageResponse` OG generation  |
| `mermaid-diagram.tsx`    | Client    | `mermaid.run()` requires DOM   |
| `telemetry-terminal.tsx` | Client    | `setTimeout` animation loop    |
| `command-menu.tsx`       | Client    | Keyboard events, `useState`    |
| `image-lightbox.tsx`     | Client    | Framer Motion, scroll lock     |
| `schematic-trigger.tsx`  | Client    | Lightbox state management      |
| `fade-in.tsx`            | Client    | Framer Motion scroll-reveal    |

### Key Architectural Decisions

**Zero-JS Syntax Highlighting:** `CodeBlock` uses `shiki` v4's `codeToHtml()` inside an async RSC. All syntax highlighting is resolved at build/request time on the server. Zero JavaScript is shipped to the client for this feature.

**React Portal for Lightboxes:** `MermaidDiagram` uses `createPortal(…, document.body)` to render the diagram lightbox outside the parent stacking context. A `mounted` state guard prevents SSR hydration mismatches.

**Isolated Client Boundaries:** `SchematicTrigger` exists as a dedicated client component solely to hold lightbox `useState`. This keeps `CaseStudyCard` (the parent) as a pure RSC, avoiding unnecessary client bundle inflation.

**Memory Safety Protocol:** All `useEffect` hooks using `setTimeout` collect IDs via `useRef` and clear them in the cleanup function. This prevents phantom state updates and memory leaks, including under React StrictMode's double-invoke behavior.

**Custom Hooks:** Shared browser-side logic is abstracted into reusable hooks in `src/hooks/`:

- `useScrollLock(isOpen)` — prevents body scroll while a modal is open
- `useMediaQuery(query)` — reactive media query matching, replacing imperative `window.innerWidth` checks

### Design System

Tailwind CSS v4 with a strict `@theme` token system defined in `globals.css`. All colors, fonts, and spacing tokens are defined once and referenced semantically throughout the codebase. No hardcoded hex values in component files.

**Color Palette:**

- `--color-base` (`#0A0A0A`) — page background
- `--color-surface` (`#111111`) — card surfaces
- `--color-surface-elevated` (`#121212`) — code block background
- `--color-surface-terminal` (`#0D0D0D`) — terminal background
- `--color-surface-dark` (`#0D1512`) — dark green-tinted surface (lightbox, skew section)
- `--color-border-accent` (`#1A2E24`) — racing green border accent
- `--color-accent` (`#4A7C59`) — racing green interactive accent
- `--color-muted` (`#888888`) — muted text
- `--color-text` (`#ededed`) — primary text

**Typography:** Vercel-native Geist font stack — `Geist` for prose, `Geist_Mono` for technical/code contexts.

### SEO & Structured Data

- `Person` JSON-LD schema injected in `layout.tsx` using `schema-dts` types for compile-time validation
- Dynamic OG image generated via `next/og` `ImageResponse` with server-side logo embedding
- `metadataBase` configured for correct absolute URL resolution

### Security Headers

Configured in `next.config.ts` via `async headers()`:

- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- `X-Powered-By` header suppressed via `poweredByHeader: false`

## Tech Stack

| Layer               | Technology                         |
| ------------------- | ---------------------------------- |
| Framework           | Next.js 16.2.2 (App Router)        |
| Language            | TypeScript 5 (strict mode)         |
| Styling             | Tailwind CSS v4                    |
| Animation           | Framer Motion 12                   |
| Diagrams            | Mermaid 11                         |
| Syntax Highlighting | Shiki 4                            |
| Command Palette     | cmdk 1                             |
| Icons               | Lucide React                       |
| Structured Data     | schema-dts 2                       |
| Analytics           | Umami (privacy-first, self-hosted) |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Type Check

```bash
npm run build       # Production build
npx tsc --noEmit    # Type check without emit
npm run lint        # ESLint (Next.js core web vitals + TypeScript rules)
```

## Deployment

Deployed on Vercel. The `metadataBase` in `layout.tsx` is set to `https://kulpinski.tech`.
