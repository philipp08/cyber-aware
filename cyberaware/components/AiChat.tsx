"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { S } from "@/lib/theme";
import { knowledgeBase } from "@/lib/data";

interface Message {
  role: "user" | "ai";
  text: string;
}

/* Simple local AI: searches knowledgeBase + static Q&A */
function getAiResponse(question: string): string {
  const q = question.toLowerCase().trim();

  // 1. Fallback responses (First priority for common topics)
  const fallbacks: [RegExp, string][] = [
    [
      /passw[oö]rt|kennwort|password/i,
      "Ein sicheres Passwort sollte mindestens 16 Zeichen lang sein und Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen enthalten. Am besten nutzen Sie einen **Passwortmanager** wie Bitwarden oder 1Password und aktivieren **2FA/MFA** für alle wichtigen Konten.\n\n[MODULE:3:Sichere Passwörter]",
    ],
    [
      /phish/i,
      "Um Phishing zu erkennen, achten Sie auf: ① Dringlichkeit/Drohungen ② Unbekannter oder gefälschter Absender ③ Grammatikfehler ④ Verdächtige Links (Hover!) ⑤ Unerwartete Anhänge. Im Zweifel: **Nicht klicken, IT-Abteilung informieren.**\n\n[MODULE:2:Phishing erkennen]",
    ],
    [
      /dsgvo|datenschutz|daten/i,
      "Die DSGVO regelt seit 2018 den Umgang mit personenbezogenen Daten in der EU. Kernprinzipien: Zweckbindung, Datenminimierung, Speicherbegrenzung. Betroffene haben Recht auf Auskunft, Löschung und Datenportabilität.\n\n[MODULE:4:DSGVO Grundlagen]",
    ],
    [
      /vpn|wlan|netzwerk/i,
      "Ein VPN verschlüsselt Ihren Internetverkehr und ist besonders wichtig bei öffentlichen WLANs. Im Unternehmenskontext ermöglicht es sicheren Zugriff auf interne Ressourcen. **Firmeneigene VPNs sind Pflicht im Homeoffice.**\n\n[MODULE:5:Gerätesicherheit]",
    ],
    [
      /email|e-mail|mail/i,
      "E-Mail-Sicherheit basiert auf drei Säulen: **SPF** (autorisierte Absender-Server), **DKIM** (digitale Signatur) und **DMARC** (Richtlinie für gescheiterte Prüfungen). Verdächtige E-Mails niemals öffnen – sofort IT melden.",
    ],
    [
      /hallo|hi|hilfe|help/i,
      "Hallo! 👋 Ich bin der CyberAware KI-Assistent. Fragen Sie mich zu jedem Thema rund um IT-Sicherheit, Datenschutz, Phishing oder Compliance. Ich durchsuche für Sie die Wissensdatenbank mit über 150 Fachbegriffen.",
    ],
  ];

  for (const [regex, answer] of fallbacks) {
    if (regex.test(q)) return answer;
  }

  // 2. Search knowledge base
  // Exact or strong term matches
  const exactMatches = knowledgeBase.filter(k => k.term.toLowerCase() === q || q.includes(k.term.toLowerCase()));
  
  if (exactMatches.length > 0) {
    // Return the best match directly
    const best = exactMatches[0];
    return `**${best.term}**\n\n${best.definition}\n\n_Kategorie: ${best.category}_`;
  }

  // Deep text match based on significant words from user question
  const stopwords = ['was', 'ist', 'wie', 'der', 'die', 'das', 'ein', 'eine', 'und', 'oder', 'ich', 'mich', 'mir', 'sichere', 'erstelle', 'machen'];
  const qWords = q.split(/[\s?.,!]+/).filter(w => w.length > 3 && !stopwords.includes(w));
  
  if (qWords.length > 0) {
    // Score matches to get the most relevant ones, rather than random first ones
    const deepMatches = knowledgeBase.map((k) => {
      let score = 0;
      for (const w of qWords) {
        if (k.term.toLowerCase().includes(w)) score += 3; // Term match is very strong
        else if (k.definition.toLowerCase().includes(w)) score += 1;
      }
      return { item: k, score };
    }).filter(m => m.score > 0).sort((a, b) => b.score - a.score);

    if (deepMatches.length > 0) {
      if (deepMatches[0].score >= 3 && deepMatches.length === 1) {
        const best = deepMatches[0].item;
        return `**${best.term}**\n\n${best.definition}\n\n_Kategorie: ${best.category}_`;
      }
      return (
        deepMatches
          .slice(0, 3)
          .map((m) => `**${m.item.term}** — ${m.item.definition}`)
          .join("\n\n") +
        (deepMatches.length > 3
          ? `\n\n_…und ${deepMatches.length - 3} weitere Treffer. Fragen Sie spezifischer!_`
          : "")
      );
    }
  }

  return "Das ist eine gute Frage! Leider konnte ich dazu keinen passenden Eintrag in der Wissensdatenbank finden. Versuchen Sie es mit spezifischeren Begriffen wie z.B. 'Phishing', 'DSGVO', '2FA' oder 'Ransomware'. Tipp: In der **Wissensdatenbank** finden Sie über 150 Fachbegriffe zum Nachschlagen.";
}

