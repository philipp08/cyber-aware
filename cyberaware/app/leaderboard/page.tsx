"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { leaderboard, currentUser } from "@/lib/data";
import { S } from "@/lib/theme";

export default function LeaderboardPage() {
  const myRank = leaderboard.find(e => e.name === currentUser.name);

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Example GmbH</p>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em" }}>Rangliste</h1>
        </div>

        {/* My rank */}
        {myRank && (
          <div style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-dim3)", borderRadius: 18, padding: "1.25rem 1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--accent-text)", width: 40 }}>#{myRank.rank}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.7rem", color: "var(--accent-text)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Ihre Position</div>
              <div style={{ fontSize: "1rem", fontWeight: 700 }}>{myRank.name}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.03em" }}>{myRank.points.toLocaleString("de-DE")}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-2)" }}>Punkte</div>
            </div>
          </div>
        )}

        {/* Podium */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: "1.5rem" }}>
          {[leaderboard[1], leaderboard[0], leaderboard[2]].map((e, vi) => {
            const pos = vi === 0 ? 2 : vi === 1 ? 1 : 3;
            const isFirst = pos === 1;
            const emojis = ["🥈", "🥇", "🥉"];
            return (
              <div key={e.rank} style={{
                background: isFirst ? "var(--accent-dim)" : "var(--surface)",
                border: `1px solid ${isFirst ? "rgba(204,255,0,0.25)" : S.border}`,
                borderRadius: 14, padding: "1.5rem", textAlign: "center",
                transform: isFirst ? "translateY(-8px)" : "none",
              }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{emojis[vi]}</div>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, margin: "0 auto 0.75rem" }}>
                  {e.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 2 }}>{e.name.split(" ")[0]}</div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-2)", marginBottom: 8 }}>{e.department}</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.02em", color: isFirst ? "var(--accent-text)" : "var(--text)" }}>
                  {(e.points / 1000).toFixed(1)}k
                </div>
              </div>
            );
          })}
        </div>

        {/* Full list */}
        <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 14, overflow: "hidden" }}>
          {leaderboard.map((e, i) => {
            const isMe = e.name === currentUser.name;
            return (
              <div key={e.rank} style={{
                display: "flex", alignItems: "center", gap: "0.85rem",
                padding: "1rem 1.5rem",
                borderBottom: i < leaderboard.length - 1 ? `1px solid ${S.border}` : "none",
                background: isMe ? "var(--accent-dim)" : "transparent",
              }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, width: 24, textAlign: "center", color: e.rank <= 3 ? "var(--accent-text)" : "var(--text-2)" }}>
                  {e.rank <= 3 ? ["🥇","🥈","🥉"][e.rank-1] : `#${e.rank}`}
                </span>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: isMe ? "var(--accent-dim2)" : "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, color: isMe ? "var(--accent-text)" : "var(--text-2)", flexShrink: 0 }}>
                  {e.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {e.name} {isMe && <span style={{ fontSize: "0.65rem", color: "var(--accent-text)" }}>(Sie)</span>}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-2)" }}>{e.department}</div>
                </div>
                {e.certLevel && (
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: 100, flexShrink: 0,
                    background: e.certLevel === "Gold" ? "var(--accent-dim2)" : "var(--border)",
                    color: e.certLevel === "Gold" ? "var(--accent-text)" : "var(--text-2)",
                  }}>{e.certLevel}</span>
                )}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "1rem", fontWeight: 700 }}>{e.points.toLocaleString("de-DE")}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-2)" }}>Punkte</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Points guide */}
        <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 14, padding: "1.5rem", marginTop: 16 }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Punkte sammeln</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {[
              ["Modul abschließen", "+100"],
              ["100% Wissenscheck", "+50"],
              ["Phishing erkannt", "+200"],
              ["Tägliches Login", "+10"],
              ["7-Tage-Streak", "+75"],
              ["Zertifikat", "+500"],
            ].map(([a, p]) => (
              <div key={a} style={{ background: "var(--surface-2)", borderRadius: 12, padding: "0.75rem", display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-text)" }}>{p}</span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-2)" }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
