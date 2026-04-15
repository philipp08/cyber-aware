"use client";
import Link from "next/link";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { modules, currentUser } from "@/lib/data";
import { S } from "@/lib/theme";

export default function ModulesPage() {
  const [filter, setFilter] = useState("Alle");
  const cats = ["Alle", "Pflicht", "Wichtig", "Kritisch"];
  const filtered = modules.filter(m => filter === "Alle" || m.category === filter);

  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
        <div>
          <p style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Lernpfad</p>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Module</h1>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              padding: "0.35rem 0.85rem", borderRadius: 100, fontSize: "0.78rem", fontWeight: 500,
              background: filter === c ? S.accent : "transparent",
              color: filter === c ? "var(--accent-fg)" : "var(--text-2)",
              border: filter === c ? "none" : `1px solid ${S.border}`,
              cursor: "pointer",
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 12, marginBottom: "2rem" }}>
        {[
          { label: "Abgeschlossen", val: currentUser.completedModules.length, total: modules.length },
          { label: "Pflichtmodule", val: currentUser.completedModules.filter(id => modules.find(m => m.id === id)?.category === "Pflicht").length, total: modules.filter(m => m.category === "Pflicht").length },
        ].map(s => (
          <div key={s.label} style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 16, padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.03em" }}>{s.val}<span style={{ fontSize: "1rem", color: "var(--text-2)" }}>/{s.total}</span></div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-2)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Modules grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {filtered.map((mod, i) => {
          const done = currentUser.completedModules.includes(mod.id);
          const score = done ? [92, 85, 90, 78][mod.id - 1] || 80 : null;

          return (
            <Link key={mod.id} href={`/modules/${mod.id}`}
              style={{ background: "var(--surface)", border: `1px solid ${done ? "var(--green-dim2)" : S.border}`, borderRadius: 20, padding: "1.5rem", textDecoration: "none", display: "flex", flexDirection: "column", gap: "1rem", transition: "border-color 0.15s", animationDelay: `${i * 0.04}s` }}
              className="fade-up"
            >
              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ width: 48, height: 48, background: "var(--surface-2)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>
                  {mod.icon}
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "0.18rem 0.5rem", borderRadius: 100,
                    background: mod.category === "Pflicht" ? "rgba(59,130,246,0.15)" : mod.category === "Kritisch" ? "rgba(255,69,69,0.15)" : "rgba(251,191,36,0.15)",
                    color: mod.category === "Pflicht" ? "#60A5FA" : mod.category === "Kritisch" ? "#FF6B6B" : "#FBBF24",
                  }}>{mod.category}</span>
                  {done && <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "0.18rem 0.5rem", borderRadius: 100, background: "var(--green-dim2)", color: S.green }}>✓ {score}%</span>}
                </div>
              </div>

              {/* Info */}
              <div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-2)", marginBottom: 3 }}>Modul {mod.id}</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.35rem" }}>{mod.title}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-2)", lineHeight: 1.5 }} className="line-clamp-2">{mod.description}</div>
              </div>

              {/* Topics */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {mod.topics.slice(0, 3).map(t => (
                  <span key={t} style={{ fontSize: "0.62rem", color: "var(--text-2)", background: "var(--surface-2)", border: `1px solid ${S.border}`, padding: "0.15rem 0.45rem", borderRadius: 100 }}>{t}</span>
                ))}
              </div>

              {/* Bottom */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${S.border}`, paddingTop: "0.75rem" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-2)" }}>{mod.duration} · {mod.difficulty}</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: done ? S.green : "var(--accent-text)" }}>
                  {done ? "Wiederholen →" : "Starten →"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