export default function AiChat({ moduleName }: { moduleName?: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function send() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      const response = getAiResponse(userMsg);
      setMessages((m) => [...m, { role: "ai", text: response }]);
      setTyping(false);
    }, 600 + Math.random() * 800);
  }

  return (
    <>
      {/* FAB */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(15,118,110,0.35)",
            zIndex: 1000,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.boxShadow =
              "0 6px 28px rgba(15,118,110,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 4px 20px rgba(15,118,110,0.35)";
          }}
        >
          <Sparkles size={24} />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            width: 380,
            maxHeight: "70vh",
            background: "var(--surface)",
            border: `1px solid ${S.border}`,
            borderRadius: 20,
            boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "fadeUp 0.25s ease-out",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 1.25rem",
              borderBottom: `1px solid ${S.border}`,
              background: "var(--accent)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bot size={18} color="#fff" />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  KI-Assistent
                </div>
                <div
                  style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.7)" }}
                >
                  {moduleName || "Fragen zu IT-Sicherheit"}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: 8,
                width: 30,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={16} color="#fff" />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              minHeight: 280,
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem 1rem",
                  color: "var(--text-3)",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "var(--accent-dim)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                  }}
                >
                  <Sparkles size={22} color="var(--accent)" />
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: 6,
                  }}
                >
                  CyberAware KI
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-2)",
                    lineHeight: 1.5,
                    marginBottom: 16,
                  }}
                >
                  Stellen Sie Fragen zu IT-Sicherheit, Datenschutz oder
                  Compliance. Ich durchsuche über 150 Fachbegriffe für Sie.
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {[
                    "Was ist Phishing?",
                    "Wie erstelle ich sichere Passwörter?",
                    "Was regelt die DSGVO?",
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setInput(s);
                        setTimeout(() => {
                          setMessages((m) => [...m, { role: "user", text: s }]);
                          setTyping(true);
                          setTimeout(() => {
                            setMessages((m) => [
                              ...m,
                              { role: "ai", text: getAiResponse(s) },
                            ]);
                            setTyping(false);
                          }, 700);
                        }, 100);
                      }}
                      style={{
                        background: "var(--surface-2)",
                        border: `1px solid ${S.border}`,
                        borderRadius: 10,
                        padding: "0.5rem 0.85rem",
                        fontSize: "0.75rem",
                        color: "var(--text-2)",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                  flexDirection: msg.role === "user" ? "row-reverse" : "row",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background:
                      msg.role === "ai"
                        ? "var(--accent)"
                        : "var(--surface-2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {msg.role === "ai" ? (
                    <Bot size={14} color="#fff" />
                  ) : (
                    <User size={14} color="var(--text-2)" />
                  )}
                </div>
                <div
                  style={{
                    background:
                      msg.role === "ai"
                        ? "var(--surface-2)"
                        : "var(--accent)",
                    color: msg.role === "ai" ? "var(--text)" : "#fff",
                    padding: "0.65rem 0.85rem",
                    borderRadius:
                      msg.role === "ai"
                        ? "4px 14px 14px 14px"
                        : "14px 4px 14px 14px",
                    fontSize: "0.8rem",
                    lineHeight: 1.55,
                    maxWidth: "85%",
                    whiteSpace: "pre-wrap",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong style="font-weight:700">$1</strong>'
                      )
                      .replace(
                        /_(.*?)_/g,
                        '<em style="opacity:0.7;font-size:0.72rem">$1</em>'
                      )
                      .replace(
                        /\[MODULE:(\d+):(.*?)\]/g,
                        '<a href="/modules/$1" style="display:flex;align-items:center;gap:10px;padding:12px 14px;background:var(--surface);border:1px solid rgba(15,118,110,0.15);border-radius:12px;text-decoration:none;color:var(--text);margin-top:14px;margin-bottom:4px;font-weight:600;font-size:0.82rem;transition:all 0.2s" onmouseover="this.style.background=\'rgba(15,118,110,0.04)\';this.style.borderColor=\'rgba(15,118,110,0.3)\'" onmouseout="this.style.background=\'var(--surface)\';this.style.borderColor=\'rgba(15,118,110,0.15)\'"><span style="background:rgba(15,118,110,0.1);color:#0F766E;width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:0.85rem">📚</span>$2<span style="margin-left:auto;color:#0F766E;font-size:1.1rem;line-height:1">→</span></a>'
                      ),
                  }}
                />
              </div>
            ))}

            {typing && (
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Bot size={14} color="#fff" />
                </div>
                <div
                  style={{
                    background: "var(--surface-2)",
                    padding: "0.65rem 1rem",
                    borderRadius: "4px 14px 14px 14px",
                    display: "flex",
                    gap: 4,
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--text-3)",
                        animation: `pulse 1.2s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "0.75rem 1rem",
              borderTop: `1px solid ${S.border}`,
              display: "flex",
              gap: 8,
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Frage stellen…"
              style={{
                flex: 1,
                background: "var(--surface-2)",
                border: `1px solid ${S.border}`,
                borderRadius: 10,
                padding: "0.6rem 0.85rem",
                fontSize: "0.82rem",
                color: "var(--text)",
                outline: "none",
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: input.trim() ? "var(--accent)" : "var(--surface-2)",
                border: "none",
                cursor: input.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.15s",
              }}
            >
              <Send
                size={16}
                color={input.trim() ? "#fff" : "var(--text-3)"}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
