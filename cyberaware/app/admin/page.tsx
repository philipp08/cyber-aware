"use client";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { companyEmployees, phishingCampaigns } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { S } from "@/lib/theme";

const completionData = [
  { dept: "IT", rate: 100 },
  { dept: "Finance", rate: 87 },
  { dept: "HR", rate: 75 },
  { dept: "Marketing", rate: 50 },
  { dept: "Sales", rate: 50 },
  { dept: "Ops", rate: 25 },
  { dept: "Legal", rate: 12 },
];

const trendData = [
  { month: "Okt", cert: 15, enrolled: 40 },
  { month: "Nov", cert: 22, enrolled: 43 },
  { month: "Dez", cert: 28, enrolled: 45 },
  { month: "Jan", cert: 37, enrolled: 48 },
];

const CustomBar = (props: any) => {
  const { x, y, width, height, value } = props;
  return <rect x={x} y={y} width={width} height={height} fill={value >= 80 ? "#CCFF00" : value >= 50 ? "rgba(204,255,0,0.4)" : "var(--accent-dim2)"} rx={4} />;
};

export default function AdminDashboardPage() {
  const totalEmployees = companyEmployees.length;
  const certifiedEmployees = companyEmployees.filter(e => e.certLevel).length;
  const avgScore = Math.round(
    companyEmployees.filter(e => e.examScore).reduce((s, e) => s + (e.examScore || 0), 0) /
    companyEmployees.filter(e => e.examScore).length
  );
  const completionRate = Math.round(
    companyEmployees.reduce((s, e) => s + e.completedModules / e.totalModules, 0) / totalEmployees * 100
  );
  const phishingClickRate = Math.round(
    phishingCampaigns.filter(c => c.status !== "draft").reduce((s, c) => s + c.clicked, 0) /
    phishingCampaigns.filter(c => c.status !== "draft").reduce((s, c) => s + c.sentTo, 0) * 100
  );

  const expiringCerts = companyEmployees.filter(e => {
    if (!e.certExpiry) return false;
    const days = Math.ceil((new Date(e.certExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days < 60;
  });

  return (
    <DashboardLayout isAdmin userName="Admin Müller" userInitials="AM" userRole="Unternehmens-Admin">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Example GmbH</p>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Admin-Dashboard</h1>
        </div>

        {/* KPI bento */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Abschlussquote", value: `${completionRate}%`, trend: "+12%", ok: true },
            { label: "Ø Prüfungsnote", value: `${avgScore}%`, trend: "+5%", ok: true },
            { label: "Phishing-Klickrate", value: `${phishingClickRate}%`, trend: "−8%", ok: true },
            { label: "Zertifiziert", value: `${certifiedEmployees}/${totalEmployees}`, trend: "+2 diese Woche", ok: true },
          ].map(kpi => (
            <div key={kpi.label} style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 18, padding: "1.25rem" }}>
              <div style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 4 }}>{kpi.value}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-2)", marginBottom: 8 }}>{kpi.label}</div>
              <div style={{ fontSize: "0.68rem", color: S.green }}>{kpi.trend}</div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 10, marginBottom: 16 }}>
          {/* Bar chart */}
          <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 18, padding: "1.5rem" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.25rem" }}>Abschlussquote nach Abteilung</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={completionData} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
                <XAxis dataKey="dept" tick={{ fontSize: 10, fill: "var(--text-2)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-2)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: "var(--surface-2)", border: `1px solid ${S.border}`, borderRadius: 10, color: "var(--text)", fontSize: 12 }}
                  formatter={(v: any) => [`${v}%`, "Quote"]}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="rate" shape={<CustomBar />} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cert distribution */}
          <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 18, padding: "1.5rem" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.25rem" }}>Zertifikatsverteilung</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Gold 🥇", count: 1, total: totalEmployees, color: S.accent },
                { label: "Silber 🥈", count: 2, total: totalEmployees, color: "rgba(200,200,210,0.8)" },
                { label: "Bronze 🥉", count: 2, total: totalEmployees, color: S.amber },
                { label: "Offen", count: totalEmployees - certifiedEmployees, total: totalEmployees, color: S.text3 },
              ].map(d => (
                <div key={d.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-2)" }}>{d.label}</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>{d.count}</span>
                  </div>
                  <div style={{ height: 4, background: "var(--surface-2)", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ width: `${(d.count / d.total) * 100}%`, height: "100%", background: d.color, borderRadius: 100 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trend line */}
        <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 18, padding: "1.5rem", marginBottom: 16 }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.25rem" }}>Zertifizierungstrend</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={trendData} margin={{ top: 0, right: 10, left: -24, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--text-2)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--text-2)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "var(--surface-2)", border: `1px solid ${S.border}`, borderRadius: 10, color: "var(--text)", fontSize: 12 }}
                cursor={{ stroke: S.text3 }}
              />
              <Line type="monotone" dataKey="cert" stroke={S.accent} strokeWidth={2} dot={{ fill: S.accent, r: 3 }} name="Zertifiziert" />
              <Line type="monotone" dataKey="enrolled" stroke={S.text3} strokeWidth={2} dot={{ fill: S.text3, r: 3 }} name="Eingeschrieben" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {/* Expiring certs */}
          <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 18, overflow: "hidden" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: `1px solid ${S.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 600 }}>⏳ Ablaufende Zertifikate</span>
              <Link href="/admin/users" style={{ fontSize: "0.68rem", color: "var(--accent-text)", textDecoration: "none" }}>Alle →</Link>
            </div>
            {expiringCerts.length === 0 ? (
              <div style={{ padding: "2rem", textAlign: "center", fontSize: "0.78rem", color: "var(--text-2)" }}>Keine ablaufenden Zertifikate</div>
            ) : expiringCerts.map(e => {
              const days = Math.ceil((new Date(e.certExpiry!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "0.85rem 1.5rem", borderBottom: `1px solid ${S.border}` }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: "var(--text-2)", flexShrink: 0 }}>
                    {e.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: 500 }}>{e.name}</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-2)" }}>{e.department}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: days < 14 ? S.red : S.amber }}>{days}d</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-2)" }}>{new Date(e.certExpiry!).toLocaleDateString("de-DE")}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Phishing campaigns */}
          <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 18, overflow: "hidden" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: `1px solid ${S.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 600 }}>🎣 Phishing-Kampagnen</span>
              <Link href="/admin/phishing" style={{ fontSize: "0.68rem", color: "var(--accent-text)", textDecoration: "none" }}>Alle →</Link>
            </div>
            {phishingCampaigns.map((c, i) => (
              <div key={c.id} style={{ padding: "0.85rem 1.5rem", borderBottom: i < phishingCampaigns.length - 1 ? `1px solid ${S.border}` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 500 }}>{c.name}</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-2)", marginTop: 1 }}>{c.template}</div>
                  </div>
                  <span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: 100, flexShrink: 0,
                    background: c.status === "completed" ? "var(--green-dim2)" : c.status === "running" ? "var(--accent-dim2)" : "var(--border)",
                    color: c.status === "completed" ? S.green : c.status === "running" ? "var(--accent-text)" : "var(--text-2)",
                  }}>
                    {c.status === "completed" ? "Abgeschlossen" : c.status === "running" ? "Läuft" : "Entwurf"}
                  </span>
                </div>
                {c.status !== "draft" && (
                  <div style={{ display: "flex", gap: 12, fontSize: "0.68rem", color: "var(--text-2)" }}>
                    <span>{c.sentTo} Empfänger</span>
                    <span style={{ color: c.clicked > 0 ? S.red : S.green }}>{c.clicked > 0 ? `${c.clicked} Klicks ⚠` : "0 Klicks ✓"}</span>
                    <span>{c.reported} Gemeldet</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[
            { href: "/admin/users", emoji: "👥", label: "Mitarbeiter einladen", desc: "Neue Nutzer per E-Mail einladen" },
            { href: "/admin/phishing", emoji: "🎣", label: "Phishing-Test starten", desc: "Neue Simulation erstellen" },
            { href: "/admin/reports", emoji: "📄", label: "Compliance-Report", desc: "ISO-27001/BSI-PDF erstellen" },
          ].map(a => (
            <Link key={a.href} href={a.href} style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 18, padding: "1.25rem 1.5rem", textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: "1.5rem" }}>{a.emoji}</span>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{a.label}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-2)" }}>{a.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
