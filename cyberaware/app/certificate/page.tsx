"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { currentUser } from "@/lib/data";
import { Download, Share2, ExternalLink, ArrowRight } from "lucide-react";
import { S } from "@/lib/theme";

export default function CertificatePage() {
  const [showQR, setShowQR] = useState(false);
  const hash = "CA7F3B91E2D40158";
  const level = currentUser.certLevel || "Bronze";
  const emoji = level === "Gold" ? "🥇" : level === "Silber" ? "🥈" : "🥉";

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Zertifikat</p>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Mein Zertifikat</h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
          {/* Certificate card */}
          {(() => {
            const accentColor = level === "Gold" ? "#CCFF00" : level === "Silber" ? "#94A3B8" : "#F59E0B";
            const accentBg = level === "Gold" ? "rgba(204,255,0,0.08)" : level === "Silber" ? "rgba(148,163,184,0.1)" : "rgba(245,158,11,0.08)";
            const accentBorder = level === "Gold" ? "rgba(204,255,0,0.25)" : level === "Silber" ? "rgba(148,163,184,0.35)" : "rgba(245,158,11,0.3)";
            const badgeBg = level === "Gold" ? "#CCFF00" : level === "Silber" ? "#E2E8F0" : "rgba(245,158,11,0.15)";
            const badgeColor = level === "Gold" ? "#0C0C0F" : level === "Silber" ? "#475569" : "#92400E";
            return (
              <div style={{
                background: "#FFFFFF",
                border: `1.5px solid ${accentBorder}`,
                borderRadius: 24,
                overflow: "hidden",
                position: "relative",
                boxShadow: `0 4px 24px rgba(0,0,0,0.07), 0 0 0 0 transparent`,
              }}>
                {/* Top accent bar */}
                <div style={{ height: 4, background: accentColor }} />

                {/* Watermark pattern */}
                <div style={{
                  position: "absolute", inset: 0, top: 4, pointerEvents: "none", opacity: 0.03,
                  backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)`,
                  backgroundSize: "12px 12px",
                }} />

                <div style={{ padding: "2.5rem", position: "relative" }}>
                  {/* Header row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 40, height: 40, background: accentColor, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "1.2rem" }}>🛡️</span>
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#0D0D16" }}>CyberAware</div>
                        <div style={{ fontSize: "0.65rem", color: "#8888A8" }}>Datensicherheitsschulung</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ padding: "0.25rem 0.75rem", borderRadius: 100, fontSize: "0.72rem", fontWeight: 700, background: badgeBg, color: badgeColor, border: `1px solid ${accentBorder}` }}>
                        {level}-Zertifikat
                      </span>
                      <div style={{ fontSize: "2.2rem" }}>{emoji}</div>
                    </div>
                  </div>

                  {/* Title */}
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ fontSize: "0.62rem", color: "#8888A8", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8 }}>Zertifikat der Kompetenz</div>
                    <div style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#0D0D16" }}>
                      Datensicherheit<br /><span style={{ color: "#4A4A62" }}>& Datenschutz</span>
                    </div>
                  </div>

                  {/* Recipient box */}
                  <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 16, padding: "1.25rem", marginBottom: "1.5rem", textAlign: "center" }}>
                    <div style={{ fontSize: "0.62rem", color: "#8888A8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Verliehen an</div>
                    <div style={{ fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#0D0D16" }}>{currentUser.name}</div>
                    <div style={{ fontSize: "0.82rem", color: "#4A4A62", marginTop: 3 }}>{currentUser.company} · {currentUser.department}</div>
                  </div>

                  {/* Achievements */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: "1.5rem" }}>
                    {[
                      level === "Bronze" ? "4 Pflichtmodule absolviert" : "8/8 Module abgeschlossen",
                      level === "Gold" ? "90%+ in allen Modulen" : level === "Silber" ? "80%+ in Prüfung" : "70%+ in Prüfung",
                      level !== "Bronze" ? "Phishing-Simulation" : "Grundschulung",
                      level === "Gold" ? "Keine Phishing-Klicks" : "Grundzertifikat",
                    ].map(a => (
                      <div key={a} style={{ display: "flex", gap: 7, fontSize: "0.75rem", color: "#4A4A62", alignItems: "flex-start" }}>
                        <span style={{ color: "#007840", flexShrink: 0, fontWeight: 700 }}>✓</span>{a}
                      </div>
                    ))}
                  </div>

                  {/* Dates */}
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: "1.25rem", marginBottom: "1.25rem" }}>
                    <div>
                      <div style={{ fontSize: "0.62rem", color: "#8888A8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Ausgestellt am</div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0D0D16" }}>22. Januar 2024</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.62rem", color: "#8888A8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Gültig bis</div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#C06000" }}>22. Januar 2025</div>
                    </div>
                  </div>

                  {/* Verification */}
                  <button onClick={() => setShowQR(!showQR)}
                    style={{ width: "100%", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                    <div style={{ width: 32, height: 32, background: "#0D0D16", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: "0.85rem" }}>⬛</span>
                    </div>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div style={{ fontSize: "0.68rem", color: "#8888A8" }}>Zertifikat-ID · öffentlich prüfbar</div>
                      <div style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#0D0D16", fontWeight: 600 }}>{hash}</div>
                    </div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#4A4A62" }}>{showQR ? "↑" : "QR"}</span>
                  </button>

                  {showQR && (
                    <div style={{ marginTop: 8, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "1rem", textAlign: "center" }}>
                      <div style={{ display: "inline-grid", gridTemplateColumns: "repeat(10, 10px)", gap: 2, padding: 8, background: "#0D0D16", borderRadius: 8 }}>
                        {Array.from({ length: 100 }).map((_, i) => {
                          const hv = parseInt(hash, 16);
                          const b = (hv >> (i % 32)) & 1;
                          const corner = (i < 3 && (i % 10 < 3)) || (i > 96 && i % 10 < 3) || (i % 10 > 6 && i < 10);
                          return <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: (corner || (b === 1 && i % 4 !== 0)) ? "#F4F4FA" : "transparent" }} />;
                        })}
                      </div>
                      <Link href={`/check?id=${hash}`} style={{ fontSize: "0.72rem", color: "#3A5800", marginTop: 8, display: "block", textDecoration: "none", fontWeight: 600 }}>
                        🔗 /check?id={hash}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Actions */}
            <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 20, padding: "1.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Aktionen</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.75rem 1rem", background: S.accent, border: "none", borderRadius: 12, color: "var(--accent-fg)", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}>
                  <Download size={14} /> PDF herunterladen
                </button>
                <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.75rem 1rem", background: "#0A66C2", border: "none", borderRadius: 12, color: "#fff", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}>
                  <ExternalLink size={14} /> Auf LinkedIn teilen
                </button>
                <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.75rem 1rem", background: "transparent", border: `1px solid ${S.border}`, borderRadius: 12, color: "var(--text-2)", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}>
                  <Share2 size={14} /> Link kopieren
                </button>
              </div>
            </div>

            {/* Details */}
            <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 20, padding: "1.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Details</div>
              {[
                ["Level", level],
                ["Prüfungsnote", `${currentUser.examScore}%`],
                ["Module", `${currentUser.completedModules.length}/8`],
                ["Zertifikat-ID", hash],
                ["Ausgestellt", "22.01.2024"],
                ["Läuft ab", "22.01.2025"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: `1px solid ${S.border}` }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-2)" }}>{k}</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, fontFamily: k === "Zertifikat-ID" ? "monospace" : "inherit" }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Upgrade */}
            {level !== "Gold" && (
              <div style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-dim3)", borderRadius: 20, padding: "1.5rem" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--accent-text)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Upgrade</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                  Weiter zu {level === "Bronze" ? "Silber 🥈" : "Gold 🥇"}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-2)", marginBottom: "1rem" }}>
                  {level === "Bronze" ? "8 Module mit 80%+ und Phishing-Simulation absolvieren" : "90%+ in allen Modulen, keine Phishing-Klicks"}
                </div>
                <Link href="/modules" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", fontWeight: 600, color: "var(--accent-text)", textDecoration: "none" }}>
                  Weiter lernen <ArrowRight size={13} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
