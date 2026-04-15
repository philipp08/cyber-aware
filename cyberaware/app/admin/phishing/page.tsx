"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { phishingCampaigns } from "@/lib/data";
import { Plus, Play, CheckCircle } from "lucide-react";
import { S } from "@/lib/theme";

const templates = [
  { id: "it-support", name: "IT-Support Passwort-Reset", preview: "Ihr Passwort muss aus Sicherheitsgründen zurückgesetzt werden...", risk: "Mittel", category: "Credential Harvesting" },
  { id: "ceo-fraud", name: "CEO-Anfrage Überweisung", preview: "Hallo, ich brauche dringend Ihre Hilfe bei einer vertraulichen Überweisung...", risk: "Hoch", category: "CEO-Fraud / BEC" },
  { id: "delivery", name: "Paketdienst Lieferung", preview: "Ihr Paket konnte nicht zugestellt werden. Klicken Sie hier...", risk: "Niedrig", category: "Phishing" },
  { id: "microsoft", name: "Microsoft 365 Login", preview: "Ihr Konto wurde gesperrt. Melden Sie sich an um es zu entsperren...", risk: "Hoch", category: "Credential Harvesting" },
  { id: "hr-benefits", name: "HR Gehaltsabrechnung", preview: "Ihre Gehaltsabrechnung für Dezember ist verfügbar...", risk: "Mittel", category: "Spear Phishing" },
];

const riskColor = (r: string) => r === "Hoch" ? S.red : r === "Mittel" ? S.amber : S.green;

