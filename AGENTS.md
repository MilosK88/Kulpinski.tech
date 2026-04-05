<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# SUPPLEMENTAL PROTOCOL: TECHNICAL DOSSIER

**CRITICAL FRAMEWORK AWARENESS:** This environment is running **Next.js 16.2.2**. You MUST NOT rely on Next.js 15 training data.
**STEP 0 MANDATE:** Before writing any routing or rendering logic, you MUST read the local guides in `node_modules/next/dist/docs/` (specifically `single-page-applications.md`, `rendering-philosophy.md`, `instant-navigation.md`).

## Architectural Constraints

- **Dependencies:** Ensure `framer-motion`, `shiki`, and `schema-dts` are installed via `npm install` before component generation.
- **RSC Default:** All components are React Server Components unless interacting with the DOM or Framer Motion.
- **Syntax Highlighting:** Strictly use `shiki` to generate zero-JS server-side highlighted HTML. Do NOT use `prism-react-renderer`.
- **Diagrams:** Use `mermaid` or inline SVG React components. Do NOT use the Next.js `<Image />` component for SVGs.
- **Memory Safety:** Any client component utilizing timers (e.g., `<TelemetryTerminal />`) MUST collect timeout IDs via `useRef` and execute `clearTimeout` in the `useEffect` return block.
- **Accessibility:** Live regions must use `role="log"`, `aria-atomic="false"`, and possess a clear `aria-label`.
