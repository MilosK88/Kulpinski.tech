import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import CommandMenu from "@/components/ui/command-menu";
import type { WithContext, Person } from "schema-dts";

// Vercel Font Stack Initialization
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kulpinski.tech"),
  title: "Miloš Kulpinski | Fractional CTO & Systems Architect",
  description:
    "I engineer reliable backend systems and grounded AI infrastructure. My focus is on eliminating technical debt and replacing operational instability with predictable code.",
  icons: {
    icon: "/assets/favicon_transparent.png",
    shortcut: "/assets/favicon_transparent.png",
  },
};

/**
 * Phase 1: Entity SEO with Identity Resolution
 * Links the "Miloš Kulpinski" entity to high-authority professional nodes.
 * Typed with schema-dts for compile-time JSON-LD validation.
 */
const personSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Miloš Kulpinski",
  jobTitle: "Fractional CTO & AI-Augmented Systems Architect",
  url: "https://kulpinski.tech",
  sameAs: [
    "https://github.com/MilosK88",
    "https://www.linkedin.com/in/milo%C5%A1-kulpinski-43b69525a/",
    "https://app.usebraintrust.com/talent/2154991/",
  ],
  description:
    "Solving scaling bottlenecks and engineering verifiable AI orchestration for data-intensive products.",
  knowsAbout: [
    "High-Concurrency Infrastructure",
    "Multi-Agent Orchestration",
    "RAG Pipelines",
    "Node.js",
    "TypeScript",
    "Next.js",
    "Supabase",
    "Prisma",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-base text-text`}
      >
        <CommandMenu />
        {children}

        {/* Umami Telemetry Protocol */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="c2f77297-48df-4a36-aaf8-6b85bebac4d5"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
