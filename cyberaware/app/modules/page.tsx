"use client";
import Link from "next/link";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { modules, currentUser } from "@/lib/data";
import { S } from "@/lib/theme";
import { Clock } from "lucide-react";

/* Category accent colours */
const catColor: Record<string, { border: string; bg: string; text: string }> = {
  Pflicht:  { border: "#0F766E", bg: "rgba(15,118,110,0.08)", text: "#0F766E" },
  Kritisch: { border: "#DC2626", bg: "rgba(220,38,38,0.08)",  text: "#DC2626" },
  Wichtig:  { border: "#D97706", bg: "rgba(217,119,6,0.08)", text: "#D97706" },
};

/* Simple SVG progress ring */
function ProgressRing({ pct, size = 80, stroke = 7, color = S.accent }: { pct: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.22,1,0.36,1)" }} />
    </svg>
  );
}

export default function ModulesPage() {
  const [filter, setFilter] = useState("Alle");
  const cats = ["Alle", "Pflicht", "Wichtig", "Kritisch"];
  const filtered = modules.filter(m => filter === "Alle" || m.category === filter);

  const totalDone = currentUser.completedModules.length;
  const totalMods = modules.length;
  const overallPct = Math.round((totalDone / totalMods) * 100);
  const pflichtDone = currentUser.completedModules.filter(id => modules.find(m => m.id === id)?.category === "Pflicht").length;
  const pflichtTotal = modules.filter(m => m.category === "Pflicht").length;
  const pflichtPct = Math.round((pflichtDone / pflichtTotal) * 100);

  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ fontSize: "0.72rem", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Lernpfad</p>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, letterSpacing: "-0.025em" }}>Module</h1>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              padding: "0.35rem 0.85rem", borderRadius: 8, fontSize: "0.78rem", fontWeight: 500,
              background: filter === c ? "var(--accent)" : "transparent",
              color: filter === c ? "#fff" : "var(--text-2)",
              border: filter === c ? "none" : `1px solid ${S.border}`,
              cursor: "pointer",
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Stats row — 2 big boxes + progress ring */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 14, marginBottom: "2rem", alignItems: "stretch" }}>
        {/* Abgeschlossen */}
        <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 14, padding: "1.25rem 1.5rem" }}>
          <div style={{ fontSize: "0.68rem", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600, marginBottom: 8 }}>Abgeschlossen</div>
          <div style={{ fontSize: "2.4rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {totalDone}<span style={{ fontSize: "1.1rem", color: "var(--text-2)", fontWeight: 500 }}>/{totalMods}</span>
          </div>
          <div style={{ marginTop: 10, height: 5, background: "var(--surface-2)", borderRadius: 100 }}>
            <div className="progress-fill" style={{ height: "100%", borderRadius: 100, background: S.accent, width: `${overallPct}%` }} />
          </div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-2)", marginTop: 5 }}>{overallPct}% abgeschlossen</div>
        </div>

        {/* Pflichtmodule */}
        <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 14, padding: "1.25rem 1.5rem" }}>
          <div style={{ fontSize: "0.68rem", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600, marginBottom: 8 }}>Pflichtmodule</div>
          <div style={{ fontSize: "2.4rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {pflichtDone}<span style={{ fontSize: "1.1rem", color: "var(--text-2)", fontWeight: 500 }}>/{pflichtTotal}</span>
          </div>
          <div style={{ marginTop: 10, height: 5, background: "var(--surface-2)", borderRadius: 100 }}>
            <div className="progress-fill" style={{ height: "100%", borderRadius: 100, background: "var(--accent)", width: `${pflichtPct}%` }} />
          </div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-2)", marginTop: 5 }}>{pflichtPct}% Compliance</div>
        </div>

        {/* Progress ring visualization */}
        <div style={{ background: "var(--accent)", borderRadius: 14, padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, minWidth: 120 }}>
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <ProgressRing pct={overallPct} size={76} stroke={7} color="rgba(255,255,255,0.8)" />
            <div style={{ position: "absolute", textAlign: "center" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{overallPct}%</div>
            </div>
          </div>
          <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", textAlign: "center" }}>Gesamt</div>
        </div>
      </div>

      {/* Modules grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {filtered.map((mod, i) => {
          const done = currentUser.completedModules.includes(mod.id);
          const score = done ? ([92, 85, 90, 78][mod.id - 1] ?? 80) : null;
          const cc = catColor[mod.category] ?? catColor["Pflicht"];
          const progressPct = done ? 100 : mod.id % 3 === 0 ? 60 : 0;

          return (
            <Link key={mod.id} href={`/modules/${mod.id}`}
              className="hover-lift"
              style={{
                background: "var(--surface)",
                border: `1px solid ${done ? "var(--green-dim2)" : S.border}`,
                borderRadius: 14,
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                animationDelay: `${i * 0.04}s`,
              }}
            >
              {/* Colored top accent stripe */}
              <div style={{ height: 4, background: cc.border, width: "100%" }} />

              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.9rem", flex: 1 }}>
                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ width: 48, height: 48, background: "var(--surface-2)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>
                    {mod.icon}
                  </div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end", alignItems: "center" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.18rem 0.5rem", borderRadius: 6, background: cc.bg, color: cc.text }}>
                      {mod.category}
                    </span>
                    {done && score !== null && (
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "0.22rem 0.6rem", borderRadius: 6, background: "var(--green-dim2)", color: S.green }}>
                        ✓ {score}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-2)", marginBottom: 3 }}>Modul {mod.id}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.35rem" }}>{mod.title}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-2)", lineHeight: 1.5 }} className="line-clamp-2">{mod.description}</div>
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "var(--text-3)", marginBottom: 5 }}>
                    <span>Fortschritt</span>
                    <span style={{ fontWeight: 600, color: done ? S.green : "var(--text-2)" }}>{progressPct}%</span>
                  </div>
                  <div style={{ height: 5, background: "var(--surface-2)", borderRadius: 100 }}>
                    <div className="progress-fill" style={{
                      height: "100%", borderRadius: 100,
                      background: done ? S.green : progressPct > 0 ? S.accent : "transparent",
                      width: `${progressPct}%`,
                    }} />
                  </div>
                </div>

                {/* Topics chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {mod.topics.slice(0, 3).map(t => (
                    <span key={t} style={{ fontSize: "0.62rem", color: "var(--text-2)", background: "var(--surface-2)", border: `1px solid ${S.border}`, padding: "0.15rem 0.45rem", borderRadius: 6 }}>{t}</span>
                  ))}
                </div>

                {/* Bottom */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${S.border}`, paddingTop: "0.75rem", marginTop: "auto" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.72rem", color: "var(--text-2)" }}>
                    <Clock size={12} color="var(--text-3)" />
                    {mod.duration}
                  </span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: done ? S.green : "var(--accent-text)" }}>
                    {done ? "Wiederholen →" : "Starten →"}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
