"use client";

// src/components/ui/telemetry-terminal.tsx
// Type: Client Component
// Simulates a multi-agent AI orchestration pipeline log stream.
// AGENTS.md compliance:
//   - Timeout IDs collected via useRef<ReturnType<typeof setTimeout>[]>
//   - All timeouts cleared in useEffect return block
//   - role="log", aria-live="polite", aria-atomic="false", aria-label set

import { useEffect, useRef, useState } from "react";
import { TELEMETRY_LOGS, type TerminalLog } from "@/lib/content";

// Level → color class mapping (monochrome-first, with Racing Green accent for SUCCESS)
const LEVEL_STYLES: Record<TerminalLog["level"], string> = {
  INFO: "text-white/50",
  WARN: "text-yellow-400/80",
  SUCCESS: "text-[#4A7C59]",
  ERROR: "text-red-400/90",
};

// Agent → prefix label (all-caps, mono)
const AGENT_PREFIX: Record<TerminalLog["agent"], string> = {
  ORCHESTRATOR: "ORCH",
  SCRAPER: "SCRP",
  VERIFIER: "VRFY",
  SYNTHESIZER: "SYNT",
};

export default function TelemetryTerminal() {
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // AGENTS.md: collect all timeout IDs in a ref for cleanup
  const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Reset on mount (handles StrictMode double-invoke)
    setLogs([]);
    setIsComplete(false);
    timeoutIdsRef.current = [];

    // Schedule each log entry according to its delayMs
    TELEMETRY_LOGS.forEach((log) => {
      const id = setTimeout(() => {
        setLogs((prev) => [...prev, log]);
      }, log.delayMs);
      timeoutIdsRef.current.push(id);
    });

    // Schedule the "complete" state after the last log
    const lastDelay =
      TELEMETRY_LOGS.length > 0
        ? TELEMETRY_LOGS[TELEMETRY_LOGS.length - 1].delayMs + 400
        : 400;

    const completeId = setTimeout(() => {
      setIsComplete(true);
    }, lastDelay);
    timeoutIdsRef.current.push(completeId);

    // AGENTS.md: clear ALL pending timeouts on unmount / re-render
    return () => {
      timeoutIdsRef.current.forEach((id) => clearTimeout(id));
      timeoutIdsRef.current = [];
    };
  }, []); // Empty deps — runs once on mount

  return (
    <div
      className="flex flex-col rounded-sm border border-white/10 overflow-hidden"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      {/* Terminal header bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b border-white/10"
        aria-hidden="true"
      >
        {/* Traffic-light dots (decorative) */}
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span
          className="ml-2 text-xs tracking-widest text-white/40 uppercase"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          TERMINAL: AI_ORCHESTRATOR_V1.0.4
        </span>
      </div>

      {/* Log output region — AGENTS.md accessibility requirements */}
      <div
        role="log"
        aria-live="polite"
        aria-atomic="false"
        aria-label="AI multi-agent orchestration telemetry log"
        className="flex flex-col gap-1 p-4 min-h-[220px]"
      >
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-start gap-3 text-xs leading-relaxed"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {/* Timestamp */}
            <span className="shrink-0 text-white/25 tabular-nums">
              {log.timestamp}
            </span>

            {/* Agent prefix */}
            <span className="shrink-0 text-white/40 w-10">
              [{AGENT_PREFIX[log.agent]}]
            </span>

            {/* Level badge */}
            <span
              className={`shrink-0 w-14 font-semibold ${LEVEL_STYLES[log.level]}`}
            >
              {log.level}
            </span>

            {/* Message */}
            <span className="text-white/70">{log.message}</span>
          </div>
        ))}

        {/* Status indicator — pulsing while active, static when done */}
        <div
          className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5"
          style={{ fontFamily: "var(--font-geist-mono)" }}
          aria-hidden="true"
        >
          {isComplete ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
              <span className="text-xs text-emerald-400/70 tracking-widest uppercase">
                Pipeline Complete
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400/80 animate-pulse" />
              <span className="text-xs text-white/30 tracking-widest uppercase">
                Processing...
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
