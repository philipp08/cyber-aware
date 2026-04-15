"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Shield, Search, CheckCircle, XCircle } from "lucide-react";

/* ─── Certificate Database ────────────────────────────────── */
const CERT_DB: Record<string, {
  name: string;
  company: string;
  department: string;
  level: "Gold" | "Silber" | "Bronze";
  issued: string;
  expires: string;
  modules: number;
  score: number;
}> = {
  "CA7F3B91E2D40158": { name: "Sarah Müller", company: "Example GmbH", department: "Marketing", level: "Bronze", issued: "22.01.2024", expires: "22.01.2025", modules: 4, score: 76 },
  "CA8A3F2B1C9E0471": { name: "Thomas Weber", company: "Example GmbH", department: "IT", level: "Gold", issued: "15.03.2024", expires: "15.03.2025", modules: 8, score: 94 },
  "CA1D5E7A2F8B3C04": { name: "Anna Schmidt", company: "Example GmbH", department: "Finance", level: "Silber", issued: "28.02.2024", expires: "28.02.2025", modules: 8, score: 82 },
  "CA4C2A8E1F3D7B90": { name: "Michael Bauer", company: "Example GmbH", department: "HR", level: "Silber", issued: "30.01.2024", expires: "30.01.2025", modules: 7, score: 81 },
  "CA5B3D9C2E8A1F04": { name: "Julia Fischer", company: "Example GmbH", department: "Sales", level: "Bronze", issued: "10.01.2024", expires: "10.01.2025", modules: 4, score: 72 },
};

function levelEmoji(level: string) {
  return level === "Gold" ? "🥇" : level === "Silber" ? "🥈" : "🥉";
}
function levelColor(level: string) {
  return level === "Gold" ? "#CCFF00" : level === "Silber" ? "#C8C8D4" : "#F59E0B";
}

