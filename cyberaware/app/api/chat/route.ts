import { NextResponse } from "next/server";
import { knowledgeBase, modules } from "@/lib/data";

const SYSTEM_PROMPT = `Du bist der KI-Assistent des CyberAware Schulungsportals.
Beantworte Fragen zu IT-Sicherheit, Datenschutz und Compliance kompetent und verständlich. Sieze die Nutzer.

ANTWORT-STIL:
- Kurze Einleitung (1–2 Sätze), dann 3–5 Aufzählungspunkte mit den wichtigsten Fakten.
- Halte dich KURZ und VOLLSTÄNDIG – lieber weniger Punkte als abgeschnittene Sätze.
- Beende jeden Punkt mit einem vollständigen Satz. Breche NIEMALS mitten in einem Satz ab.
- Verwende **Fett** für Fachbegriffe.
- Gesamtlänge: maximal 150–200 Wörter.

LINKS (am Ende der Antwort, je max. 1x):
- Modul: [MODULE:ID:Titel]
- Lexikon: [KNOWLEDGE:Begriff]
Setze Links als eigene Zeile, nie im Fließtext, nie doppelt.

Verfügbare Module:
${modules.map(m => `- ID ${m.id}: "${m.title}"`).join("\n")}`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { text: "⚠️ Systemfehler: GEMINI_API_KEY ist nicht in den Umgebungsvariablen (.env.local) konfiguriert. Bitte tragen Sie Ihren API-Key ein, um die echte KI freizuschalten!" },
        { status: 200 }
      );
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [
          { parts: [{ text: message }] }
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Error:", errText);
      return NextResponse.json({ text: "Es gab einen Fehler bei der KI-Generierung. Bitte versuchen Sie es später noch einmal." }, { status: 500 });
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const finishReason = candidate?.finishReason;
    let answer = candidate?.content?.parts?.[0]?.text || "";

    if (!answer || finishReason === "SAFETY") {
      answer = "Ich konnte diese Frage leider nicht beantworten. Bitte formulieren Sie sie etwas anders.";
    }

    return NextResponse.json({ text: answer });
  } catch (error) {
    console.error("Error in AI route:", error);
    return NextResponse.json({ text: "Interner Serverfehler aufgetreten." }, { status: 500 });
  }
}
