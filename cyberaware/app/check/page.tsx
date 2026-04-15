"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Shield, Search, CheckCircle, XCircle } from "lucide-react";

const CERT_DB: Record<string, {
  name: string; company: string; department: string;
  level: "Gold" | "Silber" | "Bronze";
  issued: string; expires: string; modules: number; score: number;
}> = {
  "CA7F3B91E2D40158": { name: "Sarah Müller",   company: "Example GmbH", department: "Marketing", level: "Bronze", issued: "22.01.2024", expires: "22.01.2025", modules: 4, score: 76 },
  "CA8A3F2B1C9E0471": { name: "Thomas Weber",   company: "Example GmbH", department: "IT",        level: "Gold",   issued: "15.03.2024", expires: "15.03.2025", modules: 8, score: 94 },
  "CA1D5E7A2F8B3C04": { name: "Anna Schmidt",   company: "Example GmbH", department: "Finance",   level: "Silber", issued: "28.02.2024", expires: "28.02.2025", modules: 8, score: 82 },
  "CA4C2A8E1F3D7B90": { name: "Michael Bauer",  company: "Example GmbH", department: "HR",        level: "Silber", issued: "30.01.2024", expires: "30.01.2025", modules: 7, score: 81 },
  "CA5B3D9C2E8A1F04": { name: "Julia Fischer",  company: "Example GmbH", department: "Sales",     level: "Bronze", issued: "10.01.2024", expires: "10.01.2025", modules: 4, score: 72 },
};

function levelEmoji(level: string) { return level === "Gold" ? "🥇" : level === "Silber" ? "🥈" : "🥉"; }
function levelColor(level: string) { return level === "Gold" ? "#3A5800" : level === "Silber" ? "#4A4A62" : "#C06000"; }
function levelBg(level: string)    { return level === "Gold" ? "rgba(180,230,0,0.22)" : level === "Silber" ? "rgba(0,0,0,0.06)" : "rgba(192,96,0,0.10)"; }