export default function PhishingPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [launched, setLaunched] = useState(false);

  function handleLaunch() {
    setLaunched(true);
    setTimeout(() => { setLaunched(false); setShowCreate(false); setStep(1); setSelectedTemplate(null); }, 2500);
  }

  return (
    <DashboardLayout isAdmin userName="Admin Müller" userInitials="AM" userRole="Unternehmens-Admin">
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div>
            <p style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Sicherheit</p>
            <h1 style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em" }}>Phishing-Simulationen</h1>
          </div>
          <button onClick={() => setShowCreate(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.65rem 1.25rem", background: S.accent, border: "none", borderRadius: 100, color: "#fff", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>
            <Plus size={14} /> Neue Kampagne
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Ø Klickrate", value: "18%", sub: "über alle Kampagnen", trend: "−8% vs. Vorquartal" },
            { label: "Erkennungsrate", value: "67%", sub: "haben gemeldet", trend: "+12% vs. Vorquartal" },
            { label: "Gesendete Tests", value: "96", sub: "an 48 Mitarbeiter", trend: "2 Kampagnen" },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 18, padding: "1.25rem" }}>
              <div style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-2)", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: "0.68rem", color: S.green }}>{s.trend}</div>
            </div>
          ))}
        </div>

        {/* Info note */}
        <div style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-dim2)", borderRadius: 16, padding: "1rem 1.25rem", marginBottom: 16, fontSize: "0.78rem", color: "var(--text-2)", lineHeight: 1.6 }}>
          💡 Klickt ein Mitarbeiter auf einen Phishing-Link, wird er automatisch zum Schulungsmodul weitergeleitet. Ergebnisse werden anonymisiert erfasst. Alle Tests entsprechen dem Betriebsverfassungsgesetz.
        </div>

        {/* Campaigns */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {phishingCampaigns.map(c => {
            const clickRate = c.sentTo > 0 ? Math.round((c.clicked / c.sentTo) * 100) : 0;
            const reportRate = c.sentTo > 0 ? Math.round((c.reported / c.sentTo) * 100) : 0;

            return (
              <div key={c.id} style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 18, padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: c.status !== "draft" ? "1.25rem" : 0 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: "0.92rem", fontWeight: 600 }}>{c.name}</span>
                      <span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: 100,
                        background: c.status === "completed" ? "var(--green-dim2)" : c.status === "running" ? "var(--accent-dim2)" : "var(--border)",
                        color: c.status === "completed" ? S.green : c.status === "running" ? "var(--accent-text)" : "var(--text-2)",
                      }}>
                        {c.status === "completed" ? "Abgeschlossen" : c.status === "running" ? "Läuft" : "Entwurf"}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-2)" }}>Template: {c.template} · {new Date(c.createdAt).toLocaleDateString("de-DE")}</div>
                  </div>
                  {c.status === "draft" ? (
                    <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.45rem 1rem", background: S.accent, border: "none", borderRadius: 100, color: "#fff", fontWeight: 700, fontSize: "0.75rem", cursor: "pointer" }}>
                      <Play size={11} /> Starten
                    </button>
                  ) : (
                    <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.45rem 1rem", background: "transparent", border: `1px solid ${S.border}`, borderRadius: 100, color: "var(--text-2)", fontSize: "0.75rem", cursor: "pointer" }}>
                      Details
                    </button>
                  )}
                </div>

                {c.status !== "draft" && (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: "1rem" }}>
                      {[
                        { label: "Empfänger", value: c.sentTo, color: "var(--text)" },
                        { label: `Klicks (${clickRate}%)`, value: c.clicked, color: c.clicked > 0 ? S.red : S.green },
                        { label: `Gemeldet (${reportRate}%)`, value: c.reported, color: S.green },
                        { label: "Ignoriert", value: c.sentTo - c.clicked - c.reported, color: "var(--text-2)" },
                      ].map(stat => (
                        <div key={stat.label} style={{ background: "var(--surface-2)", borderRadius: 12, padding: "0.75rem", textAlign: "center" }}>
                          <div style={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.03em", color: stat.color }}>{stat.value}</div>
                          <div style={{ fontSize: "0.65rem", color: "var(--text-2)", marginTop: 2 }}>{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ height: 5, background: "var(--surface-2)", borderRadius: 100, overflow: "hidden", display: "flex" }}>
                      <div style={{ width: `${reportRate}%`, background: S.green, transition: "width 0.5s" }} />
                      <div style={{ width: `${clickRate}%`, background: S.red, transition: "width 0.5s" }} />
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 6, fontSize: "0.65rem", color: "var(--text-2)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: S.green, display: "inline-block" }} />Gemeldet</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: S.red, display: "inline-block" }} />Geklickt</span>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "1rem" }}>
          <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 16, width: "100%", maxWidth: 600, maxHeight: "90vh", overflow: "auto" }}>
            {/* Modal header */}
            <div style={{ padding: "1.5rem", borderBottom: `1px solid ${S.border}` }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>Neue Phishing-Kampagne</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {[1, 2, 3].map(s => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, background: s < step ? S.green : s === step ? S.accent : "var(--surface-2)", color: s <= step ? "#fff" : "var(--text-2)" }}>
                      {s < step ? "✓" : s}
                    </div>
                    <span style={{ fontSize: "0.72rem", color: s === step ? "var(--text)" : "var(--text-2)", fontWeight: s === step ? 600 : 400 }}>
                      {s === 1 ? "Template" : s === 2 ? "Zielgruppe" : "Starten"}
                    </span>
                    {s < 3 && <div style={{ width: 20, height: 1, background: S.border }} />}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "1.5rem" }}>
              {/* Step 1: Templates */}
              {step === 1 && (
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-2)", marginBottom: "1rem" }}>E-Mail-Template wählen</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {templates.map(t => (
                      <button key={t.id} onClick={() => setSelectedTemplate(t.id)} style={{ textAlign: "left", padding: "1rem", borderRadius: 14, border: `1px solid ${selectedTemplate === t.id ? "rgba(204,255,0,0.4)" : S.border}`, background: selectedTemplate === t.id ? "var(--accent-dim)" : "var(--surface-2)", cursor: "pointer" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{t.name}</div>
                            <div style={{ fontSize: "0.72rem", color: "var(--text-2)", marginBottom: 6 }}>{t.preview}</div>
                            <div style={{ display: "flex", gap: 8 }}>
                              <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: 100, background: "var(--border)", color: riskColor(t.risk) }}>Risiko: {t.risk}</span>
                              <span style={{ fontSize: "0.65rem", color: "var(--text-2)" }}>{t.category}</span>
                            </div>
                          </div>
                          {selectedTemplate === t.id && <CheckCircle size={16} color={S.accent} style={{ flexShrink: 0 }} />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Target */}
              {step === 2 && (
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-2)", marginBottom: "1rem" }}>Zielgruppe definieren</div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-2)", display: "block", marginBottom: 8 }}>Abteilungen</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {["IT", "Finance", "HR", "Marketing", "Sales", "Operations", "Legal", "Alle"].map(d => (
                        <button key={d} style={{ padding: "0.3rem 0.85rem", borderRadius: 100, fontSize: "0.75rem", cursor: "pointer", background: d === "Alle" ? S.accent : "transparent", color: d === "Alle" ? "#fff" : "var(--text-2)", border: d === "Alle" ? "none" : `1px solid ${S.border}` }}>{d}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-2)", display: "block", marginBottom: 6 }}>Kampagnenname</label>
                    <input type="text" placeholder="z.B. Q2 2024 – IT-Support Test" style={{ width: "100%", background: "var(--surface-2)", border: `1px solid ${S.border}`, borderRadius: 12, padding: "0.65rem 1rem", fontSize: "0.85rem", color: "var(--text)", outline: "none" }} />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-2)", display: "block", marginBottom: 6 }}>Versandzeitpunkt</label>
                    <input type="datetime-local" defaultValue="2024-02-01T09:00" style={{ width: "100%", background: "var(--surface-2)", border: `1px solid ${S.border}`, borderRadius: 12, padding: "0.65rem 1rem", fontSize: "0.85rem", color: "var(--text)", outline: "none" }} />
                  </div>
                  <div style={{ background: "var(--amber-dim)", border: "1px solid var(--amber-dim2)", borderRadius: 12, padding: "0.85rem", fontSize: "0.75rem", color: S.amber }}>
                    ⚠️ Stellen Sie sicher, dass Ihr Betriebsrat über Phishing-Simulationen informiert ist.
                  </div>
                </div>
              )}

              {/* Step 3: Summary */}
              {step === 3 && !launched && (
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-2)", marginBottom: "1rem" }}>Zusammenfassung</div>
                  <div style={{ background: "var(--surface-2)", borderRadius: 14, padding: "1.25rem", marginBottom: "1rem" }}>
                    {[
                      ["Template", templates.find(t => t.id === selectedTemplate)?.name || "—"],
                      ["Zielgruppe", "Alle Mitarbeiter (48)"],
                      ["Versandzeitpunkt", "01.02.2024 09:00 Uhr"],
                      ["Anonymisierung", "✓ Aktiviert"],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: `1px solid ${S.border}` }}>
                        <span style={{ fontSize: "0.78rem", color: "var(--text-2)" }}>{k}</span>
                        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: k === "Anonymisierung" ? S.green : "var(--text)" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-dim2)", borderRadius: 12, padding: "0.85rem", fontSize: "0.75rem", color: "var(--text-2)" }}>
                    Nach dem Start werden Mitarbeiter, die auf den Link klicken, automatisch zum Schulungsmodul "Phishing erkennen" weitergeleitet.
                  </div>
                </div>
              )}

              {launched && (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🚀</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 4 }}>Kampagne gestartet!</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-2)" }}>E-Mails werden am 01.02.2024 um 09:00 Uhr versendet</div>
                </div>
              )}
            </div>

            {!launched && (
              <div style={{ padding: "1rem 1.5rem", borderTop: `1px solid ${S.border}`, display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => step > 1 ? setStep(step - 1) : setShowCreate(false)} style={{ padding: "0.6rem 1.25rem", background: "transparent", border: `1px solid ${S.border}`, borderRadius: 100, color: "var(--text-2)", fontSize: "0.82rem", cursor: "pointer" }}>
                  {step === 1 ? "Abbrechen" : "Zurück"}
                </button>
                <button onClick={() => step < 3 ? setStep(step + 1) : handleLaunch()} disabled={step === 1 && !selectedTemplate}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.6rem 1.5rem", background: step === 1 && !selectedTemplate ? "var(--surface-2)" : S.accent, border: "none", borderRadius: 100, color: step === 1 && !selectedTemplate ? "var(--text-2)" : "#fff", fontWeight: 700, fontSize: "0.82rem", cursor: step === 1 && !selectedTemplate ? "not-allowed" : "pointer" }}>
                  {step < 3 ? "Weiter" : <><Play size={12} /> Kampagne starten</>}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
