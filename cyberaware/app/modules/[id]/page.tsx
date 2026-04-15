"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { modules } from "@/lib/data";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { S } from "@/lib/theme";

type Phase = "intro" | "content" | "quiz" | "complete";

/* ════════════════════════════════════════
   PHISHING EMAIL DEMO
════════════════════════════════════════ */
function PhishingEmailDemo() {
  const [found, setFound] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<number | null>(null);

  const hints = [
    { id: 1, label: "Gefälschte Absender-Domain", desc: "«microsofft-helpdesk.com» ist nicht Microsoft. Echte Microsoft-Mails kommen ausschließlich von @microsoft.com. Achte immer auf alles nach dem @-Zeichen." },
    { id: 2, label: "Künstliche Dringlichkeit", desc: "«In 24 Stunden gesperrt» soll Panik auslösen und zu übereiltem Handeln verleiten. Seriöse Unternehmen setzen Nutzer nie so unter Zeitdruck." },
    { id: 3, label: "Zugangsdaten-Abfrage", desc: "Kein seriöser Dienst fordert Dich per E-Mail auf, Anmeldedaten zu «bestätigen». Das ist das Kern-Ziel von Phishing." },
    { id: 4, label: "Gefälschte Link-URL", desc: "Der Button führt zu «microsoft-login.security-verify.com» — nicht zu microsoft.com. Die echte Domain steht immer direkt vor dem ersten «/»." },
    { id: 5, label: "Fear-Tactic: Datenverlust", desc: "«Alle Daten unwiderruflich gelöscht» ist eine Drohung, um Dich ohne Nachdenken klicken zu lassen. Typische Einschüchterungstaktik." },
  ];

  function Hint({ id, children }: { id: number; children: React.ReactNode }) {
    const cls = found.has(id) ? (active === id ? "hint-target active" : "hint-target found") : "hint-target";
    return (
      <span className={cls} onClick={() => { setActive(id); setFound(f => new Set([...f, id])); }}>
        {children}
        <sup style={{ fontSize: "0.55em", color: S.red, marginLeft: 1, fontWeight: 700 }}>{id}</sup>
      </span>
    );
  }

  const activeHint = hints.find(h => h.id === active);
  const allFound = found.size === hints.length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: "0.7rem", color: S.text2 }}>🔍 Klicke auf die unterstrichenen Stellen</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 3 }}>
            {hints.map(h => (
              <div key={h.id} style={{ width: 7, height: 7, borderRadius: "50%", background: found.has(h.id) ? S.red : S.surface3, transition: "background 0.3s ease" }} />
            ))}
          </div>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: allFound ? S.red : S.text2 }}>{found.size}/5</span>
        </div>
      </div>

      <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", marginBottom: 10 }}>
        {/* Mail app title bar */}
        <div style={{ background: "#F8F8FC", padding: "8px 12px", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
          <span style={{ marginLeft: "auto", fontSize: "0.62rem", color: "#8888A8" }}>Mail — Posteingang (1)</span>
        </div>
        {/* Mail header fields */}
        <div style={{ background: "#FFFFFF", padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: "0.75rem", lineHeight: 2.1 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ color: "#8888A8", width: 56, flexShrink: 0 }}>Von:</span>
            <Hint id={1}>support@<strong>microsofft-helpdesk.com</strong></Hint>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ color: "#8888A8", width: 56, flexShrink: 0 }}>An:</span>
            <span style={{ color: "#4A4A62" }}>sie@ihr-unternehmen.de</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ color: "#8888A8", width: 56, flexShrink: 0 }}>Betreff:</span>
            <span style={{ color: "#0D0D16", fontWeight: 600 }}>⚠️ DRINGEND: Ihr Konto wird <Hint id={2}>in 24 Stunden gesperrt</Hint></span>
          </div>
        </div>
        {/* Mail body */}
        <div style={{ background: "#FAFAFA", padding: "16px 20px", fontSize: "0.82rem", color: "#4A4A62", lineHeight: 1.9 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, marginBottom: 14, background: "#0078d4", padding: "4px 10px", borderRadius: 5 }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.05em" }}>Microsoft</span>
          </div>
          <p style={{ marginBottom: 10, color: "#0D0D16" }}>Sehr geehrte/r Nutzer/in,</p>
          <p style={{ marginBottom: 10, color: "#0D0D16" }}>
            wir haben ungewöhnliche Aktivitäten in Ihrem Konto festgestellt. Um eine Sperrung zu verhindern, müssen Sie Ihre <Hint id={3}>Anmeldedaten sofort bestätigen</Hint>.
          </p>
          <div style={{ margin: "16px 0" }}>
            <Hint id={4}>
              <span style={{ display: "inline-block", background: "#0078d4", color: "#fff", padding: "8px 18px", borderRadius: 6, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.02em" }}>
                JETZT KONTO SICHERN →
              </span>
            </Hint>
            <div style={{ fontSize: "0.6rem", color: "#8888A8", marginTop: 4 }}>
              https://microsoft-login.<strong style={{ color: "#4A4A62" }}>security-verify.com</strong>/auth?session=...
            </div>
          </div>
          <p style={{ color: "#4A4A62" }}>
            Falls Sie nicht reagieren, wird Ihr Konto gesperrt und <Hint id={5}>alle Ihre Daten werden unwiderruflich gelöscht</Hint>.
          </p>
          <div style={{ marginTop: 14, paddingTop: 10, borderTop: "1px solid rgba(0,0,0,0.06)", fontSize: "0.62rem", color: "#8888A8" }}>
            Microsoft Corporation · One Microsoft Way · Redmond, WA 98052
          </div>
        </div>
      </div>

      {activeHint && (
        <div key={activeHint.id} className="fade-up" style={{ background: "rgba(255,69,69,0.06)", border: "1px solid rgba(255,69,69,0.2)", borderRadius: 12, padding: "0.9rem 1rem", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <span style={{ background: S.red, color: "#fff", fontSize: "0.6rem", fontWeight: 700, padding: "0.1rem 0.5rem", borderRadius: 10 }}>GEFAHR #{activeHint.id}</span>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: S.text }}>{activeHint.label}</span>
          </div>
          <p style={{ fontSize: "0.78rem", color: S.text2, lineHeight: 1.65 }}>{activeHint.desc}</p>
        </div>
      )}

      {allFound && (
        <div className="pop" style={{ background: "rgba(0,217,126,0.06)", border: "1px solid rgba(0,217,126,0.22)", borderRadius: 12, padding: "1rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.6rem", marginBottom: 4 }}>🎉</div>
          <div style={{ fontWeight: 700, color: S.green, marginBottom: 2 }}>Alle 5 Phishing-Merkmale gefunden!</div>
          <div style={{ fontSize: "0.75rem", color: S.text2 }}>Sie können Phishing-Mails jetzt sicher erkennen.</div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   PASSWORD STRENGTH DEMO
════════════════════════════════════════ */
function PasswordStrengthDemo() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);

  const checks = [
    { label: "Mindestens 12 Zeichen", ok: pw.length >= 12 },
    { label: "Großbuchstaben (A–Z)", ok: /[A-Z]/.test(pw) },
    { label: "Kleinbuchstaben (a–z)", ok: /[a-z]/.test(pw) },
    { label: "Zahlen (0–9)", ok: /[0-9]/.test(pw) },
    { label: "Sonderzeichen (!@#$…)", ok: /[^A-Za-z0-9]/.test(pw) },
  ];
  const strength = checks.filter(c => c.ok).length;
  const labels = ["Sehr schwach", "Schwach", "Mittel", "Stark", "Sehr stark"];
  const colors = [S.red, "#FF8C00", S.amber, S.green, S.accent];
  const examples = ["Hund123", "P@ssw0rd", "korrekt-pferd-batterie", "X9#mK!2vQ&wR"];

  return (
    <div>
      <p style={{ fontSize: "0.75rem", color: S.text2, marginBottom: 12 }}>
        💡 Gib ein Passwort ein und sieh in Echtzeit wie sicher es ist:
      </p>
      <div style={{ position: "relative", marginBottom: 12 }}>
        <input
          type={show ? "text" : "password"}
          value={pw}
          onChange={e => setPw(e.target.value)}
          placeholder="Passwort eingeben…"
          style={{ width: "100%", background: S.surface2, border: `1px solid ${S.border}`, borderRadius: 12, padding: "0.8rem 3rem 0.8rem 1rem", fontSize: "0.95rem", color: S.text, outline: "none", fontFamily: "monospace", letterSpacing: "0.05em" }}
        />
        <button onClick={() => setShow(s => !s)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "1rem", lineHeight: 1 }}>
          {show ? "🙈" : "👁️"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{ flex: 1, height: 5, borderRadius: 10, background: i < strength ? colors[Math.min(strength - 1, 4)] : S.surface3, transition: "background 0.3s ease" }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: pw.length > 0 ? 12 : 0, fontSize: "0.72rem" }}>
        <span style={{ color: pw.length > 0 ? colors[Math.min(strength - 1, 4)] : S.text3, fontWeight: 700, transition: "color 0.3s" }}>
          {pw.length > 0 ? (labels[Math.min(strength - 1, 4)] ?? "Sehr schwach") : ""}
        </span>
        {pw.length > 0 && <span style={{ color: S.text2 }}>{pw.length} Zeichen</span>}
      </div>

      {pw.length > 0 && (
        <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
          {checks.map(c => (
            <div key={c.label} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: "0.78rem", color: c.ok ? S.green : S.text2, transition: "color 0.25s" }}>
              <span style={{ fontWeight: 700, color: c.ok ? S.green : S.text3, transition: "color 0.25s", width: 14, flexShrink: 0 }}>{c.ok ? "✓" : "○"}</span>
              {c.label}
            </div>
          ))}
        </div>
      )}

      <p style={{ fontSize: "0.68rem", color: S.text3, marginBottom: 7 }}>Beispiele ausprobieren:</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {examples.map(ex => (
          <button key={ex} onClick={() => setPw(ex)} style={{ padding: "0.3rem 0.75rem", borderRadius: 10, fontSize: "0.7rem", background: S.surface3, border: `1px solid ${S.border}`, color: S.text2, cursor: "pointer", fontFamily: "monospace", transition: "border-color 0.15s" }}>
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   URL ANATOMY DEMO
════════════════════════════════════════ */
function URLAnatomyDemo() {
  const [active, setActive] = useState<string | null>(null);

  const parts = [
    { id: "protocol", text: "https://", color: "var(--accent-text)", label: "Protokoll (HTTPS)", desc: "HTTPS verschlüsselt die Verbindung mit TLS/SSL. HTTP überträgt alles im Klartext – bei sensiblen Daten immer auf das Schloss-Symbol und HTTPS achten." },
    { id: "subdomain", text: "www.", color: "#A78BFA", label: "Subdomain", desc: "Subdomains können legitim oder gefälscht wirken. «paypal.fakesite.com» ist NICHT PayPal. Die echte Domain steht direkt vor dem ersten Schrägstrich." },
    { id: "domain", text: "paypa1", color: "#FF4545", label: "⚠️ Typosquatting!", desc: "«paypa1.com» imitiert «paypal.com» – die Zahl 1 ersetzt den Buchstaben l. Diese Technik heißt Typosquatting und ist ein häufiger Phishing-Trick." },
    { id: "tld", text: ".com", color: "#F59E0B", label: "Top-Level-Domain", desc: "Die TLD ist Teil der echten Domain. Achte auf ungewöhnliche Endungen wie .xyz oder .online bei vermeintlich bekannten Marken." },
    { id: "path", text: "/de/login", color: "#00D97E", label: "Pfad (Path)", desc: "Der Pfad zeigt die «Seite» auf dem Server. /login ist ein häufig imitierter Pfad bei Phishing – der Pfad ändert nichts an der echten Domain." },
    { id: "query", text: "?redirect=bank", color: "#F472B6", label: "Query-Parameter", desc: "Parameter können Tracking-Daten oder manipulierte Weiterleitungen enthalten. «?redirect=bank» könnte zu einer Banking-Seite weiterleiten." },
  ];

  const activePart = parts.find(p => p.id === active);

  return (
    <div>
      <p style={{ fontSize: "0.75rem", color: S.text2, marginBottom: 12 }}>
        🔍 Klicke auf die farbigen Teile der URL, um sie zu verstehen:
      </p>

      {/* URL bar — styled like a browser address bar */}
      <div style={{ background: "#F1F1F7", borderRadius: 12, padding: "0.65rem 1rem", marginBottom: 12, fontFamily: "monospace", fontSize: "0.9rem", display: "flex", flexWrap: "wrap", alignItems: "center", border: "1px solid rgba(0,0,0,0.08)", lineHeight: 2, gap: 0 }}>
        {/* Lock icon */}
        <span style={{ fontSize: "0.75rem", marginRight: 6, color: "#3B82F6", flexShrink: 0 }}>🔒</span>
        {parts.map(part => (
          <span
            key={part.id}
            onClick={() => setActive(part.id === active ? null : part.id)}
            style={{
              color: part.color,
              cursor: "pointer",
              borderRadius: 4,
              padding: "0.05rem 0.15rem",
              background: active === part.id ? `${part.color}22` : "transparent",
              textDecoration: "underline",
              textDecorationStyle: "dotted",
              textDecorationColor: part.color,
              fontWeight: active === part.id ? 700 : 400,
              transition: "background 0.15s",
            }}
          >
            {part.text}
          </span>
        ))}
      </div>

      {/* Legend chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {parts.map(part => (
          <div
            key={part.id}
            onClick={() => setActive(part.id === active ? null : part.id)}
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "0.2rem 0.6rem", borderRadius: 10, background: active === part.id ? `${part.color}18` : S.surface2, border: `1px solid ${active === part.id ? part.color + "66" : "transparent"}`, cursor: "pointer", transition: "all 0.15s" }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: part.color, flexShrink: 0 }} />
            <span style={{ fontSize: "0.65rem", color: active === part.id ? part.color : S.text2, fontWeight: active === part.id ? 700 : 400 }}>{part.label}</span>
          </div>
        ))}
      </div>

      {/* Explanation */}
      {activePart && (
        <div key={activePart.id} className="fade-up" style={{ background: `${activePart.color}0D`, border: `1px solid ${activePart.color}33`, borderRadius: 12, padding: "0.9rem 1rem" }}>
          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: activePart.color, marginBottom: 5 }}>{activePart.label}</div>
          <p style={{ fontSize: "0.78rem", color: S.text2, lineHeight: 1.65, margin: 0 }}>{activePart.desc}</p>
        </div>
      )}

      {!activePart && (
        <div style={{ background: S.surface2, borderRadius: 12, padding: "0.75rem 1rem", fontSize: "0.75rem", color: S.text3, textAlign: "center" }}>
          Klicke auf einen URL-Teil oder ein Chip oben ↑
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   CEO FRAUD CHAT DEMO
════════════════════════════════════════ */
function CEOFraudChatDemo() {
  const [found, setFound] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<number | null>(null);

  const hints = [
    { id: 1, label: "Ungewöhnlicher Kanal", desc: "CEOs kommunizieren finanzielle Anweisungen nie über WhatsApp oder SMS. Offizielle Transaktionen laufen immer über definierte Geschäftsprozesse mit schriftlicher Dokumentation." },
    { id: 2, label: "Künstliche Dringlichkeit", desc: "«Sofort bis 15:00 Uhr» ist ein klassisches Manipulationsmerkmal. Echte Geschäftsprozesse lassen immer Zeit für Verifikation. Zeitdruck = Manipulationsversuch." },
    { id: 3, label: "Geheimhaltungsappell", desc: "«Sagen Sie es niemandem» soll verhindern, dass die Anweisung von Kollegen oder dem echten CEO überprüft wird. Seriöse Anfragen scheuen keine Kontrolle." },
    { id: 4, label: "Große Summe ohne Prozess", desc: "89.500 € per WhatsApp ohne Buchhaltungsprüfung, kein formaler Freigabeprozess. Finanzielle Anweisungen müssen immer über offizielle Kanäle und mit Gegenzeichnung erfolgen." },
    { id: 5, label: "Autoritätsdruck & Schmeichelei", desc: "«Ich vertraue Ihnen» kombiniert mit der CEO-Autorität erzeugt psychologischen Druck. Kritisches Hinterfragen wird dadurch als Vertrauensbruch dargestellt." },
  ];

  function ChatHint({ id, children }: { id: number; children: React.ReactNode }) {
    const isFd = found.has(id);
    const isAct = active === id;
    return (
      <span
        className={isFd ? (isAct ? "chat-hint active" : "chat-hint found") : "chat-hint"}
        onClick={() => { setActive(id); setFound(f => new Set([...f, id])); }}
      >
        {children}
      </span>
    );
  }

  const activeHint = hints.find(h => h.id === active);
  const allFound = found.size === hints.length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: "0.7rem", color: S.text2 }}>🔍 Klicke auf verdächtige Stellen im Chat</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 3 }}>
            {hints.map(h => (
              <div key={h.id} style={{ width: 7, height: 7, borderRadius: "50%", background: found.has(h.id) ? S.amber : S.surface3, transition: "background 0.3s ease" }} />
            ))}
          </div>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: allFound ? S.amber : S.text2 }}>{found.size}/5</span>
        </div>
      </div>

      {/* WhatsApp-style chat */}
      <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", marginBottom: 10 }}>
        {/* Header */}
        <div style={{ background: "#075E54", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#128C7E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>TM</div>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff" }}>Thomas Müller (CEO)</div>
            <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.6)" }}>Zuletzt gesehen: heute, 14:32</div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: "0.62rem", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>WhatsApp</div>
        </div>

        {/* Messages */}
        <div style={{ background: "#ECE5DD", padding: "12px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ alignSelf: "flex-start", maxWidth: "82%", background: "#fff", borderRadius: "0 12px 12px 12px", padding: "8px 12px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
            <p style={{ fontSize: "0.82rem", color: "#111", margin: "0 0 4px 0", lineHeight: 1.55 }}>
              Hallo, ich bin gerade in einem wichtigen Meeting und habe keinen Laptop dabei. Ich brauche Ihre Hilfe bei einer <ChatHint id={1}>dringenden Angelegenheit über diesen Kanal</ChatHint>.
            </p>
            <div style={{ fontSize: "0.6rem", color: "#888", textAlign: "right" }}>14:32 ✓✓</div>
          </div>

          <div style={{ alignSelf: "flex-start", maxWidth: "82%", background: "#fff", borderRadius: "0 12px 12px 12px", padding: "8px 12px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
            <p style={{ fontSize: "0.82rem", color: "#111", margin: "0 0 4px 0", lineHeight: 1.55 }}>
              Wir müssen <ChatHint id={2}>sofort noch heute bis 15:00 Uhr</ChatHint> eine Zahlung an einen neuen Lieferanten veranlassen. Das ist <ChatHint id={3}>streng vertraulich – bitte sagen Sie es vorerst niemandem im Büro</ChatHint>.
            </p>
            <div style={{ fontSize: "0.6rem", color: "#888", textAlign: "right" }}>14:33 ✓✓</div>
          </div>

          <div style={{ alignSelf: "flex-end", maxWidth: "75%", background: "#DCF8C6", borderRadius: "12px 0 12px 12px", padding: "8px 12px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
            <p style={{ fontSize: "0.82rem", color: "#111", margin: "0 0 4px 0" }}>Um welchen Betrag handelt es sich?</p>
            <div style={{ fontSize: "0.6rem", color: "#888", textAlign: "right" }}>14:35 ✓✓</div>
          </div>

          <div style={{ alignSelf: "flex-start", maxWidth: "82%", background: "#fff", borderRadius: "0 12px 12px 12px", padding: "8px 12px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
            <p style={{ fontSize: "0.82rem", color: "#111", margin: "0 0 4px 0", lineHeight: 1.55 }}>
              <ChatHint id={4}>89.500 € auf dieses Konto: DE89 3704 0044 0532 0130 00</ChatHint>. Verwendungszweck: «Projektberatung Q1». <ChatHint id={5}>Ich vertraue Ihnen – Sie schaffen das!</ChatHint>
            </p>
            <div style={{ fontSize: "0.6rem", color: "#888", textAlign: "right" }}>14:36 ✓✓</div>
          </div>
        </div>
      </div>

      {activeHint && (
        <div key={activeHint.id} className="fade-up" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 12, padding: "0.9rem 1rem", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <span style={{ background: S.amber, color: "#000", fontSize: "0.6rem", fontWeight: 700, padding: "0.1rem 0.5rem", borderRadius: 10 }}>WARNSIGNAL #{activeHint.id}</span>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: S.text }}>{activeHint.label}</span>
          </div>
          <p style={{ fontSize: "0.78rem", color: S.text2, lineHeight: 1.65 }}>{activeHint.desc}</p>
        </div>
      )}

      {allFound && (
        <div className="pop" style={{ background: "rgba(0,217,126,0.06)", border: "1px solid rgba(0,217,126,0.22)", borderRadius: 12, padding: "1rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.6rem", marginBottom: 4 }}>🛡️</div>
          <div style={{ fontWeight: 700, color: S.green, marginBottom: 2 }}>Alle 5 CEO-Fraud-Merkmale erkannt!</div>
          <div style={{ fontSize: "0.75rem", color: S.text2 }}>Richtig: Anruf beim echten CEO über bekannte Firmennummer und IT-Sicherheit informieren.</div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   COOKIE CONSENT DEMO
════════════════════════════════════════ */
function CookieConsentDemo() {
  const [ratings, setRatings] = useState<Record<number, "valid" | "invalid" | null>>({ 0: null, 1: null, 2: null });
  const [shown, setShown] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false });

  const dialogs = [
    {
      title: "Cookie-Einstellungen",
      checkboxes: [
        { label: "Notwendige Cookies", checked: true, locked: true },
        { label: "Analyse-Cookies", checked: true, locked: false },
        { label: "Marketing-Cookies", checked: true, locked: false },
      ],
      hasReject: false,
      isValid: false,
      verdict: "Nicht konform: Analyse- und Marketing-Cookies sind vorausgefüllt (Opt-Out statt Opt-In). Einwilligung muss aktiv erteilt werden. Zudem fehlt ein «Alles ablehnen»-Button.",
    },
    {
      title: "Datenschutz-Einstellungen",
      checkboxes: [
        { label: "Notwendige Cookies", checked: true, locked: true },
        { label: "Analyse-Cookies", checked: false, locked: false },
        { label: "Marketing-Cookies", checked: false, locked: false },
      ],
      hasReject: true,
      isValid: true,
      verdict: "DSGVO-konform: Opt-In (nicht vorausgefüllt), klarer «Ablehnen»-Button, nur notwendige Cookies sind vorgewählt. Echte Wahlmöglichkeit ist gegeben.",
    },
    {
      title: "Wir nutzen Cookies 🍪",
      checkboxes: null,
      hasReject: false,
      isValid: false,
      verdict: "Nicht konform: «Durch Nutzung der Website stimmen Sie zu» ist keine gültige Einwilligung. Es gibt keine echte Wahlmöglichkeit und keine Möglichkeit abzulehnen.",
    },
  ];

  function rate(i: number, val: "valid" | "invalid") {
    setRatings(r => ({ ...r, [i]: val }));
    setShown(s => ({ ...s, [i]: true }));
  }

  const allDone = Object.values(ratings).every(v => v !== null);

  return (
    <div>
      <p style={{ fontSize: "0.75rem", color: S.text2, marginBottom: 14 }}>
        🍪 Bewertet jedes dieser Cookie-Banner — DSGVO-konform oder nicht?
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {dialogs.map((dialog, i) => {
          const myRating = ratings[i];
          const correct = myRating === (dialog.isValid ? "valid" : "invalid");
          const resultShown = shown[i];

          return (
            <div key={i} style={{ border: `1px solid ${resultShown ? (correct ? "rgba(0,217,126,0.35)" : "rgba(255,69,69,0.35)") : S.border}`, borderRadius: 14, overflow: "hidden", transition: "border-color 0.25s" }}>
              {/* Mock banner */}
              <div style={{ background: S.surface2, padding: "1rem", borderBottom: `1px solid ${S.border}` }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, marginBottom: 10 }}>
                  <span style={{ fontSize: "0.62rem", fontWeight: 600, padding: "0.15rem 0.45rem", borderRadius: 10, background: S.surface3, color: S.text3, marginRight: 8 }}>Banner {i + 1}</span>
                  {dialog.title}
                </div>

                {dialog.checkboxes ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 10 }}>
                    {dialog.checkboxes.map((item, j) => (
                      <label key={j} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.75rem", color: S.text2, cursor: "default" }}>
                        <input type="checkbox" defaultChecked={item.checked} disabled style={{ accentColor: "var(--accent)", cursor: "default" }} />
                        {item.label}
                        {item.checked && !item.locked && (
                          <span style={{ fontSize: "0.6rem", color: S.red, fontWeight: 700 }}>← vorausgefüllt!</span>
                        )}
                      </label>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: "0.75rem", color: S.text2, marginBottom: 10, lineHeight: 1.5 }}>
                    Durch die Nutzung dieser Website stimmen Sie der Verwendung von Cookies für Analyse und Marketing zu.
                  </p>
                )}

                <div style={{ display: "flex", gap: 6 }}>
                  {dialog.hasReject && (
                    <div style={{ flex: 1, padding: "0.4rem", background: "transparent", border: `1px solid ${S.border}`, borderRadius: 8, textAlign: "center", fontSize: "0.72rem", color: S.text2 }}>
                      Alles ablehnen
                    </div>
                  )}
                  <div style={{ flex: 1, padding: "0.4rem", background: S.accent, borderRadius: 8, textAlign: "center", fontSize: "0.72rem", fontWeight: 700, color: "#fff" }}>
                    Akzeptieren
                  </div>
                </div>
              </div>

              {/* Rating / result */}
              {!resultShown ? (
                <div style={{ padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: 8, background: S.surface }}>
                  <span style={{ fontSize: "0.72rem", color: S.text2, flexShrink: 0 }}>Ihr Urteil:</span>
                  <button onClick={() => rate(i, "valid")}
                    style={{ flex: 1, padding: "0.4rem", borderRadius: 8, border: "1px solid rgba(0,217,126,0.3)", background: "rgba(0,217,126,0.06)", color: S.green, fontSize: "0.72rem", fontWeight: 700, cursor: "pointer" }}>
                    ✓ Konform
                  </button>
                  <button onClick={() => rate(i, "invalid")}
                    style={{ flex: 1, padding: "0.4rem", borderRadius: 8, border: "1px solid rgba(255,69,69,0.3)", background: "rgba(255,69,69,0.06)", color: S.red, fontSize: "0.72rem", fontWeight: 700, cursor: "pointer" }}>
                    ✗ Nicht konform
                  </button>
                </div>
              ) : (
                <div key={`r-${i}`} className="fade-up" style={{ padding: "0.85rem 1rem", background: correct ? "rgba(0,217,126,0.05)" : "rgba(255,69,69,0.05)" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: correct ? S.green : S.red, marginBottom: 4 }}>
                    {correct ? "✓ Richtig!" : "✗ Falsch!"}{" "}
                    {dialog.isValid ? "Dieses Banner ist DSGVO-konform." : "Dieses Banner ist nicht DSGVO-konform."}
                  </div>
                  <p style={{ fontSize: "0.72rem", color: S.text2, lineHeight: 1.6, margin: 0 }}>{dialog.verdict}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allDone && (
        <div className="pop" style={{ marginTop: 14, background: "rgba(0,217,126,0.06)", border: "1px solid rgba(0,217,126,0.22)", borderRadius: 12, padding: "1rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.6rem", marginBottom: 4 }}>🏆</div>
          <div style={{ fontWeight: 700, color: S.green, marginBottom: 2 }}>Alle Banner bewertet!</div>
          <div style={{ fontSize: "0.75rem", color: S.text2 }}>Merke: Echte Einwilligung = freiwillig, spezifisch, informiert, aktiv (Opt-In) und jederzeit widerrufbar.</div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   TOPIC CONTENT MAP
════════════════════════════════════════ */
const topicContents: Record<number, string[]> = {
  1: ["Eine **Domain** ist die lesbare Adresse einer Website (z.B. 'example.com'). Die **URL** ist die vollständige Adresse inklusive Protokoll und Pfad: 'https://example.com/seite'.", "**HTTP** überträgt Daten unverschlüsselt. **HTTPS** nutzt TLS-Verschlüsselung. Erkennbar am Schloss-Symbol im Browser – immer auf HTTPS achten bei sensiblen Daten.", "Das **DNS** ist das 'Telefonbuch des Internets'. Es übersetzt Domainnamen wie 'google.com' in numerische IP-Adressen, die Computer für Verbindungen brauchen.", "**IP-Adressen** identifizieren Geräte im Netzwerk eindeutig. IPv4-Format: 192.168.1.1 – IPv6 ist länger. Öffentliche IPs sind weltweit eindeutig, private nur lokal.", "Prüfen Sie immer das **Schlosssymbol** und die Domain im Browser. Misstrauisch bei ähnlichen Domains wie 'gooogle.com' oder 'bank-login.de' (Typosquatting)."],
  2: ["Phishing-Mails erkennt man an: **Dringlichkeit** ('Konto gesperrt!'), **Rechtschreibfehlern**, **verdächtiger Absenderadresse** und **unerwarteten Anhängen**.", "**Social Engineering** manipuliert psychologisch: Autorität ('Ich bin Ihr CEO'), Dringlichkeit, Angst, Hilfsbereitschaft. Immer kritisch hinterfragen.", "Prüfen Sie den **vollständigen Absender**: 'service@paypal-sicher.net' ≠ PayPal. Hover über Links für echte URL. Im Zweifel direkt die Website aufrufen.", "**Gefährliche Links** imitieren echte URLs: 'paypa1.com', 'paypal.login-check.com', 'paypal.com.phish.net'. Die echte Domain steht immer direkt vor dem ersten '/'.", "**Sofortmaßnahmen**: Nicht klicken, IT-Sicherheitsbeauftragten informieren, als Phishing melden. Bei Klick: Passwörter sofort ändern und IT kontaktieren."],
  3: ["Ein **sicheres Passwort** hat min. 16 Zeichen mit Groß-/Kleinbuchstaben, Zahlen, Sonderzeichen. Besser: **Passphrase** aus 4+ zufälligen Wörtern.", "Ein **Passwortmanager** (Bitwarden, 1Password) speichert alle Passwörter verschlüsselt. Sie merken sich nur ein Master-Passwort und er generiert starke, einzigartige Passwörter.", "**2FA/MFA** fügt einen zweiten Faktor hinzu. Selbst bei gestohlenem Passwort kann sich niemand ohne den zweiten Faktor (App, Hardware-Key) einloggen.", "**Passwort-Hygiene**: Niemals mehrere Dienste mit gleichem Passwort. Nicht per E-Mail senden. Keine Post-Its. Regelmäßig auf Datenlecks prüfen (haveibeenpwned.com).", "**Sichere Wiederherstellung**: Backup-Codes sicher aufbewahren, Backup-E-Mail aktuell halten. Hardware-Keys (YubiKey) sind die sicherste 2FA-Methode."],
  4: ["**Personenbezogene Daten** sind alle Informationen, die eine Person direkt oder indirekt identifizieren: Name, E-Mail, IP-Adresse, Standort, biometrische Daten.", "Eine **Einwilligung** muss freiwillig, spezifisch, informiert und eindeutig sein. Vorausgefüllte Checkboxen sind ungültig. Jede Einwilligung ist widerrufbar.", "**Betroffenenrechte**: Auskunft, Berichtigung, Löschung ('Recht auf Vergessenwerden'), Einschränkung, Portabilität, Widerspruch. Antrag muss innerhalb eines Monats beantwortet werden.", "Eine **Datenpanne** muss binnen 72 Stunden der Aufsichtsbehörde gemeldet werden (Art. 33 DSGVO). Bei hohem Risiko müssen Betroffene direkt informiert werden.", "Ein **Datenschutzbeauftragter** (DSB) ist ab 20 Personen mit regelmäßiger Datenverarbeitung Pflicht. Er ist intern unabhängig und weisungsfrei tätig."],
  5: ["**Software-Updates** schließen Sicherheitslücken (CVEs). Automatische Updates aktivieren für OS und Anwendungen. Ungepatchte Systeme sind das häufigste Angriffsziel.", "Die **Bildschirmsperre** aktiviert nach max. 5 Min. Inaktivität und erfordert Authentifizierung. Shortcut: Win+L (Windows) / Ctrl+Cmd+Q (Mac). Immer beim Verlassen des Platzes.", "**VPN** verschlüsselt den gesamten Netzwerkverkehr. Pflicht bei öffentlichem WLAN, Homeoffice-Zugang zum Firmennetz. Nur firmenseitig bereitgestellte VPN-Dienste nutzen.", "In **öffentlichen WLANs** können Angreifer Daten mitlesen ('Man-in-the-Middle'). VPN aktivieren oder mobiles Netz verwenden für sensitive Aktivitäten.", "**Endpoint Security**: Antivirus, Firewall, Festplattenverschlüsselung (BitLocker/FileVault), regelmäßige Backups, MDM für Firmendaten auf Mobilgeräten."],
  6: ["**Gefährliche Anhänge**: .exe, .bat, .vbs, .js sowie Office-Dokumente mit Makros (.docm, .xlsm). Niemals unerwartete Anhänge öffnen, auch nicht von bekannten Adressen.", "**Link-Prüfung**: Vor dem Klick über Link hovern für echte URL, Ziel-Domain prüfen. Kurz-URLs (bit.ly) können zu beliebigen Zielen führen – im Zweifel nicht klicken.", "**Spam-Filter** erkennen verdächtige Mails automatisch. Trotzdem landen gezielte **Spear-Phishing**-Mails oft im Posteingang. Niemals Absender blind vertrauen – immer die Adresse manuell prüfen.", "**CEO-Fraud (BEC)**: Täter geben sich als CEO oder Lieferant aus und fordern Überweisungen. Regel: Finanzielle Anfragen per E-Mail immer telefonisch verifizieren.", "**E-Mail-Verschlüsselung** mit S/MIME oder PGP stellt sicher, dass nur der Empfänger die Nachricht lesen kann. Signaturen beweisen die Identität des Absenders."],
  7: ["**Cloud-Anbieter** sollten Zertifizierungen (ISO 27001, SOC 2) haben. Für DSGVO-Konformität: Auftragsverarbeitungsvertrag (AVV) abschließen. Nur freigegebene Dienste nutzen.", "**Zugriffsrechte** nach Least Privilege: Jeder erhält nur notwendige Rechte. Regelmäßige Überprüfung und Entzug nicht mehr benötigter Rechte ist essentiell.", "Daten in der Cloud sollten verschlüsselt sein: **In Transit** (TLS) und **at Rest**. Für höchste Sicherheit: Client-seitige Verschlüsselung, bei der nur Sie den Schlüssel haben.", "**3-2-1-Backup-Regel**: 3 Kopien auf 2 verschiedenen Medientypen, davon 1 extern. Backups regelmäßig testen – ein nicht getestetes Backup ist kein Backup.", "Im **Shared Responsibility Model** schützt der Anbieter die Infrastruktur, der Kunde ist für Daten, Anwendungen und Zugriffsrechte selbst verantwortlich."],
  8: ["**App-Berechtigungen** nach Minimum-Prinzip: Taschenlampe braucht keine Kontakte. Einstellungen → Apps → Berechtigungen regelmäßig überprüfen und einschränken.", "**BYOD** (Bring Your Own Device): Klare Richtlinien für Sicherheit, Passwortschutz, verschlüsselter Speicher und MDM-Profil auf privaten Geräten, die geschäftlich genutzt werden.", "**MDM** (Mobile Device Management): Zentrale App-Verwaltung, Richtlinien durchsetzen, Fernlöschung bei Verlust, Verschlüsselung erzwingen auf allen Firmengeräten.", "**Fernlöschung** ('Remote Wipe'): Bei Verlust oder Diebstahl sofort IT informieren. Alle Daten können per MDM remote gelöscht werden. 'Mein Gerät finden' aktivieren.", "**Mobile Malware** über inoffizielle App-Stores, kompromittierte Apps, 'Smishing' (SMS-Phishing), gefälschte WLAN-Hotspots. Nur offizielle Stores nutzen."],
};

function extractConcepts(text: string): string[] {
  const parts = text.split("**");
  const concepts: string[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    if (parts[i].length < 32) concepts.push(parts[i]);
  }
  return concepts.slice(0, 3);
}

function renderBody(text: string) {
  return text.split("**").map((p, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: S.text, fontWeight: 700 }}>{p}</strong>
      : <span key={i}>{p}</span>
  );
}

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
export default function ModuleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const initParam = searchParams.get("topic");
  const initTopic = initParam ? parseInt(initParam) : null;

  const mod = modules.find(m => m.id === parseInt(id));

  const [phase, setPhase]             = useState<Phase>(initTopic !== null ? "content" : "intro");
  const [activeTopic, setActiveTopic] = useState(initTopic !== null ? initTopic : 0);
  const [visitedTopics, setVisitedTopics] = useState<Set<number>>(new Set([initTopic !== null ? initTopic : 0]));
  const [animDir, setAnimDir]         = useState<"right" | "left">("right");
  const [contentKey, setContentKey]   = useState(0);

  const [qi, setQi]           = useState(0);
  const [sel, setSel]         = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showExp, setShowExp] = useState(false);
  const [shakeIdx, setShakeIdx] = useState<number | null>(null);

  if (!mod) return <DashboardLayout><div style={{ textAlign: "center", padding: "4rem", color: S.text2 }}>Modul nicht gefunden.</div></DashboardLayout>;

  const contents = topicContents[mod.id] ?? mod.topics.map(t => `Inhalt zu "${t}"`);
  const q = mod.quizQuestions[qi];
  const score = answers.length ? Math.round((answers.filter(Boolean).length / answers.length) * 100) : 0;

  function goToTopic(i: number) {
    setAnimDir(i >= activeTopic ? "right" : "left");
    setActiveTopic(i);
    setVisitedTopics(v => new Set([...v, i]));
    setContentKey(k => k + 1);
  }

  function confirmAnswer() {
    if (sel === null) return;
    const correct = sel === q.correctIndex;
    setAnswers(a => [...a, correct]);
    setShowExp(true);
    if (!correct) {
      setShakeIdx(sel);
      setTimeout(() => setShakeIdx(null), 500);
    }
  }

  function nextQ() {
    setShowExp(false); setSel(null);
    qi + 1 < mod!.quizQuestions.length ? setQi(qi + 1) : setPhase("complete");
  }

  const topicsVisitedCount = visitedTopics.size;

  /* ── INTRO ── */
  if (phase === "intro") return (
    <DashboardLayout>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Link href="/modules" className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: S.text2, textDecoration: "none", fontSize: "0.82rem", marginBottom: "1.5rem" }}>
          <ArrowLeft size={14} /> Alle Module
        </Link>

        <div className="fade-up-1" style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, overflow: "hidden" }}>
          <div style={{
            height: 160,
            background: mod.category === "Pflicht"
              ? "linear-gradient(135deg, rgba(15,118,110,0.06), rgba(15,118,110,0.12))"
              : mod.category === "Kritisch"
              ? "linear-gradient(135deg, rgba(220,38,38,0.04), rgba(220,38,38,0.08))"
              : "linear-gradient(135deg, rgba(217,119,6,0.04), rgba(217,119,6,0.08))",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 80, height: 80, background: "#FFFFFF", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
              {mod.icon}
            </div>
          </div>
          <div style={{ padding: "2rem" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: 10, background: mod.category === "Pflicht" ? "rgba(15,118,110,0.1)" : "rgba(220,38,38,0.08)", color: mod.category === "Pflicht" ? "var(--accent-text)" : "#DC2626" }}>{mod.category}</span>
              <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: 10, background: S.surface2, color: S.text2 }}>{mod.difficulty}</span>
            </div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>{mod.title}</h1>
            <p style={{ color: S.text2, lineHeight: 1.65, marginBottom: "1.5rem" }}>{mod.description}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.75rem" }}>
              <div style={{ background: S.surface2, borderRadius: 14, padding: "1rem" }}>
                <div className="label" style={{ marginBottom: 10 }}>Themen</div>
                {mod.topics.map((t, i) => (
                  <div key={t} style={{ fontSize: "0.78rem", color: S.text2, marginBottom: 5, display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: "0.6rem", color: S.accentText, fontWeight: 700 }}>{i + 1}</span>{t}
                  </div>
                ))}
              </div>
              <div style={{ background: S.surface2, borderRadius: 14, padding: "1rem" }}>
                {[["Dauer", mod.duration], ["Level", mod.difficulty], ["Kategorie", mod.category], ["Wissenscheck", `${mod.quizQuestions.length} Fragen`]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
                    <span style={{ fontSize: "0.72rem", color: S.text2 }}>{k}</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                {mod.id === 1 && (
                  <div style={{ marginTop: 10, padding: "0.5rem 0.75rem", background: "rgba(96,165,250,0.08)", borderRadius: 8, fontSize: "0.68rem", color: "var(--accent-text)" }}>
                    🔗 Enthält interaktive URL-Demo
                  </div>
                )}
                {mod.id === 2 && (
                  <div style={{ marginTop: 10, padding: "0.5rem 0.75rem", background: "rgba(255,69,69,0.08)", borderRadius: 8, fontSize: "0.68rem", color: "#FF8080" }}>
                    🎣 Enthält interaktive Phishing-Demo
                  </div>
                )}
                {mod.id === 3 && (
                  <div style={{ marginTop: 10, padding: "0.5rem 0.75rem", background: S.accentDim, borderRadius: 8, fontSize: "0.68rem", color: S.accentText }}>
                    🔑 Enthält Passwort-Stärke-Demo
                  </div>
                )}
                {mod.id === 4 && (
                  <div style={{ marginTop: 10, padding: "0.5rem 0.75rem", background: "rgba(167,139,250,0.08)", borderRadius: 8, fontSize: "0.68rem", color: "#A78BFA" }}>
                    🍪 Enthält Cookie-Consent-Demo
                  </div>
                )}
                {mod.id === 6 && (
                  <div style={{ marginTop: 10, padding: "0.5rem 0.75rem", background: "rgba(245,158,11,0.08)", borderRadius: 8, fontSize: "0.68rem", color: S.amber }}>
                    💬 Enthält CEO-Fraud-Demo
                  </div>
                )}
              </div>
            </div>

            <button onClick={() => { setPhase("content"); setVisitedTopics(new Set([0])); }} style={{ width: "100%", padding: "0.9rem", background: S.accent, color: "#fff", fontWeight: 700, fontSize: "0.9rem", border: "none", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "opacity 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Modul starten <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );

  /* ── CONTENT ── */
  if (phase === "content") return (
    <DashboardLayout>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <Link href="/modules" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: S.text2, textDecoration: "none", fontSize: "0.82rem", marginBottom: "1.25rem" }}>
          <ArrowLeft size={14} /> Alle Module
        </Link>

        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: S.text2, marginBottom: 8, fontWeight: 600 }}>
            <span>{topicsVisitedCount}/{mod.topics.length} Themen erkundet</span>
            <span style={{ color: "var(--accent-text)" }}>{mod.title}</span>
          </div>
          <div style={{ height: 4, background: S.surface2, borderRadius: 10 }}>
            <div className="progress-fill" style={{ height: "100%", borderRadius: 10, background: "var(--accent)", width: `${(topicsVisitedCount / mod.topics.length) * 100}%` }} />
          </div>
        </div>

        {/* Tab bar - No Borders, Floating style */}
        <div style={{ display: "flex", gap: 10, marginBottom: "2rem", overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
          {mod.topics.map((t, i) => {
            const isActive = activeTopic === i;
            const visited = visitedTopics.has(i);
            return (
              <button key={t} onClick={() => goToTopic(i)} style={{
                padding: "0.7rem 1.2rem",
                borderRadius: 16,
                fontSize: "0.8rem",
                fontWeight: isActive ? 600 : 500,
                border: "none",
                background: isActive ? S.surface : "transparent",
                color: isActive ? "var(--accent-text)" : visited ? S.text : S.text2,
                cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", gap: 8,
                transition: "all 0.2s ease",
                boxShadow: isActive ? "0 4px 16px rgba(0,0,0,0.06)" : "none",
              }}>
                <span style={{ 
                  width: 22, height: 22, borderRadius: "50%", 
                  background: isActive ? "var(--accent)" : visited ? "rgba(15,118,110,0.1)" : S.surface2, 
                  color: isActive ? "#fff" : visited ? "var(--accent-text)" : S.text3, 
                  display: "flex", alignItems: "center", justifyContent: "center", 
                  fontSize: "0.6rem", fontWeight: 800 
                }}>{visited && !isActive ? "✓" : i + 1}</span>
                {t}
              </button>
            );
          })}
        </div>

        {/* Content card - Clean, single container */}
        <div style={{
          background: S.surface,
          borderRadius: 24,
          boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}>
          <div style={{ padding: "2.5rem" }}>
            <div key={`${mod.id}-${contentKey}`} className="fade-up">
              <div className="label" style={{ marginBottom: "0.75rem", fontSize: "0.68rem" }}>Thema {activeTopic + 1} von {mod.topics.length}</div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>{mod.topics[activeTopic]}</h2>

              {/* Concept chips */}
              {(() => {
                const concepts = extractConcepts(contents[activeTopic] ?? "");
                if (!concepts.length) return null;
                return (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "1.5rem" }}>
                    {concepts.map(c => (
                      <span key={c} style={{ fontSize: "0.72rem", fontWeight: 700, padding: "0.3rem 0.8rem", borderRadius: 12, background: "rgba(15,118,110,0.06)", color: "var(--accent-text)", border: `1px solid rgba(15,118,110,0.12)` }}>{c}</span>
                    ))}
                  </div>
                );
              })()}

              <div style={{ fontSize: "0.95rem", color: S.text2, lineHeight: 1.85, marginBottom: "2rem" }}>
                {renderBody(contents[activeTopic] ?? "")}
              </div>

              {/* Interactive demos */}
              {mod.id === 1 && activeTopic === 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div className="label" style={{ marginBottom: "0.9rem" }}>Interaktive Demo — URL-Anatomie</div>
                  <URLAnatomyDemo />
                </div>
              )}
              {mod.id === 2 && activeTopic === 1 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div className="label" style={{ marginBottom: "0.9rem" }}>Interaktive Demo — Phishing-Mail</div>
                  <PhishingEmailDemo />
                </div>
              )}
              {mod.id === 3 && activeTopic === 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div className="label" style={{ marginBottom: "0.9rem" }}>Interaktive Demo — Passwort-Stärke</div>
                  <PasswordStrengthDemo />
                </div>
              )}
              {mod.id === 4 && activeTopic === 1 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div className="label" style={{ marginBottom: "0.9rem" }}>Interaktive Demo — Cookie-Consent</div>
                  <CookieConsentDemo />
                </div>
              )}
              {mod.id === 6 && activeTopic === 3 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div className="label" style={{ marginBottom: "0.9rem" }}>Interaktive Demo — CEO-Fraud-Chat</div>
                  <CEOFraudChatDemo />
                </div>
              )}

              {/* Key takeaway */}
              <div style={{ background: "rgba(15,118,110,0.04)", border: "1px solid rgba(15,118,110,0.1)", borderRadius: 12, padding: "0.85rem 1rem", display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>💡</span>
                <span style={{ fontSize: "0.8rem", color: "var(--accent-text)", lineHeight: 1.5, fontWeight: 500 }}>
                  {activeTopic < mod.topics.length - 1
                    ? `Weiter mit: ${mod.topics[activeTopic + 1]}`
                    : "Alle Themen erkundet! Bereit für den Wissenscheck?"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => activeTopic > 0 ? goToTopic(activeTopic - 1) : setPhase("intro")}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.75rem 1.5rem", background: S.surface, border: "none", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", borderRadius: 12, color: S.text2, fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>
            <ArrowLeft size={14} /> Zurück
          </button>
          <div style={{ display: "flex", gap: 8 }}>
            {activeTopic < mod.topics.length - 1 ? (
              <button onClick={() => goToTopic(activeTopic + 1)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.75rem 1.7rem", background: "var(--accent)", color: "#fff", fontWeight: 700, fontSize: "0.85rem", border: "none", borderRadius: 12, cursor: "pointer", boxShadow: "0 4px 14px rgba(15,118,110,0.3)", transition: "all 0.15s" }}>
                Weiter <ArrowRight size={14} />
              </button>
            ) : (
              <button onClick={() => setPhase("quiz")}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.75rem 1.7rem", background: "var(--accent)", color: "#fff", fontWeight: 700, fontSize: "0.85rem", border: "none", borderRadius: 12, cursor: "pointer", boxShadow: "0 4px 14px rgba(15,118,110,0.3)" }}
                className="glow-accent">
                Zum Wissenscheck <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        {topicsVisitedCount < mod.topics.length && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button onClick={() => setPhase("quiz")} style={{ background: "none", border: "none", color: S.text3, fontSize: "0.75rem", cursor: "pointer", textDecoration: "underline" }}>
              Themen überspringen & direkt zum Wissenscheck
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );

  /* ── QUIZ ── */
  if (phase === "quiz") return (
    <DashboardLayout>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Link href="/modules" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: S.text2, textDecoration: "none", fontSize: "0.82rem", marginBottom: "1.5rem" }}>
          <ArrowLeft size={14} /> Alle Module
        </Link>

        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: S.text2, marginBottom: 8, fontWeight: 600 }}>
            <span>Frage {qi + 1} von {mod.quizQuestions.length}</span>
            <span style={{ color: "var(--accent-text)" }}>Wissenscheck</span>
          </div>
          <div style={{ height: 4, background: S.surface2, borderRadius: 10 }}>
            <div className="progress-fill" style={{ height: "100%", borderRadius: 10, background: "var(--accent)", width: `${((qi) / mod.quizQuestions.length) * 100}%` }} />
          </div>
        </div>

        <div className="fade-up" style={{ background: S.surface, borderRadius: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.04)", overflow: "hidden" }}>
          <div style={{ padding: "2.5rem" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: "2rem" }}>
              {mod.quizQuestions.map((_, i) => (
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 10, transition: "background 0.3s",
                  background: i < answers.length ? (answers[i] ? S.green : S.red) : i === qi ? "rgba(15,118,110,0.3)" : S.surface2 }} />
              ))}
            </div>

            <span style={{ display: "inline-block", fontSize: "0.68rem", fontWeight: 700, padding: "0.3rem 0.8rem", borderRadius: 12, marginBottom: "1.25rem",
              background: q.type === "scenario" ? "rgba(139,92,246,0.15)" : "rgba(15,118,110,0.1)",
              color: q.type === "scenario" ? "#8B5CF6" : "var(--accent-text)",
            }}>
              {q.type === "scenario" ? "Szenario" : "Multiple Choice"}
            </span>

            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.5, marginBottom: "2rem" }}>{q.question}</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "2rem" }}>
              {q.options.map((opt, i) => {
                let bg: string = "var(--surface)", borderCol: string = `1px solid ${S.border}`, color: string = S.text2, shadow = "0 2px 8px rgba(0,0,0,0.02)";
                if (!showExp && sel === i) { bg = "rgba(15,118,110,0.04)"; borderCol = "2px solid var(--accent)"; color = "var(--text)"; shadow = "0 4px 16px rgba(15,118,110,0.1)"; }
                if (showExp) {
                  if (i === q.correctIndex) { bg = "rgba(0,217,126,0.06)"; borderCol = "2px solid #00D97E"; color = S.green; shadow = "0 4px 16px rgba(0,217,126,0.1)"; }
                  else if (i === sel && i !== q.correctIndex) { bg = "rgba(255,69,69,0.04)"; borderCol = "2px solid #FF4545"; color = S.red; shadow = "none"; }
                  else { color = S.text3; borderCol = `1px solid ${S.border}`; shadow = "none"; }
                }

                // compensate for 2px border width during hover/selection
                const paddingComp = (!showExp && sel === i) || (showExp && (i === q.correctIndex || (i === sel && i !== q.correctIndex))) ? "0.8rem 0.95rem" : "0.85rem 1rem";

                return (
                  <button key={i} onClick={() => !showExp && setSel(i)}
                    className={shakeIdx === i ? "shake" : showExp && i === q.correctIndex ? "pop" : ""}
                    style={{ width: "100%", textAlign: "left", padding: paddingComp, borderRadius: 16, border: borderCol, background: bg, color, fontSize: "0.9rem", boxShadow: shadow, cursor: showExp ? "default" : "pointer", display: "flex", gap: 14, alignItems: "flex-start", transition: "all 0.15s" }}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--surface-2)", color: "var(--text-3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, flexShrink: 0, marginTop: 1, transition: "border-color 0.15s", ...(showExp && i === q.correctIndex ? {background: S.green, color: "#fff"} : showExp && i === sel ? {background: S.red, color: "#fff"} : !showExp && sel === i ? {background: "var(--accent)", color: "#fff"} : {}) }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span style={{ flex: 1, lineHeight: 1.5, fontWeight: (!showExp && sel === i) || (showExp && i === q.correctIndex) || (showExp && i === sel) ? 600 : 400 }}>{opt}</span>
                    {showExp && i === q.correctIndex && <CheckCircle size={18} color={S.green} style={{ flexShrink: 0, marginTop: 4 }} />}
                    {showExp && i === sel && i !== q.correctIndex && <XCircle size={18} color={S.red} style={{ flexShrink: 0, marginTop: 4 }} />}
                  </button>
                );
              })}
            </div>

            {showExp && (
              <div className="fade-up" style={{
                background: answers[answers.length - 1] ? "rgba(0,217,126,0.06)" : "rgba(255,69,69,0.06)",
                border: "none",
                borderRadius: 16, padding: "1.25rem", marginBottom: "1.5rem", fontSize: "0.85rem",
                color: answers[answers.length - 1] ? S.green : "#DC2626", lineHeight: 1.6,
              }}>
                <span style={{ fontWeight: 700 }}>{answers[answers.length - 1] ? "✓ Richtig! " : "✗ Falsch — "}</span>
                {q.explanation}
              </div>
            )}

            {!showExp ? (
              <button onClick={confirmAnswer} disabled={sel === null}
                style={{ width: "100%", padding: "0.9rem", background: sel !== null ? "var(--accent)" : "var(--surface-2)", color: sel !== null ? "#fff" : S.text3, fontWeight: 700, fontSize: "0.9rem", border: "none", borderRadius: 12, cursor: sel !== null ? "pointer" : "default", transition: "all 0.15s", boxShadow: sel !== null ? "0 4px 14px rgba(15,118,110,0.3)" : "none" }}>
                Antwort bestätigen
              </button>
            ) : (
              <button onClick={nextQ}
                style={{ width: "100%", padding: "0.9rem", background: "var(--accent)", color: "#fff", fontWeight: 700, fontSize: "0.9rem", border: "none", borderRadius: 12, cursor: "pointer", boxShadow: "0 4px 14px rgba(15,118,110,0.3)" }}>
                {qi + 1 < mod.quizQuestions.length ? "Nächste Frage →" : "Ergebnis anzeigen →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );

  /* ── COMPLETE ── */
  const passed = score >= 70;
  return (
    <DashboardLayout>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div className="scale-in" style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, padding: "2.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{passed ? "🎉" : "📚"}</div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            {passed ? "Modul abgeschlossen!" : "Fast geschafft!"}
          </h1>
          <p style={{ color: S.text2, marginBottom: "1.5rem" }}>
            {passed ? `Ausgezeichnet! Sie haben ${score}% erreicht.` : `${score}% — noch ein bisschen Übung, dann klappt's!`}
          </p>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.75rem 1.5rem", borderRadius: 10, marginBottom: "2rem",
            background: passed ? "rgba(0,217,126,0.08)" : "rgba(255,69,69,0.08)",
            border: `1px solid ${passed ? "rgba(0,217,126,0.25)" : "rgba(255,69,69,0.25)"}` }}>
            <span style={{ fontSize: "1.4rem", fontWeight: 900, color: passed ? S.green : S.red }}>{score}%</span>
            <span style={{ fontSize: "0.78rem", color: S.text2 }}>{answers.filter(Boolean).length}/{answers.length} richtig</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link href="/modules" style={{ display: "block", padding: "0.75rem", background: S.accent, color: "#fff", fontWeight: 700, fontSize: "0.85rem", borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
              Zurück zur Übersicht
            </Link>
            <button onClick={() => { setPhase("content"); setActiveTopic(0); setVisitedTopics(new Set([0])); setQi(0); setSel(null); setAnswers([]); setShowExp(false); setContentKey(k => k + 1); }}
              style={{ padding: "0.75rem", background: "transparent", border: `1px solid ${S.border}`, color: S.text2, fontWeight: 600, fontSize: "0.85rem", borderRadius: 10, cursor: "pointer" }}>
              Modul wiederholen
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
