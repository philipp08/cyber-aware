"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { knowledgeBase } from "@/lib/data";
import { Search } from "lucide-react";
import { S } from "@/lib/theme";

export default function KnowledgeBasePage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Alle");
  const [open, setOpen] = useState<string | null>(null);

  const cats = ["Alle", ...Array.from(new Set(knowledgeBase.map(k => k.category)))];
  const filtered = knowledgeBase.filter(k =>
    (cat === "Alle" || k.category === cat) &&
    (search === "" || k.term.toLowerCase().includes(search.toLowerCase()) || k.definition.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Referenz</p>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Wissensdatenbank</h1>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "1rem" }}>
          <Search size={16} color="var(--text-2)" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Begriff suchen..."
            style={{ width: "100%", background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 14, padding: "0.75rem 1rem 0.75rem 2.75rem", fontSize: "0.88rem", color: "var(--text)", outline: "none" }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: "0.3rem 0.85rem", borderRadius: 100, fontSize: "0.78rem", fontWeight: 500, cursor: "pointer",
              background: cat === c ? S.accent : "transparent",
              color: cat === c ? "var(--accent-fg)" : "var(--text-2)",
              border: cat === c ? "none" : `1px solid ${S.border}`,
            }}>{c}</button>
          ))}
        </div>

        <div style={{ fontSize: "0.72rem", color: "var(--text-2)", marginBottom: "1rem" }}>{filtered.length} Begriffe</div>

        {/* Term list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {filtered.map(item => (
            <div key={item.term} style={{ background: "var(--surface)", border: `1px solid ${open === item.term ? "var(--accent-dim3)" : S.border}`, borderRadius: 16, overflow: "hidden", transition: "border-color 0.15s" }}>
              <button onClick={() => setOpen(open === item.term ? null : item.term)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: open === item.term ? S.accent : S.text3, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)" }}>{item.term}</span>
                  <span style={{ fontSize: "0.65rem", color: "var(--text-2)", background: "var(--surface-2)", padding: "0.15rem 0.5rem", borderRadius: 100 }}>{item.category}</span>
                </div>
                <span style={{ fontSize: "0.85rem", color: "var(--text-2)", transition: "transform 0.15s", transform: open === item.term ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {open === item.term && (
                <div style={{ padding: "0 1.25rem 1.25rem 2.35rem", fontSize: "0.85rem", color: "var(--text-2)", lineHeight: 1.7 }}>
                  {item.definition}
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-2)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🔍</div>
              Keine Ergebnisse für „{search}"
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
