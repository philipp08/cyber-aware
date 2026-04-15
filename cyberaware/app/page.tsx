"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Shield, ArrowUpRight, CheckCircle, Menu, X } from "lucide-react";
import { S } from "@/lib/theme";

/* ────────────────────────────────────────
   Animated counter hook
──────────────────────────────────────── */
function useCountUp(target: number, started: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return val;
}

/* ────────────────────────────────────────
   Stat counter card
──────────────────────────────────────── */
function StatCounter({ n, l, started }: { n: string; l: string; started: boolean }) {
  const numeric = parseInt(n.replace(/\D/g, ""), 10);
  const suffix = n.replace(/[\d,]/g, "");
  const isNumeric = !isNaN(numeric) && numeric > 0;
  const count = useCountUp(isNumeric ? numeric : 0, started && isNumeric);
  const display = isNumeric
    ? (numeric >= 1000 ? count.toLocaleString("de-DE") : count.toString()) + suffix
    : n;
  return (
    <div>
      <div style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.03em" }}>{display}</div>
      <div style={{ fontSize: "0.78rem", color: "var(--text-2)", marginTop: 2 }}>{l}</div>
    </div>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  /* ── Scroll-reveal observer ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Stats counter trigger ── */
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { n: "2400+", l: "Unternehmen" },
    { n: "98000+", l: "Zertifizierte Mitarbeiter" },
    { n: "94%", l: "Weniger Phishing-Klicks" },
    { n: "ISO 27001", l: "Audit-fähige Reports" },
  ];

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh", overflowX: "hidden" }}>
      {/* ── Nav ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, background: S.accent, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={16} color="#0C0C0F" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.01em", color: "#0D0D16" }}>CyberAware</span>
          </div>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ alignItems: "center", gap: 6 }}>
            {["Features", "Module", "Preise"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ padding: "0.3rem 0.9rem", fontSize: "0.82rem", color: "#4A4A62", textDecoration: "none", borderRadius: 100 }}>{l}</a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="desktop-cta" style={{ display: "flex", gap: 8 }}>
            <Link href="/login" style={{ padding: "0.4rem 1rem", fontSize: "0.82rem", color: "#4A4A62", textDecoration: "none", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 100 }}>
              Anmelden
            </Link>
            <Link href="/login" style={{ padding: "0.4rem 1.1rem", fontSize: "0.82rem", fontWeight: 600, background: S.accent, color: "#0C0C0F", textDecoration: "none", borderRadius: 100 }}>
              Demo starten
            </Link>
          </div>

          {/* Burger button */}
          <button
            className="burger-btn"
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4rem", borderRadius: 8, display: "none", alignItems: "center", justifyContent: "center", color: "#0D0D16" }}
            aria-label="Menü öffnen"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div
            className="mobile-drawer"
            style={{
              flexDirection: "column", borderTop: "1px solid rgba(0,0,0,0.06)",
              background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              padding: "1rem 2rem 1.5rem",
            }}
            onClick={e => { if (e.target === e.currentTarget) setMenuOpen(false); }}
          >
            {["Features", "Module", "Preise"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                style={{ padding: "0.75rem 0", fontSize: "1rem", color: "#0D0D16", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.05)", fontWeight: 500 }}>
                {l}
              </a>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: "1rem" }}>
              <Link href="/login" onClick={() => setMenuOpen(false)} style={{ flex: 1, textAlign: "center", padding: "0.65rem", fontSize: "0.88rem", color: "#4A4A62", textDecoration: "none", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 100 }}>
                Anmelden
              </Link>
              <Link href="/login" onClick={() => setMenuOpen(false)} style={{ flex: 1, textAlign: "center", padding: "0.65rem", fontSize: "0.88rem", fontWeight: 600, background: S.accent, color: "#0C0C0F", textDecoration: "none", borderRadius: 100 }}>
                Demo starten
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "7rem 2rem 5rem", position: "relative" }}>
        {/* Decorative background blob */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "2rem", right: "-4rem",
          width: "clamp(300px, 50vw, 600px)", height: "clamp(300px, 50vw, 600px)",
          background: "radial-gradient(ellipse at center, rgba(204,255,0,0.18) 0%, rgba(204,255,0,0.04) 55%, transparent 75%)",
          borderRadius: "50%", pointerEvents: "none", filter: "blur(1px)",
        }} />

        <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.3rem 0.8rem", background: "var(--accent-dim)", border: "1px solid var(--accent-dim3)", borderRadius: 100, fontSize: "0.72rem", fontWeight: 600, color: "var(--accent-text)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "2rem" }}>
          DSGVO-konform · Hosting Deutschland
        </div>

        <h1 className="fade-up-1" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: "1.5rem", maxWidth: 700 }}>
          Datensicherheit,<br />
          <em style={{ fontStyle: "italic", color: "var(--accent-text)" }}>die wirkt.</em>
        </h1>

        <p className="fade-up-2" style={{ fontSize: "1.15rem", color: "var(--text-2)", maxWidth: 520, lineHeight: 1.6, marginBottom: "2.5rem" }}>
          Schulen Sie Ihre Mitarbeiter mit interaktiven Modulen zu Datensicherheit, DSGVO und Phishing-Erkennung – in 5–10 Minuten pro Modul.
        </p>

        <div className="fade-up-3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.75rem 1.5rem", background: S.accent, color: "var(--accent-fg)", fontWeight: 700, fontSize: "0.9rem", borderRadius: 100, textDecoration: "none" }}>
            Demo starten <ArrowUpRight size={16} />
          </Link>
          <Link href="/admin" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.75rem 1.5rem", border: `1px solid ${S.border}`, color: "var(--text-2)", fontSize: "0.9rem", borderRadius: 100, textDecoration: "none" }}>
            Admin-Dashboard
          </Link>
        </div>

        {/* Stats row with counters */}
        <div ref={statsRef} className="fade-up-4" style={{ display: "flex", gap: "3rem", marginTop: "5rem", paddingTop: "3rem", borderTop: `1px solid ${S.border}`, flexWrap: "wrap" }}>
          {stats.map(s => (
            <StatCounter key={s.l} n={s.n} l={s.l} started={statsStarted} />
          ))}
        </div>
      </section>

      {/* ── Features Bento ── */}
      <section id="features" style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Features</div>
          <h2 className="scroll-reveal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Alles, was Ihr Unternehmen braucht</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {/* Big card with mockup preview */}
          <div className="scroll-reveal" style={{ gridColumn: "span 2", background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 24, padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280, overflow: "hidden", position: "relative" }}>
            {/* Mini module preview mockup */}
            <div style={{
              position: "absolute", right: "1.5rem", top: "1.5rem",
              width: 180, background: "var(--surface-2)", borderRadius: 14, padding: "1rem",
              border: `1px solid ${S.border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              opacity: 0.85,
            }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Modul 2 · Phishing</div>
              <div style={{ height: 5, background: "var(--surface-3)", borderRadius: 100, marginBottom: 6 }}>
                <div style={{ height: "100%", width: "60%", background: S.accent, borderRadius: 100 }} />
              </div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-2)" }}>3/5 Themen erkundet</div>
              <div style={{ marginTop: 10, padding: "0.35rem 0.7rem", background: S.accent, borderRadius: 100, fontSize: "0.62rem", fontWeight: 700, color: "var(--accent-fg)", textAlign: "center" }}>Weiter →</div>
            </div>

            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🛡️</div>
            <div style={{ maxWidth: "55%" }}>
              <div style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>8 interaktive Module</div>
              <div style={{ color: "var(--text-2)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                Von Internetgrundlagen bis Mobile Security – strukturiert nach Pflicht-, Wichtig- und Kritisch-Kategorien. Jedes Modul 5–10 Min, vollständig mobil-optimiert.
              </div>
            </div>
          </div>

          <div className="scroll-reveal" style={{ background: S.accent, borderRadius: 24, padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontSize: "2.5rem" }}>🏆</div>
            <div>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--accent-fg)", marginBottom: "0.4rem" }}>Digitale Zertifikate</div>
              <div style={{ color: "rgba(0,0,0,0.6)", fontSize: "0.85rem" }}>Bronze, Silber & Gold mit QR-Verifikation und LinkedIn-Sharing</div>
            </div>
          </div>

          <div className="scroll-reveal" style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 24, padding: "2rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>🎣</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>Phishing-Simulationen</div>
            <div style={{ color: "var(--text-2)", fontSize: "0.83rem", lineHeight: 1.6 }}>Realistische Kampagnen mit automatischer Weiterleitung zum Schulungsmodul</div>
          </div>

          <div className="scroll-reveal" style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 24, padding: "2rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>📊</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>Compliance-Reports</div>
            <div style={{ color: "var(--text-2)", fontSize: "0.83rem", lineHeight: 1.6 }}>ISO-27001 & BSI Grundschutz – audit-fähige PDFs auf Knopfdruck</div>
          </div>

          <div className="scroll-reveal" style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 24, padding: "2rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>🌍</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>4 Sprachen & SCORM</div>
            <div style={{ color: "var(--text-2)", fontSize: "0.83rem", lineHeight: 1.6 }}>DE, EN, FR, ES – SCORM-Export für Moodle & SAP SuccessFactors</div>
          </div>
        </div>
      </section>

      {/* ── Modules ── */}
      <section id="module" style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Lernmodule</div>
          <h2 className="scroll-reveal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>8 Module · Je 5–10 Minuten</h2>
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
          ].map((m, i) => (
            <Link key={m.n} href="/login"
              className="scroll-reveal hover-lift"
              style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 16, padding: "1.25rem", textDecoration: "none", display: "block", transitionDelay: `${i * 0.04}s` }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{m.icon}</div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-2)", marginBottom: "0.25rem", fontWeight: 500 }}>Modul {m.n}</div>
              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.5rem" }}>{m.t}</div>
              <span style={{
                fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.55rem", borderRadius: 100,
                background: m.cat === "Pflicht" ? "rgba(59,130,246,0.15)" : m.cat === "Kritisch" ? "rgba(255,69,69,0.15)" : "rgba(251,191,36,0.15)",
                color: m.cat === "Pflicht" ? "#60A5FA" : m.cat === "Kritisch" ? "#FF6B6B" : "#FBBF24",
              }}>{m.cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="preise" style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem 6rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Pricing</div>
          <h2 className="scroll-reveal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Transparente Preise</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { name: "Starter", price: "49€", period: "/Monat", users: "bis 25 Nutzer", highlight: false, features: ["4 Pflichtmodule", "Bronze-Zertifikat", "Basis-Dashboard", "E-Mail-Support"] },
            { name: "Business", price: "199€", period: "/Monat", users: "bis 250 Nutzer", highlight: true, features: ["Alle 8 Module", "Alle Zertifikatsstufen", "Phishing-Simulationen", "Compliance-Reports", "White-Label", "Slack-Integration"] },
            { name: "Enterprise", price: "Anfrage", period: "", users: "Unbegrenzte Nutzer", highlight: false, features: ["Alles aus Business", "SSO (SAML/OIDC)", "SCORM-Export", "Custom Branding", "SLA 99,9%"] },
          ].map((p, i) => (
            <div key={p.name} className="scroll-reveal"
              style={{
                background: p.highlight ? S.accent : "var(--surface)",
                border: `1px solid ${p.highlight ? "transparent" : S.border}`,
                borderRadius: 24, padding: "2rem",
                transitionDelay: `${i * 0.08}s`,
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

      {/* ── Footer ── */}
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