function CheckContent() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<"idle" | "checking" | "found" | "notfound">("idle");
  const [cert, setCert] = useState<typeof CERT_DB[string] | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) { setInput(id); lookup(id); }
  }, [searchParams]);

  function lookup(id?: string) {
    const query = (id ?? input).trim().toUpperCase();
    setResult("checking");
    setTimeout(() => {
      const found = CERT_DB[query];
      if (found) { setCert(found); setResult("found"); }
      else { setCert(null); setResult("notfound"); }
    }, 700);
  }

  function handleSubmit(e: React.FormEvent) { e.preventDefault(); lookup(); }

  return (
    <>
      <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 20, padding: "2rem", marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)" }}>
        <p style={{ fontSize: "0.82rem", color: "#4A4A62", marginBottom: "1.25rem", lineHeight: 1.6 }}>
          Geben Sie eine Zertifikat-ID ein, um die Authentizität eines CyberAware-Zertifikats zu prüfen.
          Die ID finden Sie auf dem ausgestellten Zertifikat.
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={14} color="#8888A8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="CA7F3B91E2D40158"
                style={{
                  width: "100%", background: "#F4F4FA",
                  border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12,
                  padding: "0.8rem 1rem 0.8rem 2.5rem",
                  fontSize: "0.9rem", fontFamily: "monospace",
                  color: "#0D0D16", outline: "none", letterSpacing: "0.05em",
                }}
              />
            </div>
            <button type="submit" style={{ padding: "0.8rem 1.5rem", background: "#CCFF00", color: "#0C0C0F", fontWeight: 700, fontSize: "0.85rem", border: "none", borderRadius: 12, cursor: "pointer", flexShrink: 0 }}>
              Prüfen
            </button>
          </div>
        </form>
        <div style={{ marginTop: "1rem" }}>
          <p style={{ fontSize: "0.68rem", color: "#8888A8", marginBottom: 6 }}>Beispiel-IDs zum Testen:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {Object.keys(CERT_DB).slice(0, 3).map(id => (
              <button key={id} onClick={() => { setInput(id); lookup(id); }}
                style={{ padding: "0.2rem 0.65rem", borderRadius: 100, fontSize: "0.65rem", fontFamily: "monospace", background: "#EDEDF5", border: "1px solid rgba(0,0,0,0.07)", color: "#4A4A62", cursor: "pointer" }}>
                {id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {result === "checking" && (
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 20, padding: "2rem", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "inline-block", width: 24, height: 24, border: "2.5px solid #E2E2EE", borderTopColor: "#CCFF00", borderRadius: "50%", animation: "spin 0.7s linear infinite", marginBottom: 12 }} />
          <div style={{ fontSize: "0.85rem", color: "#4A4A62" }}>Datenbank wird abgefragt…</div>
        </div>
      )}

      {result === "found" && cert && (
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 20, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)" }}>
          <div style={{ height: 3, background: "#CCFF00" }} />
          <div style={{ padding: "1.75rem 2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
              <CheckCircle size={20} color="#007840" />
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#007840" }}>Zertifikat gültig</div>
                <div style={{ fontSize: "0.7rem", color: "#8888A8" }}>Authentizität bestätigt</div>
              </div>
              <span style={{ marginLeft: "auto", fontSize: "2rem" }}>{levelEmoji(cert.level)}</span>
            </div>
            <div style={{ background: "#F4F4FA", borderRadius: 16, padding: "1.25rem", marginBottom: "1.25rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", color: "#8888A8", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Zertifikat verliehen an</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#0D0D16" }}>{cert.name}</div>
              <div style={{ fontSize: "0.82rem", color: "#4A4A62", marginTop: 2 }}>{cert.company} · {cert.department}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: "1.25rem" }}>
              {([
                ["Zertifikat-Level", `${cert.level} ${levelEmoji(cert.level)}`],
                ["Prüfungsnote", `${cert.score}%`],
                ["Abgeschlossene Module", `${cert.modules}/8`],
                ["Ausgestellt am", cert.issued],
                ["Gültig bis", cert.expires],
                ["Aussteller", "CyberAware GmbH"],
              ] as [string,string][]).map(([k, v]) => (
                <div key={k} style={{ background: "#F4F4FA", borderRadius: 12, padding: "0.85rem 1rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "#8888A8", marginBottom: 3 }}>{k}</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#0D0D16" }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(0,120,64,0.07)", border: "1px solid rgba(0,120,64,0.15)", borderRadius: 12, padding: "0.85rem 1rem", fontSize: "0.75rem", color: "#007840", lineHeight: 1.6 }}>
              ✓ Dieses Zertifikat wurde von CyberAware ausgestellt und ist in unserer Datenbank registriert.
            </div>
          </div>
        </div>
      )}

      {result === "notfound" && (
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(212,32,32,0.2)", borderRadius: 20, padding: "1.75rem 2rem", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
            <XCircle size={20} color="#D42020" />
            <div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#D42020" }}>Zertifikat nicht gefunden</div>
              <div style={{ fontSize: "0.7rem", color: "#8888A8" }}>Diese ID ist nicht in unserer Datenbank</div>
            </div>
          </div>
          <ul style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {["Die ID wurde falsch eingegeben", "Das Zertifikat existiert nicht oder wurde nicht von CyberAware ausgestellt", "Das Zertifikat wurde widerrufen"].map(s => (
              <li key={s} style={{ fontSize: "0.75rem", color: "#4A4A62", display: "flex", gap: 8 }}>
                <span style={{ color: "#D42020", flexShrink: 0 }}>·</span>{s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default function CheckPage() {
  return (
    <div style={{ background: "#F4F4FA", minHeight: "100vh" }}>
      <header style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 1.5rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{ width: 28, height: 28, background: "#CCFF00", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={16} color="#0C0C0F" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0D0D16" }}>CyberAware</span>
          </Link>
          <span style={{ fontSize: "0.72rem", color: "#8888A8" }}>Zertifikat-Verifikation</span>
        </div>
      </header>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, background: "#CCFF00", borderRadius: 16, marginBottom: "1rem" }}>
            <Shield size={24} color="#0C0C0F" />
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#0D0D16", marginBottom: "0.5rem" }}>
            Zertifikat prüfen
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#4A4A62" }}>
            Überprüfen Sie die Echtheit eines CyberAware-Zertifikats
          </p>
        </div>
        <Suspense fallback={<div style={{ textAlign: "center", padding: "2rem", color: "#8888A8" }}>Lädt…</div>}>
          <CheckContent />
        </Suspense>
        <p style={{ textAlign: "center", fontSize: "0.7rem", color: "#8888A8", marginTop: "2rem" }}>
          Öffentlich zugänglich · Keine Anmeldung erforderlich ·{" "}
          <Link href="/" style={{ color: "#3A5800", textDecoration: "none" }}>CyberAware Platform</Link>
        </p>
      </div>
    </div>
  );
}
