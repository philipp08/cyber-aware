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
          <div style={{
            background: level === "Gold" ? "linear-gradient(135deg, #1A1800, #1C1A00)" : level === "Silber" ? "linear-gradient(135deg, #161618, #1A1A1E)" : "linear-gradient(135deg, #1A1200, #181400)",
            border: `1px solid ${level === "Gold" ? "rgba(204,255,0,0.3)" : level === "Silber" ? "rgba(255,255,255,0.15)" : "rgba(204,132,0,0.3)"}`,
            borderRadius: 24,
            overflow: "hidden",
            position: "relative",
          }}>
            {/* Top accent line */}
            <div style={{ height: 3, background: level === "Gold" ? S.accent : level === "Silber" ? "rgba(255,255,255,0.4)" : "#F59E0B" }} />

            <div style={{ padding: "2.5rem" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 38, height: 38, background: S.accent, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "1.1rem" }}>🛡️</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--text)" }}>CyberAware</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-2)" }}>Datensicherheitsschulung</div>
                  </div>
                </div>
                <div style={{ fontSize: "2.5rem" }}>{emoji}</div>
              </div>

              {/* Title */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ fontSize: "0.65rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Zertifikat der Kompetenz</div>
                <div style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8 }}>Datensicherheit<br />& Datenschutz</div>
                <span style={{ display: "inline-block", padding: "0.3rem 0.8rem", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700,
                  background: level === "Gold" ? S.accent : level === "Silber" ? "rgba(255,255,255,0.15)" : "var(--amber-dim2)",
                  color: level === "Gold" ? "var(--accent-fg)" : level === "Silber" ? "var(--text)" : "#F59E0B",
                }}>
                  {level}-Zertifikat
                </span>
              </div>

              {/* Recipient */}
              <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${S.border}`, borderRadius: 16, padding: "1.25rem", marginBottom: "1.5rem", textAlign: "center" }}>
                <div style={{ fontSize: "0.65rem", color: "var(--text-2)", marginBottom: 6 }}>Verliehen an</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em" }}>{currentUser.name}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-2)", marginTop: 2 }}>{currentUser.company} · {currentUser.department}</div>
              </div>

              {/* Achievements */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: "1.5rem" }}>
                {[
                  level === "Bronze" ? "4 Pflichtmodule absolviert" : "8/8 Module abgeschlossen",
                  level === "Gold" ? "90%+ in allen Modulen" : level === "Silber" ? "80%+ in Prüfung" : "70%+ in Prüfung",
                  level !== "Bronze" ? "Phishing-Simulation" : "Grundschulung",
                  level === "Gold" ? "Keine Phishing-Klicks" : "Grundzertifikat",
                ].map(a => (
                  <div key={a} style={{ display: "flex", gap: 7, fontSize: "0.75rem", color: "var(--text-2)", alignItems: "flex-start" }}>
                    <span style={{ color: S.green, flexShrink: 0 }}>✓</span>{a}
                  </div>
                ))}
              </div>

              {/* Dates */}
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${S.border}`, paddingTop: "1.25rem", marginBottom: "1.25rem" }}>
                <div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-2)", marginBottom: 2 }}>Ausgestellt am</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>22. Januar 2024</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-2)", marginBottom: 2 }}>Gültig bis</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent-text)" }}>22. Januar 2025</div>
                </div>
              </div>

              {/* Verification */}
              <button onClick={() => setShowQR(!showQR)}
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${S.border}`, borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                <span style={{ fontSize: "1.2rem" }}>⬛</span>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-2)" }}>Verifikations-Hash</div>
                  <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--text)" }}>{hash}</div>
                </div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-2)" }}>{showQR ? "↑" : "QR"}</span>
              </button>

              {showQR && (
                <div style={{ marginTop: 8, background: "rgba(255,255,255,0.04)", border: `1px solid ${S.border}`, borderRadius: 12, padding: "1rem", textAlign: "center" }}>
                  <div style={{ display: "inline-grid", gridTemplateColumns: "repeat(10, 10px)", gap: 2, padding: 8, background: "var(--text)", borderRadius: 8 }}>
                    {Array.from({ length: 100 }).map((_, i) => {
                      const hv = parseInt(hash, 16);
                      const b = (hv >> (i % 32)) & 1;
                      const corner = (i < 3 && (i % 10 < 3)) || (i > 96 && i % 10 < 3) || (i % 10 > 6 && i < 10);
                      return <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: (corner || (b === 1 && i % 4 !== 0)) ? "var(--bg)" : "transparent" }} />;
                    })}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-2)", marginTop: 8 }}>cyberaware.de/verify/{hash}</div>
                </div>
              )}
            </div>
          </div>

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
