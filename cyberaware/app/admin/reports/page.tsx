"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { companyEmployees, phishingCampaigns } from "@/lib/data";
import { Download, CheckCircle } from "lucide-react";

const S = { accent: "#CCFF00", text: "#F5F5F7", text2: "#88888E", text3: "#44444C", border: "rgba(255,255,255,0.06)", surface: "#131316", surface2: "#1A1A1E", bg: "#0C0C0F", green: "#00D97E", red: "#FF4545", amber: "#F59E0B" };

const reportTypes = [
  { id: "iso27001", name: "ISO-27001-Compliance-Report", desc: "Detaillierter Bericht für ISO-27001-Audits. Enthält Schulungsstand aller Mitarbeiter, Phishing-Ergebnisse und Zertifikatsstatus.", standard: "ISO 27001:2022 · A.6.3", pages: "12 Seiten", emoji: "🛡️" },
  { id: "bsi", name: "BSI-Grundschutz-Bericht", desc: "Maßnahmennachweis für BSI IT-Grundschutz ORP.3: Sensibilisierung und Schulung zur Informationssicherheit.", standard: "BSI Grundschutz · ORP.3", pages: "8 Seiten", emoji: "🏛️" },
  { id: "dsgvo", name: "DSGVO-Schulungsnachweis", desc: "Nachweis der DSGVO-Schulungen gemäß Art. 39 Abs. 1b. Kann im Rahmen von Datenschutzprüfungen vorgelegt werden.", standard: "DSGVO Art. 39 · BDSG", pages: "6 Seiten", emoji: "📋" },
  { id: "executive", name: "Management-Summary", desc: "Kompakter Bericht für die Geschäftsführung mit Kern-KPIs, Trends und Handlungsempfehlungen.", standard: "Management Report", pages: "3 Seiten", emoji: "📊" },
];

const scheduledReports = [
  { label: "Monatlicher Status-Report", schedule: "Jeden 1. des Monats", enabled: true },
  { label: "Quartals-Compliance-Report (ISO-27001)", schedule: "Jedes Quartal", enabled: true },
  { label: "Zertifikatsablauf-Erinnerungen", schedule: "30 und 7 Tage vor Ablauf", enabled: true },
  { label: "Phishing-Kampagnen-Bericht", schedule: "Nach Abschluss jeder Kampagne", enabled: false },
];

