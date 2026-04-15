"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"employee" | "admin">("employee");
  const [email, setEmail] = useState("sarah.mueller@example-gmbh.de");
  const [pw, setPw] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push(role === "admin" ? "/admin" : "/dashboard"), 600);
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: "3rem" }}>
        <div style={{ width: 36, height: 36, background: "var(--accent)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Shield size={20} color="#fff" strokeWidth={2.5} />
        </div>
        <span style={{ fontWeight: 700, fontSize: "1.15rem", color: "var(--text)", letterSpacing: "-0.02em" }}>CyberAware</span>
      </Link>

      <div style={{ width: "100%", maxWidth: 400 }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: "0.4rem" }}>Willkommen zurück</h1>
        <p style={{ color: "var(--text-2)", fontSize: "0.88rem", marginBottom: "2rem" }}>Melden Sie sich an, um fortzufahren</p>

        {/* Role Switcher */}
        <div style={{ display: "flex", gap: 4, marginBottom: "1.75rem", background: "var(--surface-2)", padding: 4, borderRadius: 10, border: "1px solid var(--border)" }}>
          {(["employee", "admin"] as const).map(r => (
            <button key={r} onClick={() => { setRole(r); setEmail(r === "admin" ? "admin@example-gmbh.de" : "sarah.mueller@example-gmbh.de"); }}
              style={{ flex: 1, padding: "0.5rem", borderRadius: 7, border: "none", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, transition: "all 0.15s",
                background: role === r ? "var(--accent)" : "transparent",
                color: role === r ? "#fff" : "var(--text-2)",
              }}>
              {r === "employee" ? "Mitarbeiter" : "Admin"}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 500, color: "var(--text-2)", marginBottom: "0.5rem" }}>E-Mail</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required
              style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: 10, padding: "0.75rem 1rem", fontSize: "0.88rem", color: "var(--text)", outline: "none" }} />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <label style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-2)" }}>Passwort</label>
              <a href="#" style={{ fontSize: "0.75rem", color: "var(--accent-text)", textDecoration: "none" }}>Vergessen?</a>
            </div>
            <input value={pw} onChange={e => setPw(e.target.value)} type="password" required
              style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: 10, padding: "0.75rem 1rem", fontSize: "0.88rem", color: "var(--text)", outline: "none" }} />
          </div>

          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "0.8rem", background: "var(--accent)", color: "#fff", fontWeight: 600, fontSize: "0.9rem", border: "none", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "opacity 0.15s", opacity: loading ? 0.7 : 1 }}>
            {loading ? <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }} className="spin" /> : <>Anmelden <ArrowRight size={16} /></>}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "1.5rem 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>oder via SSO</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {["Microsoft", "Google"].map(l => (
            <button key={l} style={{ padding: "0.65rem", background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: 10, color: "var(--text-2)", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", transition: "border-color 0.15s" }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
