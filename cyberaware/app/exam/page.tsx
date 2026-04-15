"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { examQuestions, currentUser } from "@/lib/data";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { S } from "@/lib/theme";

type Phase = "intro" | "exam" | "result";

export default function ExamPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [sel, setSel] = useState<number | null>(null);

  const questions = useMemo(() => [...examQuestions].sort(() => Math.random() - 0.5).slice(0, Math.min(30, examQuestions.length)), []);

  const q = questions[qi];
  const correct = answers.filter((a, i) => a === questions[i]?.correctIndex).length;
  const score = questions.length ? Math.round((correct / questions.length) * 100) : 0;
  const passed = score >= 70;

  function start() { setAnswers(new Array(questions.length).fill(null)); setPhase("exam"); }
  function next() {
    if (sel === null) return;
    const a = [...answers]; a[qi] = sel; setAnswers(a); setSel(null);
    qi + 1 < questions.length ? setQi(qi + 1) : setPhase("result");
  }

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* INTRO */}
        {phase === "intro" && (
          <>
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Prüfung</p>
              <h1 style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em" }}>Abschlussprüfung</h1>
            </div>

            {/* Stats bento */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: "1.5rem" }}>
              {[
                { n: "30", l: "Fragen" },
                { n: "70%", l: "Bestehen" },
                { n: `${3 - currentUser.examAttempts}/3`, l: "Versuche übrig" },
                { n: "45 Min", l: "Zeitlimit" },
              ].map(s => (
                <div key={s.l} style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 16, padding: "1rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.03em" }}>{s.n}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-2)", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Topics */}
            <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 14, padding: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Prüfungsinhalt</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {["Internetgrundlagen", "Phishing-Erkennung", "Passwort-Sicherheit", "DSGVO-Grundlagen", "Gerätesicherheit", "E-Mail-Sicherheit", "Cloud-Dienste", "Mobile Sicherheit"].map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8rem", color: "var(--text-2)" }}>
                    <span style={{ width: 5, height: 5, background: S.accent, borderRadius: "50%", flexShrink: 0 }} />{t}
                  </div>
                ))}
              </div>
            </div>

            {/* Previous attempt */}
            {currentUser.examAttempts > 0 && (
              <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 14, padding: "1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-2)", marginBottom: 3 }}>Letzter Versuch</div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600 }}>Versuch 1 · {currentUser.examScore}%</div>
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "0.25rem 0.6rem", borderRadius: 8,
                  background: currentUser.examScore! >= 70 ? "var(--green-dim2)" : "var(--red-dim2)",
                  color: currentUser.examScore! >= 70 ? S.green : S.red,
                }}>
                  {currentUser.examScore! >= 70 ? "Bestanden" : "Nicht bestanden"}
                </span>
              </div>
            )}

            {/* Cert levels */}
            <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 14, padding: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Erreichbare Zertifikate</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { e: "🥉", l: "Bronze", req: "70%+  · 4 Pflichtmodule" },
                  { e: "🥈", l: "Silber", req: "80%+  · 8 Module + Phishing-Sim." },
                  { e: "🥇", l: "Gold", req: "90%+  · Alle Module, 0 Phishing-Klicks" },
                ].map(c => (
                  <div key={c.l} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", background: "var(--surface-2)", borderRadius: 12 }}>
                    <span style={{ fontSize: "1.4rem" }}>{c.e}</span>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700 }}>{c.l}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-2)" }}>{c.req}</div>
                    </div>
                    {currentUser.certLevel === c.l && <CheckCircle size={14} color={S.accent} style={{ marginLeft: "auto" }} />}
                  </div>
                ))}
              </div>
            </div>

            <button onClick={start} disabled={3 - currentUser.examAttempts <= 0}
              style={{ width: "100%", padding: "0.85rem", background: S.accent, color: "#fff", fontWeight: 700, fontSize: "0.9rem", border: "none", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: 3 - currentUser.examAttempts <= 0 ? 0.4 : 1 }}>
              Prüfung starten (Versuch {currentUser.examAttempts + 1}/3) <ArrowRight size={16} />
            </button>
          </>
        )}

        {/* EXAM */}
        {phase === "exam" && q && (
          <>
            {/* Progress */}
            <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 16, padding: "1rem 1.25rem", marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>Frage {qi + 1} / {questions.length}</span>
              <div style={{ width: 200, height: 4, background: "var(--surface-2)", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ width: `${((qi + 1) / questions.length) * 100}%`, height: "100%", background: S.accent, borderRadius: 10, transition: "width 0.3s" }} />
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-2)" }}>{Math.round(((qi + 1) / questions.length) * 100)}%</span>
            </div>

            <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 16, padding: "2rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.2rem 0.55rem", borderRadius: 10, marginBottom: "1.25rem", display: "inline-block",
                background: q.type === "scenario" ? "rgba(139,92,246,0.15)" : "rgba(59,130,246,0.15)",
                color: q.type === "scenario" ? "#A78BFA" : "#60A5FA",
              }}>
                {q.type === "scenario" ? "Szenario" : "Multiple Choice"}
              </span>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.45, marginBottom: "1.5rem" }}>{q.question}</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
                {q.options.map((opt, i) => (
                  <button key={i} onClick={() => setSel(i)}
                    style={{ textAlign: "left", padding: "0.85rem 1rem", borderRadius: 14, border: `1px solid ${sel === i ? "var(--accent-dim3)" : S.border}`, background: sel === i ? "var(--accent-dim)" : "var(--surface-2)", color: sel === i ? "var(--text)" : "var(--text-2)", fontSize: "0.85rem", cursor: "pointer", display: "flex", gap: 10, alignItems: "flex-start", transition: "all 0.12s" }}>
                    <span style={{ width: 22, height: 22, borderRadius: "50%", border: `1.5px solid ${sel === i ? S.accent : S.text3}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0 }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {Array.from({ length: Math.min(8, questions.length) }).map((_, i) => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i < qi ? S.text3 : i === qi ? S.accent : "var(--surface-2)" }} />
                  ))}
                  {questions.length > 8 && <span style={{ fontSize: "0.65rem", color: "var(--text-2)" }}>+{questions.length - 8}</span>}
                </div>
                <button onClick={next} disabled={sel === null}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.65rem 1.5rem", background: sel === null ? "var(--surface-2)" : S.accent, color: sel === null ? "var(--text-2)" : "#fff", fontWeight: 700, fontSize: "0.85rem", border: "none", borderRadius: 10, cursor: sel === null ? "not-allowed" : "pointer" }}>
                  {qi + 1 < questions.length ? "Weiter" : "Abgeben"} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* RESULT */}
        {phase === "result" && (
          <div>
            <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 16, padding: "3rem 2rem", textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "5rem", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, color: passed ? "var(--accent-text)" : "var(--text)", marginBottom: "0.5rem" }}>
                {score}<span style={{ fontSize: "2.5rem", color: "var(--text-2)" }}>%</span>
              </div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                {passed ? "Bestanden 🎉" : "Nicht bestanden"}
              </div>
              <div style={{ color: "var(--text-2)", fontSize: "0.85rem", marginBottom: "2rem" }}>
                {correct} von {questions.length} Fragen richtig
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: "2rem" }}>
                {[
                  { n: correct, l: "Richtig", c: S.green },
                  { n: questions.length - correct, l: "Falsch", c: S.red },
                  { n: `${score}%`, l: "Ergebnis", c: S.accent },
                ].map(s => (
                  <div key={s.l} style={{ background: "var(--surface-2)", borderRadius: 14, padding: "1rem" }}>
                    <div style={{ fontSize: "1.8rem", fontWeight: 700, color: s.c, letterSpacing: "-0.03em" }}>{s.n}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-2)" }}>{s.l}</div>
                  </div>
                ))}
              </div>

              {passed && (
                <div style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-dim3)", borderRadius: 14, padding: "1rem", marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--accent-text)" }}>
                  {score >= 90 ? "🥇 Gold-Zertifikat möglich!" : score >= 80 ? "🥈 Silber-Zertifikat möglich!" : "🥉 Bronze-Zertifikat ausgestellt!"}
                </div>
              )}

              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/modules" style={{ padding: "0.65rem 1.25rem", border: `1px solid ${S.border}`, background: "transparent", color: "var(--text-2)", borderRadius: 10, textDecoration: "none", fontSize: "0.85rem" }}>
                  Module wiederholen
                </Link>
                {passed && (
                  <Link href="/certificate" style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.65rem 1.5rem", background: S.accent, color: "#fff", fontWeight: 700, fontSize: "0.85rem", borderRadius: 10, textDecoration: "none" }}>
                    Zertifikat ansehen <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>

            {/* Answer review */}
            <div style={{ background: "var(--surface)", border: `1px solid ${S.border}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: `1px solid ${S.border}` }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>Antworten-Übersicht</span>
              </div>
              <div style={{ maxHeight: 320, overflowY: "auto" }}>
                {questions.slice(0, 10).map((q, i) => {
                  const ok = answers[i] === q.correctIndex;
                  return (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "0.85rem 1.5rem", borderBottom: `1px solid ${S.border}` }}>
                      {ok ? <CheckCircle size={14} color={S.green} style={{ flexShrink: 0, marginTop: 2 }} /> : <XCircle size={14} color={S.red} style={{ flexShrink: 0, marginTop: 2 }} />}
                      <div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text)", marginBottom: 2 }}>{i + 1}. {q.question}</div>
                        {!ok && <div style={{ fontSize: "0.72rem", color: S.green }}>✓ {q.options[q.correctIndex]}</div>}
                      </div>
                    </div>
                  );
                })}
                {questions.length > 10 && <div style={{ padding: "0.75rem", textAlign: "center", fontSize: "0.75rem", color: "var(--text-2)" }}>+{questions.length - 10} weitere</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
