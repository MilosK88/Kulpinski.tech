import Image from "next/image";
import { HERO_CONTENT, CASE_STUDIES, GATEWAY_CONTENT } from "@/lib/content";
import CaseStudyCard from "@/components/ui/case-study-card";
import TelemetryTerminal from "@/components/ui/telemetry-terminal";
import FadeIn from "@/components/ui/fade-in";

export default function Home() {
  return (
    <main className="min-h-screen bg-base selection:bg-white/20 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        {/* HERO */}
        <section>
          <div className="relative w-32 h-32 md:w-40 md:h-40 mb-12">
            <Image
              src="/assets/logo_transparent.png"
              alt="LuKul Atelier"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="font-medium text-xl">{HERO_CONTENT.name}</p>
          <p className="text-white/50 text-sm font-mono tracking-widest uppercase mt-2">
            {HERO_CONTENT.title}
          </p>
          <p className="text-white/80 text-xl leading-relaxed mt-8 max-w-2xl">
            {HERO_CONTENT.thesis}
          </p>
        </section>

        {/* TERMINAL */}
        <section className="relative z-20 pb-12">
          <p className="text-xs text-white/30 font-mono mb-4">
            // SYSTEM_LOG: MULTI_AGENT_ORCHESTRATION
          </p>
          <FadeIn>
            <TelemetryTerminal />
          </FadeIn>
        </section>

        {/* ── THE ARCHITECTURE (Case Studies) with Enforced Skew ── */}
        <section
          aria-label="Case studies"
          className="relative py-24 md:py-32 z-0"
        >
          {/* THE GHOST SKEW (Force-rendered) */}
          <div className="absolute inset-0 bg-surface-dark border-y border-border-accent -skew-y-1 md:-skew-y-3 origin-center scale-100 md:scale-[1.05] shadow-2xl -z-10 overflow-hidden" />

          {/* Un-skewed content container */}
          <div className="relative z-10 max-w-2xl mx-auto px-6">
            <div className="space-y-20">
              {CASE_STUDIES.map((study, i) => (
                <div id={study.id} key={study.id} className="scroll-mt-32">
                  <FadeIn delay={i === 0 ? 0 : 0.1}>
                    <CaseStudyCard study={study} />
                  </FadeIn>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GATEWAY */}
        <section className="relative z-20 pt-16">
          <FadeIn>
            <div className="bg-white/[0.02] border border-border-accent p-8 rounded-sm">
              <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-6">
                // GATEWAY: ENGAGEMENT_PROTOCOL
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                {GATEWAY_CONTENT.availability}
              </p>
              <p className="text-xs text-white/40 font-mono mt-3">
                {GATEWAY_CONTENT.alignment}
              </p>
              <p className="text-xs text-white/30 font-mono mt-1">
                Min. engagement: {GATEWAY_CONTENT.minimumEngagement}
              </p>
              <a
                href={GATEWAY_CONTENT.email}
                className="inline-flex items-center gap-2 text-sm text-white hover:text-accent transition-colors mt-6 font-mono"
              >
                {GATEWAY_CONTENT.contactLabel}
              </a>
              <p className="text-xs text-white/20 font-mono mt-6 pt-6 border-t border-border-accent">
                {GATEWAY_CONTENT.signature}
              </p>
            </div>
          </FadeIn>
        </section>
      </div>
    </main>
  );
}
