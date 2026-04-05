// src/app/opengraph-image.tsx
// Next.js 16 App Router dynamic OG image generation via next/og ImageResponse.
// Served at /opengraph-image by the framework automatically.

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Miloš Kulpinski | Fractional CTO & Systems Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  // Load the logo as a raw buffer for use inside ImageResponse
  const logoBuffer = await readFile(
    join(process.cwd(), "public", "assets", "logo_transparent.png"),
  );
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#0A0A0A",
        padding: "80px",
        gap: "80px",
      }}
    >
      {/* Left: Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoBase64}
        alt=""
        width={320}
        height={320}
        style={{ objectFit: "contain", flexShrink: 0 }}
      />

      {/* Vertical divider */}
      <div
        style={{
          width: "1px",
          height: "240px",
          backgroundColor: "rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}
      />

      {/* Right: Text column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
          flex: 1,
        }}
      >
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "64px",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Miloš Kulpinski
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "20px",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            lineHeight: 1.5,
          }}
        >
          Fractional CTO &amp; AI-Augmented{"\n"}Systems Architect
        </span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
