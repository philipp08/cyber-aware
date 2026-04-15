"use client";
import Link from "next/link";
import { Shield, ArrowUpRight, CheckCircle } from "lucide-react";
import { S } from "@/lib/theme";

export default function LandingPage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      {/* Nav */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(12,12,15,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${S.border}`,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, background: S.accent, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={16} color="var(--accent-fg)" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.01em" }}>CyberAware</span>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {["Features", "Module", "Preise"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ padding: "0.3rem 0.9rem", fontSize: "0.82rem", color: "var(--text-2)", textDecoration: "none", borderRadius: 100 }}>{l}</a>
            ))}
          </nav>
          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/login" style={{ padding: "0.4rem 1rem", fontSize: "0.82rem", color: "var(--text-2)", textDecoration: "none", border: `1px solid ${S.border}`, borderRadius: 100 }}>
              Anmelden
            </Link>
            <Link href="/login" style={{ padding: "0.4rem 1.1rem", fontSize: "0.82rem", fontWeight: 600, background: S.accent, color: "var(--accent-fg)", textDecoration: "none", borderRadius: 100 }}>
              Demo starten
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "7rem 2rem 5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.3rem 0.8rem", background: "var(--accent-dim)", border: "1px solid var(--accent-dim3)", borderRadius: 100, fontSize: "0.72rem", fontWeight: 600, color: "var(--accent-text)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "2rem" }}>
          DSGVO-konform · Hosting Deutschland
        </div>

        <h1 style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: "1.5rem", maxWidth: 700 }}>
          Datensicherheit,<br />
          <em style={{ fontStyle: "italic", color: "var(--accent-text)" }}>die wirkt.</em>
        </h1>

        <p style={{ fontSize: "1.15rem", color: "var(--text-2)", maxWidth: 520, lineHeight: 1.6, marginBottom: "2.5rem" }}>
          Schulen Sie Ihre Mitarbeiter mit interaktiven Modulen zu Datensicherheit, DSGVO und Phishing-Erkennung – in 5–10 Minuten pro Modul.
        </p>

        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.75rem 1.5rem", background: S.accent, color: "var(--accent-fg)", fontWeight: 700, fontSize: "0.9rem", borderRadius: 100, textDecoration: "none" }}>
            Demo starten <ArrowUpRight size={16} />
          </Link>
          <Link href="/admin" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.75rem 1.5rem", border: `1px solid ${S.border}`, color: "var(--text-2)", fontSize: "0.9rem", borderRadius: 100, textDecoration: "none" }}>
            Admin-Dashboard
          </Link>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "3rem", marginTop: "5rem", paddingTop: "3rem", borderTop: `1px solid ${S.border}` }}>
          {[
            { n: "2.400+", l: "Unternehmen" },
            { n: "98.000+", l: "Zertifizierte Mitarbeiter" },
            { n: "94%", l: "Weniger Phishing-Klicks" },
            { n: "ISO 27001", l: "Audit-fähige Reports" },
          ].map(s => (
            <div key={s.l}>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.03em" }}>{s.n}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-2)", marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Bento */}
      <section id="features" style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Features</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Alles, was Ihr Unternehmen braucht</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {/* Big card */}
          <div style={{ gridColumn: "span 2", background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 24, padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280 }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🛡️</div>
            <div>
              <div style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>8 interaktive Module</div>
              <div style={{ color: "var(--text-2)", fontSize: "0.88rem", lineHeight: 1.6, maxWidth: 400 }}>
                Von Internetgrundlagen bis Mobile Security – strukturiert nach Pflicht-, Wichtig- und Kritisch-Kategorien. Jedes Modul 5–10 Min, vollständig mobil-optimiert.
              </div>
            </div>
          </div>

          <div style={{ background: S.accent, borderRadius: 24, padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontSize: "2.5rem" }}>🏆</div>
            <div>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--accent-fg)", marginBottom: "0.4rem" }}>Digitale Zertifikate</div>
              <div style={{ color: "rgba(0,0,0,0.6)", fontSize: "0.85rem" }}>Bronze, Silber & Gold mit QR-Verifikation und LinkedIn-Sharing</div>
            </div>
          </div>

          <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 24, padding: "2rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>🎣</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>Phishing-Simulationen</div>
            <div style={{ color: "var(--text-2)", fontSize: "0.83rem", lineHeight: 1.6 }}>Realistische Kampagnen mit automatischer Weiterleitung zum Schulungsmodul</div>
          </div>

          <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 24, padding: "2rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>📊</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>Compliance-Reports</div>
            <div style={{ color: "var(--text-2)", fontSize: "0.83rem", lineHeight: 1.6 }}>ISO-27001 & BSI Grundschutz – audit-fähige PDFs auf Knopfdruck</div>
          </div>

          <div style={{ background: "var(--surface-2)", border: `1px solid var(--border)`, borderRadius: 24, padding: "2rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>🌍</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>4 Sprachen & SCORM</div>
            <div style={{ color: "var(--text-2)", fontSize: "0.83rem", lineHeight: 1.6 }}>DE, EN, FR, ES – SCORM-Export für Moodle & SAP SuccessFactors</div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="module" style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Lernmodule</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>8 Module · Je 5–10 Minuten</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {[
            { n: 1, icon: "🌐", t: "Internetgrundlagen", cat: "Pflicht" },
            { n: 2, icon: "🎣", t: "Phishing erkennen", cat: "Kritisch" },
            { n: 3, icon: "🔐", t: "Sichere Passwörter", cat: "Pflicht" },
            { n: 4, icon: "⚖️", t: "DSGVO Grundlagen", cat: "Pflicht" },
            { n: 5, icon: "💻", t: "Gerätesicherheit", cat: "Pflicht" },
            { n: 6, icon: "📧", t: "E-Mail-Sicherheit", cat: "Wichtig" },
            { n: 7, icon: "☁️", t: "Cloud-Dienste", cat: "Wichtig" },
            { n: 8, icon: "📱", t: "Mobile Sicherheit", cat: "Kritisch" },
          ].map(m => (
            <Link key={m.n} href="/login" style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 16, padding: "1.25rem", textDecoration: "none", transition: "border-color 0.15s", display: "block" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{m.icon}</div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-2)", marginBottom: "0.25rem", fontWeight: 500 }}>Modul {m.n}</div>
              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.5rem" }}>{m.t}</div>
              <span style={{
                fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.55rem", borderRadius: 100,
                background: m.cat === "Pflicht" ? "rgba(59,130,246,0.15)" : m.cat === "Kritisch" ? "rgba(255,69,69,0.15)" : "rgba(251,191,36,0.15)",
                color: m.cat === "Pflicht" ? "#60A5FA" : m.cat === "Kritisch" ? "#FF6B6B" : "#FBBf24",
              }}>{m.cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="preise" style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem 6rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Pricing</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Transparente Preise</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { name: "Starter", price: "49€", period: "/Monat", users: "bis 25 Nutzer", highlight: false, features: ["4 Pflichtmodule", "Bronze-Zertifikat", "Basis-Dashboard", "E-Mail-Support"] },
            { name: "Business", price: "199€", period: "/Monat", users: "bis 250 Nutzer", highlight: true, features: ["Alle 8 Module", "Alle Zertifikatsstufen", "Phishing-Simulationen", "Compliance-Reports", "White-Label", "Slack-Integration"] },
            { name: "Enterprise", price: "Anfrage", period: "", users: "Unbegrenzte Nutzer", highlight: false, features: ["Alles aus Business", "SSO (SAML/OIDC)", "SCORM-Export", "Custom Branding", "SLA 99,9%"] },
          ].map(p => (
            <div key={p.name} style={{
              background: p.highlight ? S.accent : "var(--surface)",
              border: `1px solid ${p.highlight ? "transparent" : S.border}`,
              borderRadius: 24, padding: "2rem",
            }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: p.highlight ? "rgba(0,0,0,0.5)" : "var(--text-2)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.users}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: p.highlight ? "var(--accent-fg)" : "var(--text)", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>{p.name}</div>
              <div style={{ marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: 800, color: p.highlight ? "var(--accent-fg)" : "var(--text)", letterSpacing: "-0.03em" }}>{p.price}</span>
                <span style={{ fontSize: "0.85rem", color: p.highlight ? "rgba(0,0,0,0.4)" : "var(--text-2)" }}>{p.period}</span>
              </div>
              <ul style={{ listStyle: "none", marginBottom: "1.5rem" }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: p.highlight ? "rgba(0,0,0,0.7)" : "var(--text-2)", marginBottom: 8 }}>
                    <CheckCircle size={13} color={p.highlight ? "var(--accent-fg)" : "var(--green)"} strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/login" style={{ display: "block", textAlign: "center", padding: "0.65rem", background: p.highlight ? "var(--bg)" : "transparent", border: p.highlight ? "none" : `1px solid ${S.border}`, color: p.highlight ? "var(--accent-text)" : "var(--text-2)", fontWeight: 600, fontSize: "0.85rem", borderRadius: 100, textDecoration: "none" }}>
                {p.name === "Enterprise" ? "Kontakt" : "Jetzt starten"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${S.border}`, padding: "2rem", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 22, height: 22, background: S.accent, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Shield size={13} color="var(--accent-fg)" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>CyberAware</span>
        </div>
        <div style={{ fontSize: "0.75rem", color: "var(--text-2)" }}>DSGVO-konform · ISO 27001 · BSI Grundschutz · © 2024 CyberAware GmbH</div>
      </footer>
    </div>
  );
}