export default function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [generated, setGenerated] = useState<string[]>([]);
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(scheduledReports.map(s => [s.label, s.enabled]))
  );

  function handleGenerate(id: string) {
    setGenerating(id);
    setTimeout(() => { setGenerating(null); setGenerated(prev => [...prev, id]); }, 2000);
  }

  const certified = companyEmployees.filter(e => e.certLevel).length;
  const total = companyEmployees.length;
  const completionRate = Math.round(companyEmployees.reduce((s, e) => s + e.completedModules / e.totalModules, 0) / total * 100);
  const phishingRate = Math.round(
    phishingCampaigns.filter(c => c.status !== "draft").reduce((s, c) => s + c.clicked, 0) /
    phishingCampaigns.filter(c => c.status !== "draft").reduce((s, c) => s + c.sentTo, 0) * 100
  );

  const complianceItems = [
    { standard: "ISO 27001:2022", control: "A.6.3 – Security Awareness", ok: completionRate >= 80, detail: `${completionRate}% Abschlussquote (Ziel: ≥80%)` },
    { standard: "BSI Grundschutz", control: "ORP.3 – Sensibilisierung", ok: certified >= total * 0.7, detail: `${certified}/${total} Mitarbeiter zertifiziert` },
    { standard: "DSGVO Art. 39", control: "Schulungspflicht", ok: true, detail: "DSGVO-Modul abgeschlossen" },
    { standard: "Phishing-Resilienz", control: "Ziel: Klickrate <10%", ok: phishingRate < 10, detail: `Aktuelle Klickrate: ${phishingRate}%` },
  ];

  return (
    <DashboardLayout isAdmin userName="Admin Müller" userInitials="AM" userRole="Unternehmens-Admin">
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "0.7rem", color: S.text2, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Compliance</p>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Compliance-Berichte</h1>
        </div>

        {/* Status overview */}
        <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 18, padding: "1.5rem", marginBottom: 16 }}>
          <div style={{ fontSize: "0.7rem", color: S.text2, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.25rem" }}>Aktueller Schulungsstand</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {[
              { label: "Mitarbeiter", value: total },
              { label: "Zertifiziert", value: `${certified} (${Math.round(certified/total*100)}%)` },
              { label: "Abschlussquote", value: `${completionRate}%` },
              { label: "Phishing-Klickrate", value: `${phishingRate}%` },
            ].map(s => (
              <div key={s.label} style={{ background: S.surface2, borderRadius: 14, padding: "1rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: "0.68rem", color: S.text2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance status grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {complianceItems.map(item => (
            <div key={item.standard} style={{ background: item.ok ? "rgba(0,217,126,0.06)" : "rgba(245,158,11,0.06)", border: `1px solid ${item.ok ? "rgba(0,217,126,0.2)" : "rgba(245,158,11,0.2)"}`, borderRadius: 16, padding: "1.25rem", display: "flex", gap: 12 }}>
              <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: 1 }}>{item.ok ? "✅" : "⚠️"}</span>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: 2 }}>{item.standard}</div>
                <div style={{ fontSize: "0.72rem", color: S.text2, marginBottom: 4 }}>{item.control}</div>
                <div style={{ fontSize: "0.72rem", fontWeight: 600, color: item.ok ? S.green : S.amber }}>{item.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Report generation */}
        <div style={{ fontSize: "0.7rem", color: S.text2, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Reports generieren</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {reportTypes.map(report => {
            const isGenerating = generating === report.id;
            const isDone = generated.includes(report.id);

            return (
              <div key={report.id} style={{ background: S.surface, border: `1px solid ${isDone ? "rgba(0,217,126,0.2)" : S.border}`, borderRadius: 18, padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.8rem" }}>{report.emoji}</span>
                  <div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, marginBottom: 4 }}>{report.name}</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: "0.65rem", padding: "0.15rem 0.5rem", borderRadius: 100, background: S.surface2, color: S.text2 }}>{report.standard}</span>
                      <span style={{ fontSize: "0.65rem", color: S.text3 }}>{report.pages}</span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: "0.75rem", color: S.text2, lineHeight: 1.65, marginBottom: "1.25rem" }}>{report.desc}</p>
                <div style={{ background: S.surface2, borderRadius: 10, padding: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{ fontSize: "0.65rem", color: S.text3, marginBottom: 6 }}>Berichtsinhalt:</div>
                  {["Schulungsstand aller Mitarbeiter", "Zertifikatsstatus & Ablaufdaten", report.id !== "executive" ? "Phishing-Simulationsergebnisse" : "Executive-KPIs & Trends", "Handlungsempfehlungen"].map(item => (
                    <div key={item} style={{ display: "flex", gap: 6, fontSize: "0.68rem", color: S.text2, marginBottom: 3 }}>
                      <span style={{ color: S.text3 }}>·</span>{item}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.68rem", color: S.text3 }}>Stichtag: {new Date().toLocaleDateString("de-DE")}</span>
                  <button onClick={() => !isDone && handleGenerate(report.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 1rem", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700, border: "none", cursor: isDone ? "default" : "pointer",
                    background: isDone ? "rgba(0,217,126,0.12)" : isGenerating ? S.surface2 : S.accent,
                    color: isDone ? S.green : isGenerating ? S.text2 : S.bg,
                  }}>
                    {isGenerating ? (
                      <><div style={{ width: 10, height: 10, borderRadius: "50%", border: `1.5px solid ${S.text3}`, borderTopColor: "transparent", animation: "spin 0.7s linear infinite" }} /> Generiere...</>
                    ) : isDone ? (
                      <><CheckCircle size={12} /> PDF herunterladen</>
                    ) : (
                      <><Download size={12} /> PDF erstellen</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scheduled reports */}
        <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 18, padding: "1.5rem" }}>
          <div style={{ fontSize: "0.7rem", color: S.text2, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.25rem" }}>📬 Automatische Berichte</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {scheduledReports.map(sched => (
              <div key={sched.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1rem", background: S.surface2, borderRadius: 12 }}>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 500, marginBottom: 2 }}>{sched.label}</div>
                  <div style={{ fontSize: "0.68rem", color: S.text2 }}>{sched.schedule}</div>
                </div>
                {/* Toggle */}
                <div onClick={() => setToggles(t => ({ ...t, [sched.label]: !t[sched.label] }))}
                  style={{ width: 38, height: 22, borderRadius: 100, background: toggles[sched.label] ? S.accent : S.surface, border: `1px solid ${S.border}`, position: "relative", cursor: "pointer", transition: "background 0.2s" }}>
                  <div style={{ position: "absolute", top: 2, left: toggles[sched.label] ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: toggles[sched.label] ? S.bg : S.text3, transition: "left 0.2s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
