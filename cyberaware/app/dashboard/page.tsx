"use client";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { currentUser, modules, leaderboard } from "@/lib/data";
import { ArrowUpRight, ArrowRight, Flame, Zap } from "lucide-react";
import { S } from "@/lib/theme";

function Card({ children, style = {}, accent = false, className = "" }: { children: React.ReactNode; style?: React.CSSProperties; accent?: boolean; className?: string }) {
  return (
    <div className={`${accent ? "" : "hover-glow"} ${className}`} style={{
      background: accent ? S.accent : "var(--surface)",
      border: `1px solid ${accent ? "transparent" : S.border}`,
      borderRadius: 20,
      padding: "1.5rem",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.18s ease",
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const completed = currentUser.completedModules.length;
  const total = modules.length;
  const pct = Math.round((completed / total) * 100);
  const nextMod = modules.find(m => !currentUser.completedModules.includes(m.id));

  return (
    <DashboardLayout>
      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.75rem" }}>
        <div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Übersicht</p>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
            Hey, {currentUser.name.split(" ")[0]} 👋
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--red-dim)", border: "1px solid var(--red-dim2)", borderRadius: 100, padding: "0.35rem 0.75rem" }}>
          <Flame size={12} color={S.red} />
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: S.red }}>{currentUser.streak} Tage Streak</span>
        </div>
      </div>

      {/* Bento grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>

        {/* Progress card – 2 cols */}
        <Card className="fade-up-1" style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Lernfortschritt</p>
              <div style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>{pct}<span style={{ fontSize: "1.5rem", color: "var(--text-2)" }}>%</span></div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{completed}<span style={{ color: "var(--text-2)", fontSize: "1rem" }}>/{total}</span></div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-2)" }}>Module</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 6, background: "var(--surface-2)", borderRadius: 100, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: S.accent, borderRadius: 100, transition: "width 0.8s ease" }} />
          </div>

          {/* Cert levels */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {[
              { l: "Bronze", e: "🥉", needed: 4 },
              { l: "Silber", e: "🥈", needed: 8 },
              { l: "Gold", e: "🥇", needed: 8 },
            ].map(c => {
              const cur = Math.min(completed, c.needed);
              const p = Math.round((cur / c.needed) * 100);
              const done = currentUser.certLevel === c.l;
              return (
                <div key={c.l} style={{ background: "var(--surface-2)", borderRadius: 12, padding: "0.75rem", border: done ? `1px solid rgba(204,255,0,0.3)` : `1px solid ${S.border}` }}>
                  <div style={{ fontSize: "1.2rem", marginBottom: 4 }}>{c.e}</div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 600, color: done ? "var(--accent-text)" : "var(--text-2)", marginBottom: 6 }}>{c.l}</div>
                  <div style={{ height: 3, background: "var(--border)", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ width: `${p}%`, height: "100%", background: done ? S.accent : S.text3, borderRadius: 100 }} />
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-2)", marginTop: 3 }}>{cur}/{c.needed}</div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Points card */}
        <Card accent className="fade-up-2" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Punkte</p>
            <div style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--accent-fg)", lineHeight: 1 }}>
              {currentUser.points.toLocaleString("de-DE")}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "rgba(0,0,0,0.5)", marginBottom: 2 }}>Level</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-fg)" }}>{currentUser.level}</div>
            </div>
            <div style={{ width: 40, height: 40, background: "rgba(0,0,0,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={20} color="var(--accent-fg)" />
            </div>
          </div>
        </Card>

        {/* Cert card */}
        <Card className="fade-up-3" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Zertifikat</p>
            <div style={{ fontSize: "2rem" }}>{currentUser.certLevel === "Gold" ? "🥇" : currentUser.certLevel === "Silber" ? "🥈" : "🥉"}</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em", marginTop: 4 }}>{currentUser.certLevel}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.72rem", color: S.red, marginBottom: 2 }}>
              Läuft ab
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>
              {new Date(currentUser.certExpiry!).toLocaleDateString("de-DE")}
            </div>
          </div>
        </Card>

        {/* Next module – full width */}
        {nextMod && (
          <Link href={`/modules/${nextMod.id}`} className="hover-glow fade-up-4" style={{ gridColumn: "span 2", background: "var(--surface-2)", border: `1px solid var(--border)`, borderRadius: 20, padding: "1.5rem", textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.2s ease, box-shadow 0.2s ease" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <div style={{ width: 48, height: 48, background: "var(--surface)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>{nextMod.icon}</div>
              <div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Nächstes Modul</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)" }}>{nextMod.title}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-2)" }}>{nextMod.duration} · {nextMod.difficulty}</div>
              </div>
            </div>
            <div style={{ width: 36, height: 36, background: S.accent, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ArrowRight size={16} color="var(--accent-fg)" />
            </div>
          </Link>
        )}

        {/* Exam CTA */}
        <Link href="/exam" className="hover-glow fade-up-5" style={{ gridColumn: "span 2", background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 20, padding: "1.5rem", textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.2s ease, box-shadow 0.2s ease" }}>
          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Abschlussprüfung</div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)" }}>30 Fragen · 70% zum Bestehen</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-2)" }}>Versuch {currentUser.examAttempts}/3 · Letztes Ergebnis: {currentUser.examScore}%</div>
          </div>
          <div style={{ width: 36, height: 36, border: `1px solid ${S.border}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ArrowUpRight size={16} color="var(--text-2)" />
          </div>
        </Link>

        {/* Recent Modules */}
        <div style={{ gridColumn: "span 2", background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 20, padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 600 }}>Module</p>
            <Link href="/modules" style={{ fontSize: "0.72rem", color: "var(--text-2)", textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
              Alle <ArrowUpRight size={11} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {modules.slice(0, 5).map(mod => {
              const done = currentUser.completedModules.includes(mod.id);
              return (
                <Link key={mod.id} href={`/modules/${mod.id}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0.5rem", borderRadius: 12, textDecoration: "none", transition: "background 0.1s" }}>
                  <div style={{ width: 32, height: 32, background: "var(--surface-2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{mod.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mod.title}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-2)" }}>{mod.duration}</div>
                  </div>
                  {done
                    ? <span style={{ fontSize: "0.68rem", fontWeight: 600, color: S.green, background: "var(--green-dim2)", padding: "0.15rem 0.5rem", borderRadius: 100, flexShrink: 0 }}>✓ done</span>
                    : <span style={{ fontSize: "0.68rem", color: "var(--text-2)", background: "var(--surface-2)", padding: "0.15rem 0.5rem", borderRadius: 100, flexShrink: 0, border: `1px solid ${S.border}` }}>Start</span>
                  }
                </Link>
              );
            })}
          </div>
        </div>

        {/* Badges */}
        <Card style={{ gridColumn: "span 1" }}>
          <p style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Badges</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
            {currentUser.badges.map(b => (
              <div key={b.id} title={b.name} style={{
                aspectRatio: "1", background: "var(--surface-2)", borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.1rem",
                opacity: b.earned ? 1 : 0.2,
                filter: b.earned ? "none" : "grayscale(1)",
              }}>{b.icon}</div>
            ))}
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-2)", marginTop: "0.75rem" }}>
            {currentUser.badges.filter(b => b.earned).length}/{currentUser.badges.length} verdient
          </div>
        </Card>

        {/* Leaderboard */}
        <Card style={{ gridColumn: "span 1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Rangliste</p>
            <Link href="/leaderboard" style={{ fontSize: "0.7rem", color: "var(--text-2)", textDecoration: "none" }}>↗</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {leaderboard.slice(0, 5).map(e => {
              const isMe = e.name === currentUser.name;
              return (
                <div key={e.rank} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.4rem 0.5rem", borderRadius: 10, background: isMe ? "var(--accent-dim)" : "transparent", border: isMe ? "1px solid var(--accent-dim2)" : "1px solid transparent" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: e.rank <= 3 ? "var(--accent-text)" : "var(--text-2)", width: 16, textAlign: "center" }}>#{e.rank}</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.name.split(" ")[0]}</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text)" }}>{(e.points / 1000).toFixed(1)}k</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Strengths */}
        <Card style={{ gridColumn: "span 2" }}>
          <p style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.25rem" }}>Stärken & Schwächen</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {[
              { label: "Phishing-Erkennung", val: 92 },
              { label: "Passwortsicherheit", val: 88 },
              { label: "DSGVO-Wissen", val: 76 },
              { label: "Gerätesicherheit", val: 61 },
            ].map(s => (
              <div key={s.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-2)" }}>{s.label}</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: s.val >= 80 ? "var(--accent-text)" : s.val >= 70 ? "var(--text)" : S.red }}>{s.val}%</span>
                </div>
                <div style={{ height: 4, background: "var(--surface-2)", borderRadius: 100, overflow: "hidden" }}>
                  <div style={{ width: `${s.val}%`, height: "100%", background: s.val >= 80 ? S.accent : s.val >= 70 ? "var(--text)" : S.red, borderRadius: 100, opacity: s.val >= 80 ? 1 : 0.6 }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