function CheckContent() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<"idle" | "checking" | "found" | "notfound">("idle");
  const [cert, setCert] = useState<typeof CERT_DB[string] | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setInput(id);
      lookup(id);
    }
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    lookup();
  }

  return (
    <>
      {/* Search card */}
      <div style={{ background: "#111116", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "2rem", marginBottom: 16 }}>
        <p style={{ fontSize: "0.82rem", color: "#8A8A96", marginBottom: "1.25rem", lineHeight: 1.6 }}>
          Geben Sie eine Zertifikat-ID ein, um die Authentizität eines CyberAware-Zertifikats zu prüfen.
          Die ID finden Sie auf dem ausgestellten Zertifikat.
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={14} color="#585862" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="CA7F3B91E2D40158"
                style={{
                  width: "100%",
                  background: "#1A1A1E",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "0.8rem 1rem 0.8rem 2.5rem",
                  fontSize: "0.9rem",
                  fontFamily: "monospace",
                  color: "#F0F0F2",
                  outline: "none",
                  letterSpacing: "0.05em",
                }}
              />
            </div>
            <button type="submit" style={{
              padding: "0.8rem 1.5rem",
              background: "#CCFF00",
              color: "#0C0C0F",
              fontWeight: 700,
              fontSize: "0.85rem",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              flexShrink: 0,
            }}>
              Prüfen
            </button>
          </div>
        </form>

        {/* Example IDs */}
        <div style={{ marginTop: "1rem" }}>
          <p style={{ fontSize: "0.68rem", color: "#585862", marginBottom: 6 }}>Beispiel-IDs zum Testen:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {Object.keys(CERT_DB).slice(0, 3).map(id => (
              <button key={id} onClick={() => { setInput(id); lookup(id); }}
                style={{ padding: "0.2rem 0.65rem", borderRadius: 100, fontSize: "0.65rem", fontFamily: "monospace", background: "#222228", border: "1px solid rgba(255,255,255,0.07)", color: "#8A8A96", cursor: "pointer" }}>
                {id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      {result === "checking" && (
        <div style={{ background: "#111116", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2rem", textAlign: "center" }}>
          <div style={{ display: "inline-block", width: 24, height: 24, border: "2.5px solid #585862", borderTopColor: "#CCFF00", borderRadius: "50%", animation: "spin 0.7s linear infinite", marginBottom: 12 }} />
          <div style={{ fontSize: "0.85rem", color: "#8A8A96" }}>Datenbank wird abgefragt…</div>
        </div>
      )}

      {result === "found" && cert && (
        <div style={{ background: "#111116", border: "1px solid rgba(0,217,126,0.3)", borderRadius: 20, overflow: "hidden", animation: "fadeUp 0.3s ease" }}>
          <div style={{ height: 3, background: levelColor(cert.level) }} />
          <div style={{ padding: "1.75rem 2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
              <CheckCircle size={20} color="#00D97E" />
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#00D97E" }}>Zertifikat gültig</div>
                <div style={{ fontSize: "0.7rem", color: "#585862" }}>Authentizität bestätigt</div>
              </div>
              <span style={{ marginLeft: "auto", fontSize: "2rem" }}>{levelEmoji(cert.level)}</span>
            </div>

            <div style={{ background: "#1A1A1E", borderRadius: 16, padding: "1.25rem", marginBottom: "1.25rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", color: "#585862", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Zertifikat verliehen an</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#F0F0F2" }}>{cert.name}</div>
              <div style={{ fontSize: "0.82rem", color: "#8A8A96", marginTop: 2 }}>{cert.company} · {cert.department}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: "1.25rem" }}>
              {[
                ["Zertifikat-Level", `${cert.level} ${levelEmoji(cert.level)}`],
                ["Prüfungsnote", `${cert.score}%`],
                ["Abgeschlossene Module", `${cert.modules}/8`],
                ["Ausgestellt am", cert.issued],
                ["Gültig bis", cert.expires],
                ["Aussteller", "CyberAware GmbH"],
              ].map(([k, v]) => (
                <div key={k} style={{ background: "#1A1A1E", borderRadius: 12, padding: "0.85rem 1rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "#585862", marginBottom: 3 }}>{k}</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#F0F0F2" }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(0,217,126,0.06)", border: "1px solid rgba(0,217,126,0.15)", borderRadius: 12, padding: "0.85rem 1rem", fontSize: "0.75rem", color: "#00D97E", lineHeight: 1.6 }}>
              ✓ Dieses Zertifikat wurde von CyberAware ausgestellt und ist in unserer Datenbank registriert.
              Die angegebene Person hat die Schulung erfolgreich absolviert.
            </div>
          </div>
        </div>
      )}

      {result === "notfound" && (
        <div style={{ background: "#111116", border: "1px solid rgba(255,69,69,0.3)", borderRadius: 20, padding: "1.75rem 2rem", animation: "fadeUp 0.3s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
            <XCircle size={20} color="#FF4545" />
            <div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#FF4545" }}>Zertifikat nicht gefunden</div>
              <div style={{ fontSize: "0.7rem", color: "#585862" }}>Diese ID ist nicht in unserer Datenbank</div>
            </div>
          </div>
          <p style={{ fontSize: "0.78rem", color: "#8A8A96", lineHeight: 1.65 }}>
            Die eingegebene Zertifikat-ID konnte nicht verifiziert werden. Mögliche Ursachen:
          </p>
          <ul style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: 5 }}>
            {["Die ID wurde falsch eingegeben (Groß-/Kleinschreibung beachten)", "Das Zertifikat existiert nicht oder wurde nicht von CyberAware ausgestellt", "Das Zertifikat wurde widerrufen"].map(s => (
              <li key={s} style={{ fontSize: "0.75rem", color: "#585862", display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: "#FF4545", flexShrink: 0 }}>·</span>{s}
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
    <div style={{ background: "#F0F0F4", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ background: "rgba(17,17,22,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 1.5rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{ width: 28, height: 28, background: "#CCFF00", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={16} color="#0C0C0F" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#F0F0F2" }}>CyberAware</span>
          </Link>
          <span style={{ fontSize: "0.72rem", color: "#585862" }}>Zertifikat-Verifikation</span>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Page header */}
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, background: "#111116", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, marginBottom: "1rem" }}>
            <Shield size={24} color="#CCFF00" />
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#111116", marginBottom: "0.5rem" }}>
            Zertifikat prüfen
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#585862" }}>
            Überprüfen Sie die Echtheit eines CyberAware-Zertifikats
          </p>
        </div>

        <Suspense fallback={<div style={{ textAlign: "center", padding: "2rem", color: "#585862" }}>Lädt…</div>}>
          <CheckContent />
        </Suspense>

        {/* Footer note */}
        <p style={{ textAlign: "center", fontSize: "0.7rem", color: "#8A8A96", marginTop: "2rem" }}>
          Diese Seite ist öffentlich zugänglich und erfordert keine Anmeldung. ·{" "}
          <Link href="/" style={{ color: "#CCFF00", textDecoration: "none" }}>CyberAware Platform</Link>
        </p>
      </div>
    </div>
  );
}
