"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, Shield, Sun, Moon } from "lucide-react";

interface NavItem { href: string; label: string; }

const employeeNav: NavItem[] = [
  { href: "/dashboard",     label: "Übersicht" },
  { href: "/modules",       label: "Module" },
  { href: "/exam",          label: "Prüfung" },
  { href: "/certificate",   label: "Zertifikat" },
  { href: "/leaderboard",   label: "Rangliste" },
  { href: "/knowledge-base",label: "Wissen" },
];

const adminNav: NavItem[] = [
  { href: "/admin",         label: "Dashboard" },
  { href: "/admin/users",   label: "Mitarbeiter" },
  { href: "/admin/phishing",label: "Phishing" },
  { href: "/admin/reports", label: "Berichte" },
  { href: "/knowledge-base",label: "Wissen" },
];

export default function DashboardLayout({
  children,
  isAdmin = false,
  userInitials = "SM",
}: {
  children: React.ReactNode;
  isAdmin?: boolean;
  userInitials?: string;
  userName?: string;
  userRole?: string;
}) {
  const pathname = usePathname();
  const nav = isAdmin ? adminNav : employeeNav;
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("ca-theme");
    if (saved === "light") setDark(false);
    else setDark(!document.documentElement.classList.contains("light"));
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("ca-theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("ca-theme", "light");
    }
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", transition: "background 0.25s ease" }}>
      {/* Top Nav */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: dark ? "rgba(12,12,15,0.88)" : "rgba(242,242,247,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 1.5rem",
          height: 56,
          display: "flex", alignItems: "center", gap: "2rem",
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={16} color="#0C0C0F" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", letterSpacing: "-0.01em" }}>
              CyberAware
            </span>
            {isAdmin && (
              <span style={{ fontSize: "0.6rem", fontWeight: 700, padding: "0.1rem 0.45rem", borderRadius: 100, background: "var(--accent-dim2)", color: "var(--accent-text)" }}>
                Admin
              </span>
            )}
          </Link>

          {/* Nav pills */}
          <nav style={{ display: "flex", gap: 4, flex: 1, overflowX: "auto" }}>
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} style={{
                  padding: "0.3rem 0.85rem", borderRadius: 100,
                  fontSize: "0.8rem", fontWeight: active ? 600 : 400,
                  textDecoration: "none", whiteSpace: "nowrap",
                  transition: "all 0.15s",
                  background: active ? "var(--accent)" : "transparent",
                  color: active ? "var(--accent-fg)" : "var(--text-2)",
                }}
                  onMouseEnter={e => { if (!active) (e.target as HTMLElement).style.color = "var(--text)"; }}
                  onMouseLeave={e => { if (!active) (e.target as HTMLElement).style.color = "var(--text-2)"; }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Theme toggle */}
            <button onClick={toggleTheme} title={dark ? "Light Mode" : "Dark Mode"} style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "var(--surface)", border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "background 0.2s, border-color 0.2s",
            }}>
              {dark
                ? <Sun size={14} color="var(--text-2)" />
                : <Moon size={14} color="var(--text-2)" />
              }
            </button>

            {/* Bell */}
            <button style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "var(--surface)", border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative", transition: "background 0.2s",
            }}>
              <Bell size={14} color="var(--text-2)" />
              <span style={{
                position: "absolute", top: 7, right: 7,
                width: 6, height: 6, background: "var(--accent)",
                borderRadius: "50%", border: "1.5px solid var(--bg)",
              }} />
            </button>

            {/* Avatar */}
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: isAdmin ? "var(--accent-dim2)" : "var(--surface-2)",
              border: "1px solid var(--border-2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.7rem", fontWeight: 700,
              color: isAdmin ? "var(--accent-text)" : "var(--text)",
            }}>
              {userInitials}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {children}
      </main>
    </div>
  );
}
