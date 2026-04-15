"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Shield, ArrowRight, Check, Menu, X, Lock, BarChart3, Award, Globe, Mail, Smartphone, Cloud, Key } from "lucide-react";

/* ────────────────────────────────────────
   Animated counter hook
──────────────────────────────────────── */
function useCountUp(target: number, started: boolean, duration = 1600) {
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
  const startsWithDigit = /^\d/.test(n.trim());
  const isNumeric = !isNaN(numeric) && numeric > 0 && startsWithDigit;
  const count = useCountUp(isNumeric ? numeric : 0, started && isNumeric);
  const display = isNumeric
    ? (numeric >= 1000 ? count.toLocaleString("de-DE") : count.toString()) + suffix
    : n;
  return (
    <div>
      <div style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)" }}>{display}</div>
      <div style={{ fontSize: "0.8rem", color: "var(--text-2)", marginTop: 4 }}>{l}</div>
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
    { n: "2400+", l: "Unternehmen vertrauen uns" },
    { n: "98000+", l: "Zertifizierte Mitarbeiter" },
    { n: "94%", l: "Weniger Phishing-Klicks" },
    { n: "ISO 27001", l: "Audit-fähige Reports" },
  ];

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh", overflowX: "hidden" }}>
      {/* ── Nav ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(250,251,253,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 2rem", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={17} color="#fff" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.02em", color: "var(--text)" }}>CyberAware</span>
          </div>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ alignItems: "center", gap: 4 }}>
            {["Features", "Module", "Preise"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ padding: "0.4rem 0.9rem", fontSize: "0.85rem", color: "var(--text-2)", textDecoration: "none", borderRadius: 8, transition: "color 0.15s" }}>{l}</a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="desktop-cta" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Link href="/login" style={{ padding: "0.45rem 1rem", fontSize: "0.85rem", color: "var(--text-2)", textDecoration: "none", borderRadius: 8, transition: "color 0.15s" }}>
              Anmelden
            </Link>
            <Link href="/login" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem", fontWeight: 600, background: "var(--accent)", color: "#fff", textDecoration: "none", borderRadius: 8, transition: "opacity 0.15s" }}>
              Demo starten
            </Link>
          </div>

          {/* Burger button */}
          <button
            className="burger-btn"
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4rem", borderRadius: 8, display: "none", alignItems: "center", justifyContent: "center", color: "var(--text)" }}
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
              flexDirection: "column", borderTop: "1px solid var(--border)",
              background: "rgba(250,251,253,0.98)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
              padding: "1rem 2rem 1.5rem",
            }}
            onClick={e => { if (e.target === e.currentTarget) setMenuOpen(false); }}
          >
            {["Features", "Module", "Preise"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                style={{ padding: "0.75rem 0", fontSize: "1rem", color: "var(--text)", textDecoration: "none", borderBottom: "1px solid var(--border)", fontWeight: 500 }}>
                {l}
              </a>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: "1rem" }}>
              <Link href="/login" onClick={() => setMenuOpen(false)} style={{ flex: 1, textAlign: "center", padding: "0.65rem", fontSize: "0.88rem", color: "var(--text-2)", textDecoration: "none", border: "1px solid var(--border)", borderRadius: 8 }}>
                Anmelden
              </Link>
              <Link href="/login" onClick={() => setMenuOpen(false)} style={{ flex: 1, textAlign: "center", padding: "0.65rem", fontSize: "0.88rem", fontWeight: 600, background: "var(--accent)", color: "#fff", textDecoration: "none", borderRadius: 8 }}>
                Demo starten
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "6rem 2rem 4rem", position: "relative" }}>
        <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.35rem 0.85rem", background: "var(--accent-dim)", border: "1px solid var(--accent-dim3)", borderRadius: 8, fontSize: "0.75rem", fontWeight: 600, color: "var(--accent-text)", marginBottom: "2rem" }}>
          <Lock size={12} />
          DSGVO-konform · Hosting in Deutschland
        </div>

        <h1 className="fade-up-1" style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.05, marginBottom: "1.5rem", maxWidth: 680, color: "var(--text)" }}>
          Datensicherheit,<br />
          <span style={{ color: "var(--accent)" }}>die wirkt.</span>
        </h1>

        <p className="fade-up-2" style={{ fontSize: "1.1rem", color: "var(--text-2)", maxWidth: 520, lineHeight: 1.7, marginBottom: "2.5rem" }}>
          Schulen Sie Ihre Mitarbeiter mit interaktiven Modulen zu Datensicherheit, DSGVO und Phishing-Erkennung — in 5–10 Minuten pro Modul.
        </p>

        <div className="fade-up-3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.75rem 1.5rem", background: "var(--accent)", color: "#fff", fontWeight: 600, fontSize: "0.95rem", borderRadius: 8, textDecoration: "none", transition: "opacity 0.15s" }}>
            Kostenlos testen <ArrowRight size={16} />
          </Link>
          <Link href="/admin" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.75rem 1.5rem", border: "1px solid var(--border-2)", color: "var(--text-2)", fontSize: "0.95rem", borderRadius: 8, textDecoration: "none", transition: "border-color 0.15s" }}>
            Admin-Dashboard
          </Link>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="fade-up-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", marginTop: "5rem", paddingTop: "2.5rem", borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
          {stats.map(s => (
            <StatCounter key={s.l} n={s.n} l={s.l} started={statsStarted} />
          ))}
        </div>
      </section>

      {/* ── Features Bento ── */}
      <section id="features" style={{ maxWidth: 1120, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ marginBottom: "3rem", maxWidth: 480 }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--accent-text)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Features</div>
          <h2 className="scroll-reveal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15 }}>Alles, was Ihr Unternehmen braucht</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {/* Big card */}
          <div className="scroll-reveal" style={{ gridColumn: "span 2", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280, overflow: "hidden", position: "relative" }}>
            {/* Mini preview */}
            <div style={{
              position: "absolute", right: "1.5rem", top: "1.5rem",
              width: 180, background: "var(--surface-2)", borderRadius: 12, padding: "1rem",
              border: "1px solid var(--border)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Modul 2 · Phishing</div>
              <div style={{ height: 4, background: "var(--surface-3)", borderRadius: 100, marginBottom: 6 }}>
                <div style={{ height: "100%", width: "60%", background: "var(--accent)", borderRadius: 100 }} />
              </div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-2)" }}>3/5 Themen erkundet</div>
              <div style={{ marginTop: 10, padding: "0.35rem 0.7rem", background: "var(--accent)", borderRadius: 6, fontSize: "0.62rem", fontWeight: 700, color: "#fff", textAlign: "center" }}>Weiter →</div>
            </div>

            <div style={{ width: 44, height: 44, background: "var(--accent-dim)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
              <Shield size={22} color="var(--accent)" />
            </div>
            <div style={{ maxWidth: "55%" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>8 interaktive Module</div>
              <div style={{ color: "var(--text-2)", fontSize: "0.88rem", lineHeight: 1.65 }}>
                Von Internetgrundlagen bis Mobile Security — strukturiert nach Pflicht-, Wichtig- und Kritisch-Kategorien. Jedes Modul 5–10 Min.
              </div>
            </div>
          </div>

          <div className="scroll-reveal" style={{ background: "var(--accent)", borderRadius: 16, padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ width: 44, height: 44, background: "rgba(255,255,255,0.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Award size={22} color="#fff" />
            </div>
            <div style={{ marginTop: "auto" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "0.4rem" }}>Digitale Zertifikate</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", lineHeight: 1.6 }}>Bronze, Silber & Gold mit QR-Verifikation und LinkedIn-Sharing</div>
            </div>
          </div>

          <div className="scroll-reveal" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "2rem" }}>
            <div style={{ width: 40, height: 40, background: "var(--red-dim)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
              <Mail size={20} color="var(--red)" />
            </div>
            <div style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.4rem" }}>Phishing-Simulationen</div>
            <div style={{ color: "var(--text-2)", fontSize: "0.85rem", lineHeight: 1.6 }}>Realistische Kampagnen mit automatischer Weiterleitung zum Schulungsmodul</div>
          </div>

          <div className="scroll-reveal" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "2rem" }}>
            <div style={{ width: 40, height: 40, background: "var(--accent-dim)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
              <BarChart3 size={20} color="var(--accent)" />
            </div>
            <div style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.4rem" }}>Compliance-Reports</div>
            <div style={{ color: "var(--text-2)", fontSize: "0.85rem", lineHeight: 1.6 }}>ISO-27001 & BSI Grundschutz — audit-fähige PDFs auf Knopfdruck</div>
          </div>

          <div className="scroll-reveal" style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 16, padding: "2rem" }}>
            <div style={{ width: 40, height: 40, background: "var(--amber-dim)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
              <Globe size={20} color="var(--amber)" />
            </div>
            <div style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.4rem" }}>4 Sprachen & SCORM</div>
            <div style={{ color: "var(--text-2)", fontSize: "0.85rem", lineHeight: 1.6 }}>DE, EN, FR, ES — SCORM-Export für Moodle & SAP SuccessFactors</div>
          </div>
        </div>
      </section>

      {/* ── Modules ── */}
      <section id="module" style={{ maxWidth: 1120, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ marginBottom: "3rem", maxWidth: 480 }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--accent-text)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Lernmodule</div>
          <h2 className="scroll-reveal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15 }}>8 Module · Je 5–10 Minuten</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            { n: 1, icon: Globe, t: "Internetgrundlagen", cat: "Pflicht" },
            { n: 2, icon: Mail, t: "Phishing erkennen", cat: "Kritisch" },
            { n: 3, icon: Key, t: "Sichere Passwörter", cat: "Pflicht" },
            { n: 4, icon: Shield, t: "DSGVO Grundlagen", cat: "Pflicht" },
            { n: 5, icon: Lock, t: "Gerätesicherheit", cat: "Pflicht" },
            { n: 6, icon: Mail, t: "E-Mail-Sicherheit", cat: "Wichtig" },
            { n: 7, icon: Cloud, t: "Cloud-Dienste", cat: "Wichtig" },
            { n: 8, icon: Smartphone, t: "Mobile Sicherheit", cat: "Kritisch" },
          ].map((m, i) => {
            const Icon = m.icon;
            return (
            <Link key={m.n} href="/login"
              className="scroll-reveal hover-lift"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem", textDecoration: "none", display: "block", transitionDelay: `${i * 0.04}s` }}>
              <div style={{ width: 36, height: 36, background: m.cat === "Kritisch" ? "var(--red-dim)" : m.cat === "Wichtig" ? "var(--amber-dim)" : "var(--accent-dim)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
                <Icon size={18} color={m.cat === "Kritisch" ? "var(--red)" : m.cat === "Wichtig" ? "var(--amber)" : "var(--accent)"} />
              </div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-3)", marginBottom: "0.2rem", fontWeight: 500 }}>Modul {m.n}</div>
              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.5rem" }}>{m.t}</div>
              <span style={{
                fontSize: "0.65rem", fontWeight: 600, padding: "0.2rem 0.55rem", borderRadius: 6,
                background: m.cat === "Pflicht" ? "var(--accent-dim)" : m.cat === "Kritisch" ? "var(--red-dim)" : "var(--amber-dim)",
                color: m.cat === "Pflicht" ? "var(--accent-text)" : m.cat === "Kritisch" ? "var(--red)" : "var(--amber)",
              }}>{m.cat}</span>
            </Link>
          )})}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="preise" style={{ maxWidth: 1120, margin: "0 auto", padding: "4rem 2rem 6rem" }}>
        <div style={{ marginBottom: "3rem", maxWidth: 480 }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--accent-text)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Pricing</div>
          <h2 className="scroll-reveal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15 }}>Transparente Preise</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { name: "Starter", price: "49€", period: "/Monat", users: "bis 25 Nutzer", highlight: false, features: ["4 Pflichtmodule", "Bronze-Zertifikat", "Basis-Dashboard", "E-Mail-Support"] },
            { name: "Business", price: "199€", period: "/Monat", users: "bis 250 Nutzer", highlight: true, features: ["Alle 8 Module", "Alle Zertifikatsstufen", "Phishing-Simulationen", "Compliance-Reports", "White-Label", "Slack-Integration"] },
            { name: "Enterprise", price: "Anfrage", period: "", users: "Unbegrenzte Nutzer", highlight: false, features: ["Alles aus Business", "SSO (SAML/OIDC)", "SCORM-Export", "Custom Branding", "SLA 99,9%"] },
          ].map((p, i) => (
            <div key={p.name} className="scroll-reveal"
              style={{
                background: p.highlight ? "var(--accent)" : "var(--surface)",
                border: `1px solid ${p.highlight ? "transparent" : "var(--border)"}`,
                borderRadius: 16, padding: "2rem",
                transitionDelay: `${i * 0.08}s`,
                position: "relative",
              }}>
              {p.highlight && <div style={{ position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)", background: "var(--accent-light)", color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.75rem", borderRadius: "0 0 8px 8px" }}>Beliebt</div>}
              <div style={{ fontSize: "0.75rem", fontWeight: 500, color: p.highlight ? "rgba(255,255,255,0.6)" : "var(--text-3)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.users}</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: p.highlight ? "#fff" : "var(--text)", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>{p.name}</div>
              <div style={{ marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: 700, color: p.highlight ? "#fff" : "var(--text)", letterSpacing: "-0.03em" }}>{p.price}</span>
                <span style={{ fontSize: "0.85rem", color: p.highlight ? "rgba(255,255,255,0.5)" : "var(--text-3)" }}>{p.period}</span>
              </div>
              <ul style={{ listStyle: "none", marginBottom: "1.5rem" }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: p.highlight ? "rgba(255,255,255,0.85)" : "var(--text-2)", marginBottom: 8 }}>
                    <Check size={14} color={p.highlight ? "#fff" : "var(--accent)"} strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/login" style={{ display: "block", textAlign: "center", padding: "0.7rem", background: p.highlight ? "#fff" : "transparent", border: p.highlight ? "none" : "1px solid var(--border-2)", color: p.highlight ? "var(--accent)" : "var(--text-2)", fontWeight: 600, fontSize: "0.85rem", borderRadius: 8, textDecoration: "none", transition: "opacity 0.15s" }}>
                {p.name === "Enterprise" ? "Kontakt" : "Jetzt starten"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "2.5rem 2rem", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 24, height: 24, background: "var(--accent)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Shield size={13} color="#fff" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.88rem" }}>CyberAware</span>
        </div>
        <div style={{ fontSize: "0.78rem", color: "var(--text-3)" }}>DSGVO-konform · ISO 27001 · BSI Grundschutz · © 2024 CyberAware GmbH</div>
      </footer>
    </div>
  );
}
