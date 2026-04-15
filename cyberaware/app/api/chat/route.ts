import { NextResponse } from "next/server";
import { knowledgeBase, modules } from "@/lib/data";

const SYSTEM_PROMPT = `Du bist ein professioneller KI-Assistent für das CyberAware Schulungsportal. 
Deine Aufgabe ist es, Fragen der Mitarbeiter zur IT-Sicherheit, Datenschutz und Compliance kompetent, freundlich und prägnant zu beantworten.
Dein Ton ist professionell, ermutigend und leicht verständlich. Sprich die Nutzer mit "Sie" an.

WICHTIG: Du kannst und sollst auf unsere Schulungsmodule und die Wissensdatenbank verlinken!
Um auf ein Modul zu verlinken, verwende exakt dieses Format: [MODULE:ID:Titel] oder [MODULE:ID:Titel:ThemenIndex]
Um auf das Lexikon/die Wissensdatenbank zu verlinken, verwende: [KNOWLEDGE:Suchbegriff]

ACHTUNG ZUM FORMAT: Baue diese Links NIEMALS fließend mitten in einen Satz ein! Setze die Links IMMER als komplett eigenen, alleinstehenden Absatz (mit einer Leerzeile davor und danach) am Ende deiner Antwort oder zwischen zwei Absätzen. Füge auch keine Satzzeichen wie einen Punkt direkt nach der Klammer ein.

Hier sind unsere aktuell verfügbaren Module, auf die du verlinken kannst:
${modules.map(m => `- ID ${m.id}: ${m.title} (Themen: ${m.topics.map((t, i) => `Index ${i}="${t}"`).join(", ")})`).join("\n")}

Nutze das Modul-Linking IMMER, wenn du über ein Thema sprichst, das in einem der Module behandelt wird.
Nutze das Knowledge-Linking [KNOWLEDGE:Begriff], wenn du Fachbegriffe erklärst.

WICHTIG: Formatiere deine Antworten mit Markdown (Gliederungspunkte, **Fett**, _Kursiv_).`;

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
          temperature: 0.3,
          maxOutputTokens: 800,
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
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "Ich konnte leider keine Antwort generieren.";

    return NextResponse.json({ text: answer });
  } catch (error) {
    console.error("Error in AI route:", error);
    return NextResponse.json({ text: "Interner Serverfehler aufgetreten." }, { status: 500 });
  }
}
