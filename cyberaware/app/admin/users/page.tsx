"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { companyEmployees } from "@/lib/data";
import { Search, UserPlus, Mail, Download } from "lucide-react";

const S = { accent: "#CCFF00", text: "#F5F5F7", text2: "#88888E", text3: "#44444C", border: "rgba(255,255,255,0.06)", surface: "#131316", surface2: "#1A1A1E", bg: "#0C0C0F", green: "#00D97E", red: "#FF4545", amber: "#F59E0B" };

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Alle");
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteSent, setInviteSent] = useState(false);

  const filters = ["Alle", "Zertifiziert", "In Bearbeitung", "Nicht gestartet"];

  const filtered = companyEmployees.filter(e => {
    const matchSearch = search === "" || e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()) || e.department.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Alle" || (filter === "Zertifiziert" && e.certLevel) || (filter === "In Bearbeitung" && !e.certLevel && e.completedModules > 0) || (filter === "Nicht gestartet" && e.completedModules === 0);
    return matchSearch && matchFilter;
  });

  function handleInvite(ev: React.FormEvent) {
    ev.preventDefault();
    setInviteSent(true);
    setTimeout(() => { setInviteSent(false); setShowInvite(false); setInviteEmail(""); }, 2000);
  }

  const certCount = companyEmployees.filter(e => e.certLevel).length;

  return (
    <DashboardLayout isAdmin userName="Admin Müller" userInitials="AM" userRole="Unternehmens-Admin">
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div>
            <p style={{ fontSize: "0.7rem", color: S.text2, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Verwaltung</p>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Mitarbeiter</h1>
          </div>
          <button onClick={() => setShowInvite(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.65rem 1.25rem", background: S.accent, border: "none", borderRadius: 100, color: S.bg, fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>
            <UserPlus size={14} /> Einladen
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Gesamt", value: companyEmployees.length },
            { label: "Zertifiziert", value: certCount },
            { label: "In Bearbeitung", value: companyEmployees.filter(e => !e.certLevel && e.completedModules > 0).length },
            { label: "Nicht gestartet", value: companyEmployees.filter(e => e.completedModules === 0).length },
          ].map(s => (
            <div key={s.label} style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: "0.68rem", color: S.text2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search + filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search size={14} color={S.text2} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Mitarbeiter suchen..."
              style={{ width: "100%", background: S.surface, border: `1px solid ${S.border}`, borderRadius: 100, padding: "0.55rem 1rem 0.55rem 2.4rem", fontSize: "0.82rem", color: S.text, outline: "none" }} />
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: "0.3rem 0.85rem", borderRadius: 100, fontSize: "0.75rem", fontWeight: 500, cursor: "pointer", background: filter === f ? S.accent : "transparent", color: filter === f ? S.bg : S.text2, border: filter === f ? "none" : `1px solid ${S.border}` }}>{f}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 18, overflow: "hidden", marginBottom: 12 }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 120px 100px 100px", gap: 0, padding: "0.75rem 1.5rem", borderBottom: `1px solid ${S.border}` }}>
            {["Mitarbeiter", "Abteilung", "Fortschritt", "Zertifikat", "Status"].map(h => (
              <span key={h} style={{ fontSize: "0.65rem", color: S.text3, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{h}</span>
            ))}
          </div>

          {filtered.map((emp, i) => {
            const progress = Math.round((emp.completedModules / emp.totalModules) * 100);
            const daysLeft = emp.certExpiry ? Math.ceil((new Date(emp.certExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;
            const statusColor = emp.certLevel ? S.green : emp.completedModules > 0 ? S.accent : S.text3;
            const statusLabel = emp.certLevel ? "Zertifiziert" : emp.completedModules > 0 ? "Aktiv" : "Offen";

            return (
              <div key={emp.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 120px 100px 100px", gap: 0, padding: "0.85rem 1.5rem", borderBottom: i < filtered.length - 1 ? `1px solid ${S.border}` : "none", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: S.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: S.text2, flexShrink: 0 }}>
                    {emp.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 500 }}>{emp.name}</div>
                    <div style={{ fontSize: "0.68rem", color: S.text2 }}>{emp.email}</div>
                  </div>
                </div>
                <span style={{ fontSize: "0.78rem", color: S.text2 }}>{emp.department}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 3, background: S.surface2, borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ width: `${progress}%`, height: "100%", background: progress === 100 ? S.green : S.accent, borderRadius: 100 }} />
                  </div>
                  <span style={{ fontSize: "0.65rem", color: S.text2, flexShrink: 0 }}>{emp.completedModules}/{emp.totalModules}</span>
                </div>
                <div>
                  {emp.certLevel ? (
                    <div>
                      <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: 100, background: emp.certLevel === "Gold" ? "rgba(204,255,0,0.12)" : "rgba(255,255,255,0.06)", color: emp.certLevel === "Gold" ? S.accent : S.text2 }}>
                        {emp.certLevel}
                      </span>
                      {daysLeft !== null && daysLeft < 60 && (
                        <div style={{ fontSize: "0.62rem", color: daysLeft < 14 ? S.red : S.amber, marginTop: 2 }}>{daysLeft}d</div>
                      )}
                    </div>
                  ) : <span style={{ fontSize: "0.75rem", color: S.text3 }}>—</span>}
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: statusColor }}>{statusLabel}</span>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: "0.72rem", color: S.text2, marginBottom: 12 }}>{filtered.length} Einträge</div>

        {/* Bulk actions */}
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 1rem", background: "transparent", border: `1px solid ${S.border}`, borderRadius: 100, color: S.text2, fontSize: "0.75rem", cursor: "pointer" }}>
            <Mail size={12} /> Erinnerung senden
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 1rem", background: "transparent", border: `1px solid ${S.border}`, borderRadius: 100, color: S.text2, fontSize: "0.75rem", cursor: "pointer" }}>
            <Download size={12} /> CSV exportieren
          </button>
        </div>
      </div>

      {/* Invite modal */}
      {showInvite && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "1rem" }}>
          <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 24, padding: "2rem", width: "100%", maxWidth: 440 }}>
            {!inviteSent ? (
              <>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.5rem" }}>Mitarbeiter einladen</h2>
                <form onSubmit={handleInvite}>
                  {[
                    { label: "E-Mail-Adresse", type: "email", value: inviteEmail, onChange: (v: string) => setInviteEmail(v), placeholder: "mitarbeiter@firma.de", required: true },
                  ].map(f => (
                    <div key={f.label} style={{ marginBottom: "1rem" }}>
                      <label style={{ fontSize: "0.72rem", color: S.text2, display: "block", marginBottom: 6 }}>{f.label}</label>
                      <input type={f.type} value={f.value} onChange={e => f.onChange(e.target.value)} placeholder={f.placeholder} required={f.required}
                        style={{ width: "100%", background: S.surface2, border: `1px solid ${S.border}`, borderRadius: 12, padding: "0.65rem 1rem", fontSize: "0.85rem", color: S.text, outline: "none" }} />
                    </div>
                  ))}
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontSize: "0.72rem", color: S.text2, display: "block", marginBottom: 6 }}>Abteilung</label>
                    <select style={{ width: "100%", background: S.surface2, border: `1px solid ${S.border}`, borderRadius: 12, padding: "0.65rem 1rem", fontSize: "0.85rem", color: S.text, outline: "none" }}>
                      {["IT", "Finance", "HR", "Marketing", "Sales", "Operations", "Legal"].map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontSize: "0.72rem", color: S.text2, display: "block", marginBottom: 6 }}>Lernpfad</label>
                    <select style={{ width: "100%", background: S.surface2, border: `1px solid ${S.border}`, borderRadius: 12, padding: "0.65rem 1rem", fontSize: "0.85rem", color: S.text, outline: "none" }}>
                      <option>Standard (alle 8 Module)</option>
                      <option>Pflichtmodule (4 Module)</option>
                      <option>IT-Fokus (8 Module + erweitert)</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: "1.5rem" }}>
                    <button type="button" onClick={() => setShowInvite(false)} style={{ flex: 1, padding: "0.65rem", background: "transparent", border: `1px solid ${S.border}`, borderRadius: 100, color: S.text2, fontSize: "0.82rem", cursor: "pointer" }}>Abbrechen</button>
                    <button type="submit" style={{ flex: 1, padding: "0.65rem", background: S.accent, border: "none", borderRadius: 100, color: S.bg, fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>Einladung senden</button>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>✅</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 4 }}>Einladung gesendet!</div>
                <div style={{ fontSize: "0.82rem", color: S.text2 }}>{inviteEmail}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
