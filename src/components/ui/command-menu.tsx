"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Terminal, Mail, Code, Server, Shield, Activity } from "lucide-react";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[20vh]">
      <div className="w-full max-w-xl bg-base border border-border-accent rounded-xl shadow-2xl overflow-hidden font-mono text-sm">
        <Command label="Command Menu" className="w-full" shouldFilter={true}>
          <div className="px-3 border-b border-border-accent flex items-center">
            <Terminal className="w-4 h-4 text-accent mr-2" />
            <Command.Input
              autoFocus
              placeholder="Type a command or search..."
              className="w-full bg-transparent text-white py-4 outline-none placeholder:text-white/30"
            />
            <span className="text-xs text-white/20 ml-2 border border-white/10 px-1.5 rounded-md">
              ESC
            </span>
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="p-4 text-white/40 text-center">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="SYSTEM ACTIONS"
              className="text-xs text-white/30 px-2 py-2 mb-1"
            >
              <Command.Item
                onSelect={() =>
                  runCommand(() => window.open("mailto:milos@kulpinski.tech"))
                }
                className="flex items-center px-2 py-3 mt-1 text-white/70 hover:text-white rounded-md cursor-pointer aria-selected:bg-border-accent aria-selected:text-white transition-colors"
              >
                <Mail className="w-4 h-4 mr-3 text-accent" />
                Initiate Handshake (Email)
              </Command.Item>
              <Command.Item
                onSelect={() =>
                  runCommand(() =>
                    window.open("https://github.com/MilosK88", "_blank"),
                  )
                }
                className="flex items-center px-2 py-3 mt-1 text-white/70 hover:text-white rounded-md cursor-pointer aria-selected:bg-border-accent aria-selected:text-white transition-colors"
              >
                <Code className="w-4 h-4 mr-3 text-white/40" />
                View GitHub Profile
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="ARCHITECTURE SCHEMATICS"
              className="text-xs text-white/30 px-2 py-2 mb-1 border-t border-border-accent/50 mt-1"
            >
              <Command.Item
                onSelect={() =>
                  runCommand(() =>
                    document
                      .getElementById("lukul-crm")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  )
                }
                className="flex items-center px-2 py-3 mt-1 text-white/70 hover:text-white rounded-md cursor-pointer aria-selected:bg-border-accent aria-selected:text-white transition-colors"
              >
                <Server className="w-4 h-4 mr-3 text-white/40" />
                B2B Multi-Tenant CRM
              </Command.Item>
              <Command.Item
                onSelect={() =>
                  runCommand(() =>
                    document
                      .getElementById("ticketing-engine")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  )
                }
                className="flex items-center px-2 py-3 mt-1 text-white/70 hover:text-white rounded-md cursor-pointer aria-selected:bg-border-accent aria-selected:text-white transition-colors"
              >
                <Activity className="w-4 h-4 mr-3 text-white/40" />
                High-Concurrency Ticketing
              </Command.Item>
              <Command.Item
                onSelect={() =>
                  runCommand(() =>
                    document
                      .getElementById("multi-agent-orchestrator")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  )
                }
                className="flex items-center px-2 py-3 mt-1 text-white/70 hover:text-white rounded-md cursor-pointer aria-selected:bg-border-accent aria-selected:text-white transition-colors"
              >
                <Shield className="w-4 h-4 mr-3 text-white/40" />
                Multi-Agent Orchestration
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
