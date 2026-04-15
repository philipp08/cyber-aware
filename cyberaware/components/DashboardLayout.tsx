"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Shield } from "lucide-react";
import AiChat from "@/components/AiChat";

interface NavItem { href: string; label: string; }

const employeeNav: NavItem[] = [
  { href: "/dashboard",      label: "Übersicht" },
  { href: "/modules",        label: "Module" },
  { href: "/exam",           label: "Prüfung" },
  { href: "/certificate",    label: "Zertifikat" },
  { href: "/leaderboard",    label: "Rangliste" },
  { href: "/knowledge-base", label: "Wissen" },
];

const adminNav: NavItem[] = [
  { href: "/admin",          label: "Dashboard" },
  { href: "/admin/users",    label: "Mitarbeiter" },
  { href: "/admin/phishing", label: "Phishing" },
  { href: "/admin/reports",  label: "Berichte" },
  { href: "/knowledge-base", label: "Wissen" },
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

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Top Nav */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(250,251,253,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "0 1.5rem",
          height: 56,
          display: "flex", alignItems: "center", gap: "1.5rem",
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={17} color="#fff" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)", letterSpacing: "-0.02em" }}>
              CyberAware
            </span>
            {isAdmin && (
              <span style={{ fontSize: "0.6rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: 100, background: "var(--accent-dim2)", color: "var(--accent-text)" }}>
                Admin
              </span>
            )}
          </Link>

          {/* Nav pills */}
          <nav style={{ display: "flex", gap: 2, flex: 1, overflowX: "auto" }}>
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} style={{
                  padding: "0.35rem 0.9rem", borderRadius: 8,
                  fontSize: "0.82rem", fontWeight: active ? 600 : 400,
                  textDecoration: "none", whiteSpace: "nowrap",
                  transition: "all 0.15s",
                  background: active ? "var(--accent-dim)" : "transparent",
                  color: active ? "var(--accent-text)" : "var(--text-2)",
                }}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button style={{
              width: 34, height: 34, borderRadius: 8,
              background: "var(--surface)", border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative",
            }}>
              <Bell size={15} color="var(--text-2)" />
              <span style={{
                position: "absolute", top: 7, right: 7,
                width: 6, height: 6, background: "var(--accent)",
                borderRadius: "50%", border: "1.5px solid var(--surface)",
              }} />
            </button>

            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: isAdmin ? "var(--accent-dim2)" : "var(--surface-2)",
              border: "1px solid var(--border)",
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
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {children}
      </main>

      <AiChat />
    </div>
  );
}
