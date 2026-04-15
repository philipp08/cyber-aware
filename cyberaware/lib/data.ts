export type Role = "employee" | "company_admin" | "platform_admin";
export type Difficulty = "Einsteiger" | "Fortgeschritten";
export type Category = "Pflicht" | "Wichtig" | "Kritisch";
export type CertLevel = "Bronze" | "Silber" | "Gold";
export type BadgeType =
  | "first_module"
  | "speed_learner"
  | "perfect_score"
  | "phishing_hero"
  | "all_modules"
  | "streak_7"
  | "streak_30"
  | "certificate_gold";

export interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: Difficulty;
  category: Category;
  icon: string;
  color: string;
  topics: string[];
  completed?: boolean;
  score?: number;
  timeSpent?: number; // minutes
  quizQuestions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: "multiple_choice" | "scenario";
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExamQuestion {
  id: number;
  moduleId: number;
  question: string;
  type: "multiple_choice" | "scenario";
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Badge {
  id: BadgeType;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  earnedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  department: string;
  role: Role;
  avatar: string;
  points: number;
  level: number;
  streak: number;
  completedModules: number[];
  badges: Badge[];
  certLevel?: CertLevel;
  certExpiry?: string;
  examAttempts: number;
  examScore?: number;
  joinedAt: string;
  lastActive: string;
}

export interface PhishingCampaign {
  id: string;
  name: string;
  status: "draft" | "running" | "completed";
  sentTo: number;
  clicked: number;
  reported: number;
  createdAt: string;
  template: string;
}

export interface CompanyEmployee {
  id: string;
  name: string;
  email: string;
  department: string;
  completedModules: number;
  totalModules: number;
  certLevel?: CertLevel;
  certExpiry?: string;
  lastActive: string;
  examScore?: number;
}

export const modules: Module[] = [
  {
    id: 1,
    title: "Internetgrundlagen",
    description:
      "Verstehen Sie die Grundlagen des Internets: Domains, URLs, HTTP/HTTPS, DNS und IP-Adressen.",
    duration: "8 Min.",
    difficulty: "Einsteiger",
    category: "Pflicht",
    icon: "🌐",
    color: "from-blue-500 to-blue-600",
    topics: ["Domain & URL", "HTTP vs HTTPS", "DNS-System", "IP-Adressen", "Browser-Sicherheit"],
    quizQuestions: [
      {
        id: 1,
        question: "Was bedeutet HTTPS im Unterschied zu HTTP?",
        type: "multiple_choice",
        options: [
          "HTTPS ist schneller als HTTP",
          "HTTPS verschlüsselt die Datenübertragung mit TLS/SSL",
          "HTTPS funktioniert nur auf mobilen Geräten",
          "HTTPS benötigt keine Passwörter",
        ],
        correctIndex: 1,
        explanation:
          "HTTPS (HyperText Transfer Protocol Secure) verschlüsselt alle Daten zwischen Browser und Server mittels TLS/SSL, was Man-in-the-Middle-Angriffe verhindert.",
      },
      {
        id: 2,
        question: "Welche URL ist vertrauenswürdig für Online-Banking?",
        type: "scenario",
        options: [
          "http://meine-bank.de/login",
          "https://meine-bank.de/login",
          "https://meine-bank.login-sicher.de",
          "https://meine.bank.de.account-verify.com",
        ],
        correctIndex: 1,
        explanation:
          "Die offizielle Domain der Bank ist 'meine-bank.de'. Nur https://meine-bank.de/login ist korrekt – alle anderen Varianten sind Phishing-Versuche.",
      },
      {
        id: 3,
        question: "Was ist die Aufgabe des DNS?",
        type: "multiple_choice",
        options: [
          "Daten zu verschlüsseln",
          "Domainnamen in IP-Adressen umzuwandeln",
          "Passwörter zu speichern",
          "E-Mails zu versenden",
        ],
        correctIndex: 1,
        explanation:
          "Das Domain Name System (DNS) übersetzt lesbare Domainnamen wie 'google.com' in numerische IP-Adressen, die Computer verwenden.",
      },
    ],
  },
  {
    id: 2,
    title: "Phishing erkennen",
    description:
      "Lernen Sie Phishing-E-Mails, Social Engineering und gefährliche Absender zu erkennen.",
    duration: "10 Min.",
    difficulty: "Einsteiger",
    category: "Kritisch",
    icon: "🎣",
    color: "from-red-500 to-red-600",
    topics: [
      "Phishing-Merkmale",
      "Social Engineering",
      "Absender prüfen",
      "Gefährliche Links",
      "Meldeverfahren",
    ],
    quizQuestions: [
      {
        id: 4,
        question:
          "Sie erhalten eine E-Mail von 'service@paypal-sicher.com' mit der Bitte, Ihr Konto zu verifizieren. Was tun Sie?",
        type: "scenario",
        options: [
          "Sofort auf den Link klicken und Daten eingeben",
          "Die E-Mail ignorieren und löschen, dann PayPal direkt im Browser aufrufen",
          "Antworten und nach weiteren Informationen fragen",
          "Den Link kopieren und an Kollegen weiterschicken",
        ],
        correctIndex: 1,
        explanation:
          "'paypal-sicher.com' ist nicht die offizielle PayPal-Domain (paypal.com). Öffnen Sie immer direkt die bekannte Website Ihres Dienstleisters.",
      },
      {
        id: 5,
        question: "Welches Merkmal deutet NICHT auf eine Phishing-E-Mail hin?",
        type: "multiple_choice",
        options: [
          "Dringlichkeit ('Ihr Konto wird in 24h gesperrt')",
          "Rechtschreibfehler und schlechte Grammatik",
          "Bekannte Absenderadresse aus Ihrem Kontaktbuch",
          "Unerwartete Anhänge oder Links",
        ],
        correctIndex: 2,
        explanation:
          "Eine bekannte Absenderadresse ist kein sicheres Zeichen – E-Mail-Adressen können gefälscht werden (Spoofing). Prüfen Sie immer den Kontext.",
      },
    ],
  },
  {
    id: 3,
    title: "Sichere Passwörter",
    description:
      "Erstellen Sie starke Passwörter, nutzen Sie Passwortmanager und aktivieren Sie Zwei-Faktor-Authentifizierung.",
    duration: "7 Min.",
    difficulty: "Einsteiger",
    category: "Pflicht",
    icon: "🔐",
    color: "from-green-500 to-green-600",
    topics: [
      "Passwortstärke",
      "Passwortmanager",
      "2FA/MFA",
      "Passwort-Hygiene",
      "Sichere Wiederherstellung",
    ],
    quizQuestions: [
      {
        id: 6,
        question: "Welches Passwort ist am sichersten?",
        type: "multiple_choice",
        options: ["Passwort123!", "P@55w0rd", "korrekte-pferd-batterie-heftklammer", "Admin2024"],
        correctIndex: 2,
        explanation:
          "Lange Passphrasen aus zufälligen Wörtern sind schwerer zu knacken als kurze komplexe Passwörter. 'korrekte-pferd-batterie-heftklammer' hat ~50 Bits Entropie.",
      },
      {
        id: 7,
        question: "Was ist der Hauptvorteil eines Passwortmanagers?",
        type: "multiple_choice",
        options: [
          "Er merkt sich nur ein Passwort für alle Dienste",
          "Er generiert und speichert einzigartige starke Passwörter für jeden Dienst",
          "Er sendet Passwörter sicher per E-Mail",
          "Er ersetzt die Zwei-Faktor-Authentifizierung",
        ],
        correctIndex: 1,
        explanation:
          "Ein Passwortmanager erstellt für jeden Dienst ein einzigartiges, starkes Passwort. So wird verhindert, dass ein Datenleck bei einem Dienst andere gefährdet.",
      },
    ],
  },
  {
    id: 4,
    title: "DSGVO Grundlagen",
    description:
      "Verstehen Sie die Datenschutz-Grundverordnung: personenbezogene Daten, Einwilligung und Betroffenenrechte.",
    duration: "9 Min.",
    difficulty: "Einsteiger",
    category: "Pflicht",
    icon: "⚖️",
    color: "from-purple-500 to-purple-600",
    topics: [
      "Personenbezogene Daten",
      "Einwilligung",
      "Betroffenenrechte",
      "Datenpannen",
      "Datenschutzbeauftragter",
    ],
    quizQuestions: [
      {
        id: 8,
        question: "Was gilt als personenbezogenes Datum?",
        type: "multiple_choice",
        options: [
          "Nur Name und Adresse",
          "Nur Finanzdaten",
          "Jede Information, die eine natürliche Person identifizieren kann",
          "Nur biometrische Daten",
        ],
        correctIndex: 2,
        explanation:
          "Personenbezogene Daten umfassen alle Informationen, die direkt oder indirekt eine Person identifizieren können: Name, IP-Adresse, E-Mail, Standort, etc.",
      },
      {
        id: 9,
        question: "Wie lange haben Sie Zeit, eine Datenpanne der Aufsichtsbehörde zu melden?",
        type: "multiple_choice",
        options: [
          "7 Tage",
          "72 Stunden",
          "1 Monat",
          "Es gibt keine Meldefrist",
        ],
        correctIndex: 1,
        explanation:
          "Gemäß Art. 33 DSGVO muss eine Datenpanne innerhalb von 72 Stunden nach Bekanntwerden der zuständigen Aufsichtsbehörde gemeldet werden.",
      },
    ],
  },
  {
    id: 5,
    title: "Gerätesicherheit",
    description:
      "Schützen Sie Ihre Geräte: Updates, Bildschirmsperre, VPN und sicheres WLAN.",
    duration: "6 Min.",
    difficulty: "Einsteiger",
    category: "Pflicht",
    icon: "💻",
    color: "from-orange-500 to-orange-600",
    topics: [
      "Software-Updates",
      "Bildschirmsperre",
      "VPN-Nutzung",
      "Öffentliches WLAN",
      "Endpoint Security",
    ],
    quizQuestions: [
      {
        id: 10,
        question: "Warum sind regelmäßige Software-Updates wichtig?",
        type: "multiple_choice",
        options: [
          "Um Speicherplatz freizugeben",
          "Um Sicherheitslücken zu schließen, die von Angreifern ausgenutzt werden könnten",
          "Um neue Funktionen zu erhalten",
          "Updates sind nur für die Performance wichtig",
        ],
        correctIndex: 1,
        explanation:
          "Updates schließen bekannte Sicherheitslücken (CVEs). Ungepatchte Systeme sind das häufigste Einfallstor für Cyberangriffe.",
      },
      {
        id: 11,
        question: "Sie müssen im Café arbeiten und nutzen das öffentliche WLAN. Was sollten Sie tun?",
        type: "scenario",
        options: [
          "Direkt arbeiten, öffentliches WLAN ist sicher genug",
          "VPN aktivieren bevor Sie sich verbinden",
          "Passwörter ändern sobald Sie zuhause sind",
          "Nur E-Mails lesen, nicht senden",
        ],
        correctIndex: 1,
        explanation:
          "In öffentlichen WLANs können Angreifer den Datenverkehr mitlesen. Ein VPN verschlüsselt die gesamte Verbindung und schützt sensitive Daten.",
      },
    ],
  },
  {
    id: 6,
    title: "E-Mail-Sicherheit",
    description:
      "Sichere E-Mail-Kommunikation: Anhänge, Links, Spam-Erkennung und CEO-Fraud.",
    duration: "8 Min.",
    difficulty: "Fortgeschritten",
    category: "Wichtig",
    icon: "📧",
    color: "from-yellow-500 to-yellow-600",
    topics: [
      "Gefährliche Anhänge",
      "Link-Prüfung",
      "Spam-Filter",
      "CEO-Fraud / BEC",
      "E-Mail-Verschlüsselung",
    ],
    quizQuestions: [
      {
        id: 12,
        question:
          "Sie erhalten eine E-Mail vom 'CEO' mit der Bitte, sofort 50.000€ zu überweisen. Was ist das?",
        type: "scenario",
        options: [
          "Eine normale Geschäftsanfrage",
          "CEO-Fraud / Business Email Compromise (BEC)",
          "Eine interne Sicherheitsübung",
          "Spam",
        ],
        correctIndex: 1,
        explanation:
          "CEO-Fraud ist eine bekannte Betrugsmethode. Täter geben sich als Führungskraft aus und drängen Mitarbeiter zu Überweisungen. Verifizieren Sie solche Anfragen immer telefonisch.",
      },
    ],
  },
  {
    id: 7,
    title: "Cloud-Dienste",
    description:
      "Sicherer Umgang mit Cloud-Diensten: Datenspeicherung, Zugriffsrechte und Backups.",
    duration: "7 Min.",
    difficulty: "Fortgeschritten",
    category: "Wichtig",
    icon: "☁️",
    color: "from-cyan-500 to-cyan-600",
    topics: [
      "Cloud-Anbieter bewerten",
      "Zugriffsrechte",
      "Datenverschlüsselung",
      "Backup-Strategie",
      "Shared Responsibility",
    ],
    quizQuestions: [
      {
        id: 13,
        question: "Was bedeutet das Shared-Responsibility-Modell in der Cloud?",
        type: "multiple_choice",
        options: [
          "Der Cloud-Anbieter ist für alles verantwortlich",
          "Sicherheitsverantwortung wird zwischen Anbieter und Kunde aufgeteilt",
          "Der Kunde trägt die gesamte Verantwortung",
          "Es gibt keine klare Verantwortungsverteilung",
        ],
        correctIndex: 1,
        explanation:
          "Im Shared-Responsibility-Modell schützt der Anbieter die Infrastruktur, während der Kunde für seine Daten, Anwendungen und Zugriffsrechte verantwortlich ist.",
      },
    ],
  },
  {
    id: 8,
    title: "Mobile Sicherheit",
    description:
      "Sicheres Arbeiten mit Mobilgeräten: App-Berechtigungen, BYOD-Richtlinien und MDM.",
    duration: "6 Min.",
    difficulty: "Fortgeschritten",
    category: "Kritisch",
    icon: "📱",
    color: "from-pink-500 to-pink-600",
    topics: [
      "App-Berechtigungen",
      "BYOD-Richtlinien",
      "Mobile Device Management",
      "Fernlöschung",
      "Mobile Malware",
    ],
    quizQuestions: [
      {
        id: 14,
        question: "Eine Taschenlampen-App fragt nach Zugriff auf Ihre Kontakte. Was sollten Sie tun?",
        type: "scenario",
        options: [
          "Zugriff erlauben, Apps brauchen manchmal unerwartete Berechtigungen",
          "Zugriff verweigern – eine Taschenlampe benötigt keine Kontakte",
          "Die App deinstallieren und eine andere suchen",
          "Den Hersteller fragen",
        ],
        correctIndex: 1,
        explanation:
          "Apps sollten nur die Berechtigungen erhalten, die sie für ihre Funktion benötigen (Principle of Least Privilege). Kontaktzugriff für eine Taschenlampe ist ein Warnsignal.",
      },
    ],
  },
];

export const examQuestions: ExamQuestion[] = [
  {
    id: 1,
    moduleId: 1,
    question: "Was ist der Unterschied zwischen HTTP und HTTPS?",
    type: "multiple_choice",
    options: [
      "HTTPS ist neuer und schneller",
      "HTTPS verschlüsselt die Datenübertragung mit TLS",
      "HTTP ist sicherer für Banking",
      "Es gibt keinen sicherheitsrelevanten Unterschied",
    ],
    correctIndex: 1,
    explanation: "HTTPS verschlüsselt die Verbindung mit TLS/SSL.",
  },
  {
    id: 2,
    moduleId: 1,
    question: "Was macht ein DNS-Server?",
    type: "multiple_choice",
    options: [
      "Er verschlüsselt Webseiten",
      "Er speichert Passwörter",
      "Er übersetzt Domainnamen in IP-Adressen",
      "Er filtert Spam-E-Mails",
    ],
    correctIndex: 2,
    explanation: "DNS (Domain Name System) übersetzt Domainnamen in IP-Adressen.",
  },
  {
    id: 3,
    moduleId: 2,
    question:
      "Welches ist das häufigste Erkennungsmerkmal einer Phishing-E-Mail?",
    type: "multiple_choice",
    options: [
      "Professionelles Design",
      "Dringlichkeit und Drohungen",
      "Keine Anhänge",
      "Bekannte Absenderadresse",
    ],
    correctIndex: 1,
    explanation: "Phishing-Mails erzeugen oft künstliche Dringlichkeit ('Ihr Konto wird gesperrt').",
  },
  {
    id: 4,
    moduleId: 2,
    question: "Ihr Kollege schickt Ihnen einen Link zu einem Dokument. Was prüfen Sie zuerst?",
    type: "scenario",
    options: [
      "Ob der Link zu einer bekannten Domain führt",
      "Ob die E-Mail professionell aussieht",
      "Ob Sie denselben Absender kennen",
      "Nichts – Kollegen sind vertrauenswürdig",
    ],
    correctIndex: 0,
    explanation: "Prüfen Sie immer die Zieldomain eines Links, bevor Sie klicken.",
  },
  {
    id: 5,
    moduleId: 3,
    question: "Wie lang sollte ein sicheres Passwort mindestens sein?",
    type: "multiple_choice",
    options: ["6 Zeichen", "8 Zeichen", "12 Zeichen", "16 Zeichen"],
    correctIndex: 3,
    explanation: "Aktuelle BSI-Empfehlung: mindestens 16 Zeichen für wichtige Konten.",
  },
  {
    id: 6,
    moduleId: 3,
    question: "Was ist Zwei-Faktor-Authentifizierung?",
    type: "multiple_choice",
    options: [
      "Zwei Passwörter für ein Konto",
      "Ein zweiter Sicherheitsnachweis zusätzlich zum Passwort",
      "Zwei verschiedene Browser für unterschiedliche Dienste",
      "Ein Backup-Passwort",
    ],
    correctIndex: 1,
    explanation: "2FA kombiniert 'etwas, das Sie wissen' (Passwort) mit 'etwas, das Sie haben' (Token).",
  },
  {
    id: 7,
    moduleId: 4,
    question: "Was sind Betroffenenrechte laut DSGVO?",
    type: "multiple_choice",
    options: [
      "Nur das Recht auf Datenlöschung",
      "Auskunft, Berichtigung, Löschung, Einschränkung, Portabilität und Widerspruch",
      "Nur das Recht auf Auskunft",
      "Rechte gelten nur für EU-Bürger",
    ],
    correctIndex: 1,
    explanation: "Die DSGVO gewährt umfangreiche Rechte: Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), u.v.m.",
  },
  {
    id: 8,
    moduleId: 4,
    question: "Wann ist die Verarbeitung personenbezogener Daten ohne Einwilligung erlaubt?",
    type: "multiple_choice",
    options: [
      "Niemals",
      "Bei berechtigtem Interesse, Vertragserfüllung oder gesetzlicher Pflicht",
      "Immer wenn der Nutzer registriert ist",
      "Nur bei öffentlichen Stellen",
    ],
    correctIndex: 1,
    explanation: "Art. 6 DSGVO listet mehrere Rechtmäßigkeitsgründe: Einwilligung, Vertrag, rechtliche Verpflichtung, lebenswichtige Interessen, öffentliches Interesse, berechtigte Interessen.",
  },
  {
    id: 9,
    moduleId: 5,
    question: "Warum ist automatische Bildschirmsperre wichtig?",
    type: "multiple_choice",
    options: [
      "Spart Akkuleistung",
      "Verhindert unbefugten Zugriff bei Abwesenheit",
      "Schützt vor Malware",
      "Verlängert die Gerätelebensdauer",
    ],
    correctIndex: 1,
    explanation: "Eine automatische Sperre nach kurzer Inaktivität verhindert physischen Zugriff durch unbefugte Personen.",
  },
  {
    id: 10,
    moduleId: 5,
    question: "Was ist ein VPN?",
    type: "multiple_choice",
    options: [
      "Ein Virenscanner",
      "Ein verschlüsselter Tunnel für Internetverbindungen",
      "Eine Firewall",
      "Ein Passwortmanager",
    ],
    correctIndex: 1,
    explanation: "Ein VPN (Virtual Private Network) verschlüsselt den gesamten Netzwerkverkehr und schützt vor Abhören, besonders in öffentlichen WLANs.",
  },
  {
    id: 11,
    moduleId: 6,
    question: "Welche Dateierweiterung ist bei E-Mail-Anhängen besonders gefährlich?",
    type: "multiple_choice",
    options: [".pdf", ".jpg", ".exe", ".txt"],
    correctIndex: 2,
    explanation: ".exe-Dateien sind ausführbare Programme und können Malware enthalten. Öffnen Sie nie unerwartete .exe-Anhänge.",
  },
  {
    id: 12,
    moduleId: 6,
    question: "Was sollten Sie tun, wenn Sie eine verdächtige E-Mail erhalten?",
    type: "scenario",
    options: [
      "Anhänge öffnen um zu prüfen ob sie gefährlich sind",
      "An den IT-Sicherheitsbeauftragten weiterleiten und löschen",
      "An alle Kollegen weiterleiten zur Warnung",
      "E-Mail ignorieren und im Postfach lassen",
    ],
    correctIndex: 1,
    explanation: "Melden Sie verdächtige E-Mails immer dem IT-Sicherheitsteam – sie können daraus wichtige Informationen gewinnen.",
  },
  {
    id: 13,
    moduleId: 7,
    question: "Was bedeutet die '3-2-1-Backup-Regel'?",
    type: "multiple_choice",
    options: [
      "3 Tage, 2 Wochen, 1 Monat aufbewahren",
      "3 Kopien, 2 verschiedene Medien, 1 externes Backup",
      "3 Passwörter, 2 Geräte, 1 Cloud",
      "3 Mal täglich, 2 Mal wöchentlich, 1 Mal monatlich",
    ],
    correctIndex: 1,
    explanation: "Die 3-2-1-Regel: 3 Kopien der Daten, auf 2 verschiedenen Medientypen, davon 1 außerhalb des Standorts.",
  },
  {
    id: 14,
    moduleId: 7,
    question: "Welches Prinzip sollte für Cloud-Zugriffsrechte gelten?",
    type: "multiple_choice",
    options: [
      "Alle Mitarbeiter erhalten vollen Zugriff",
      "Principle of Least Privilege – nur notwendige Rechte vergeben",
      "Zugriffsrechte werden nie geändert",
      "Admin-Rechte für alle, die danach fragen",
    ],
    correctIndex: 1,
    explanation: "Das Prinzip der minimalen Rechtevergabe reduziert das Schadenspotenzial bei kompromittierten Konten.",
  },
  {
    id: 15,
    moduleId: 8,
    question: "Was ist BYOD?",
    type: "multiple_choice",
    options: [
      "Ein Sicherheitsprotokoll",
      "Bring Your Own Device – private Geräte für die Arbeit nutzen",
      "Ein Cloud-Dienst",
      "Eine Art Firewall",
    ],
    correctIndex: 1,
    explanation: "BYOD (Bring Your Own Device) erlaubt Mitarbeitern, eigene Geräte zu nutzen, erfordert aber klare Sicherheitsrichtlinien.",
  },
  {
    id: 16,
    moduleId: 8,
    question: "Was ermöglicht Mobile Device Management (MDM)?",
    type: "multiple_choice",
    options: [
      "Nur App-Installation",
      "Fernverwaltung, Verschlüsselung und Fernlöschung von Mobilgeräten",
      "Nur Passwort-Reset",
      "Internet-Filterung",
    ],
    correctIndex: 1,
    explanation: "MDM ermöglicht Unternehmen, Mobilgeräte zentral zu verwalten, Richtlinien durchzusetzen und bei Verlust Daten zu löschen.",
  },
  {
    id: 17,
    moduleId: 2,
    question: "Was ist Spear-Phishing?",
    type: "multiple_choice",
    options: [
      "Massenphishing an viele Empfänger",
      "Gezieltes Phishing auf eine bestimmte Person mit persönlichen Informationen",
      "Phishing über SMS",
      "Phishing über Telefonanrufe",
    ],
    correctIndex: 1,
    explanation: "Spear-Phishing ist maßgeschneidertes Phishing mit persönlichen Details, was es deutlich gefährlicher macht.",
  },
  {
    id: 18,
    moduleId: 1,
    question: "Was ist eine IP-Adresse?",
    type: "multiple_choice",
    options: [
      "Ein verschlüsseltes Passwort",
      "Eine eindeutige numerische Adresse eines Geräts im Netzwerk",
      "Ein Sicherheitszertifikat",
      "Ein Netzwerk-Protokoll",
    ],
    correctIndex: 1,
    explanation: "Eine IP-Adresse (z.B. 192.168.1.1) identifiziert ein Gerät eindeutig in einem Netzwerk.",
  },
  {
    id: 19,
    moduleId: 3,
    question: "Was passiert, wenn Sie für mehrere Dienste dasselbe Passwort nutzen?",
    type: "scenario",
    options: [
      "Nichts – Passwörter sind überall gleich sicher",
      "Bei einem Datenleck sind alle Ihre Konten gefährdet (Credential Stuffing)",
      "Es ist praktischer und daher empfohlen",
      "Nur das schwächste Konto ist gefährdet",
    ],
    correctIndex: 1,
    explanation: "Credential Stuffing: Angreifer testen geleakte Passwörter automatisch auf anderen Diensten. Einzigartige Passwörter pro Dienst sind essentiell.",
  },
  {
    id: 20,
    moduleId: 4,
    question: "Was ist eine Datenpanne laut DSGVO?",
    type: "multiple_choice",
    options: [
      "Nur Hacker-Angriffe",
      "Jede Verletzung der Sicherheit von personenbezogenen Daten",
      "Nur der Verlust von Bankdaten",
      "Nur absichtliche Datenweitergabe",
    ],
    correctIndex: 1,
    explanation: "Eine Datenpanne umfasst jede Verletzung der Sicherheit (Verlust, Zerstörung, unbefugter Zugang) – nicht nur Angriffe.",
  },
  {
    id: 21,
    moduleId: 5,
    question: "Welche Verschlüsselung sollte für einen Laptop mit Firmendaten aktiviert sein?",
    type: "multiple_choice",
    options: [
      "Keine – verlangsamt den Computer",
      "Festplattenverschlüsselung (BitLocker/FileVault)",
      "Nur Ordner-Verschlüsselung",
      "Nur Cloud-Verschlüsselung",
    ],
    correctIndex: 1,
    explanation: "Festplattenverschlüsselung schützt Daten bei physischem Gerätediebstahl oder -verlust – unverzichtbar für Firmenlaptops.",
  },
  {
    id: 22,
    moduleId: 6,
    question: "Was ist E-Mail-Spoofing?",
    type: "multiple_choice",
    options: [
      "Das Verschlüsseln von E-Mails",
      "Das Fälschen der Absenderadresse einer E-Mail",
      "Das automatische Filtern von Spam",
      "Das Signieren von E-Mails",
    ],
    correctIndex: 1,
    explanation: "E-Mail-Spoofing ermöglicht es, beliebige Absenderadressen anzuzeigen – auch die Ihrer Kollegen oder Vorgesetzten.",
  },
  {
    id: 23,
    moduleId: 7,
    question: "Was sollten Sie tun, bevor Sie Firmendaten in eine private Cloud laden?",
    type: "scenario",
    options: [
      "Einfach hochladen – Cloud ist sicher",
      "Unternehmensrichtlinien prüfen und ggf. genehmigten Cloud-Dienst nutzen",
      "Daten vorher komprimieren",
      "Den Dateinamen ändern",
    ],
    correctIndex: 1,
    explanation: "Firmendaten dürfen nur in vom Unternehmen freigegebene Cloud-Dienste gespeichert werden. Private Clouds können die DSGVO verletzen.",
  },
  {
    id: 24,
    moduleId: 8,
    question: "Was sollten Sie tun, wenn Ihr Firmenhandy gestohlen wurde?",
    type: "scenario",
    options: [
      "Abwarten ob es wieder auftaucht",
      "Sofort IT-Abteilung informieren für Fernlöschung",
      "Passwort ändern sobald Sie ein neues Gerät haben",
      "Bei der Polizei melden reicht aus",
    ],
    correctIndex: 1,
    explanation: "Sofort die IT informieren! Per MDM können Firmendaten remote gelöscht werden, bevor Unbefugte Zugriff erhalten.",
  },
  {
    id: 25,
    moduleId: 1,
    question: "Was ist ein SSL-Zertifikat?",
    type: "multiple_choice",
    options: [
      "Ein Personalausweis für Webseitenbetreiber",
      "Ein digitales Zertifikat, das die Identität einer Website bestätigt und Verschlüsselung ermöglicht",
      "Ein Antiviren-Programm",
      "Ein Backup-System",
    ],
    correctIndex: 1,
    explanation: "SSL/TLS-Zertifikate bestätigen die Identität einer Website und ermöglichen HTTPS-Verschlüsselung. Das Schloss-Symbol im Browser zeigt ein gültiges Zertifikat an.",
  },
  {
    id: 26,
    moduleId: 3,
    question: "Welche 2FA-Methode ist am sichersten?",
    type: "multiple_choice",
    options: [
      "SMS-Codes",
      "E-Mail-Codes",
      "Hardware-Sicherheitsschlüssel (YubiKey)",
      "Sicherheitsfragen",
    ],
    correctIndex: 2,
    explanation: "Hardware-Sicherheitsschlüssel sind am sichersten, da sie nicht per Phishing abgefangen werden können. SMS und E-Mail können kompromittiert werden.",
  },
  {
    id: 27,
    moduleId: 4,
    question: "Wie lange dürfen personenbezogene Daten gespeichert werden?",
    type: "multiple_choice",
    options: [
      "Für immer",
      "Nur solange der Zweck der Verarbeitung besteht (Zweckbindung)",
      "Genau 5 Jahre",
      "Bis der Nutzer sich abmeldet",
    ],
    correctIndex: 1,
    explanation: "Das Prinzip der Speicherbegrenzung (Art. 5 DSGVO): Daten dürfen nur so lange gespeichert werden, wie es für den Verarbeitungszweck notwendig ist.",
  },
  {
    id: 28,
    moduleId: 5,
    question: "Was ist ein Zero-Day-Exploit?",
    type: "multiple_choice",
    options: [
      "Ein Angriff der null Sekunden dauert",
      "Eine Sicherheitslücke, die noch kein Patch existiert, bevor sie ausgenutzt wird",
      "Ein täglicher Sicherheits-Check",
      "Ein Antivirus-Programm",
    ],
    correctIndex: 1,
    explanation: "Zero-Day-Exploits nutzen unbekannte Schwachstellen – deshalb sind schnelle Updates nach Patch-Veröffentlichung kritisch.",
  },
  {
    id: 29,
    moduleId: 6,
    question: "Was ist DMARC?",
    type: "multiple_choice",
    options: [
      "Ein E-Mail-Client",
      "Ein Protokoll zur E-Mail-Authentifizierung und Schutz vor Spoofing",
      "Ein Spam-Filter",
      "Ein E-Mail-Verschlüsselungsverfahren",
    ],
    correctIndex: 1,
    explanation: "DMARC (Domain-based Message Authentication, Reporting & Conformance) hilft dabei, E-Mail-Spoofing zu verhindern.",
  },
  {
    id: 30,
    moduleId: 8,
    question: "Was versteht man unter 'Jailbreaking' eines Smartphones?",
    type: "multiple_choice",
    options: [
      "Das Zurücksetzen auf Werkseinstellungen",
      "Das Entfernen von Betriebssystem-Beschränkungen, was Sicherheitsrisiken erhöht",
      "Das Entsperren von Mobilfunkanbietern",
      "Das Aktivieren des Entwicklermodus",
    ],
    correctIndex: 1,
    explanation: "Jailbreaking/Rooting umgeht Sicherheitsmechanismen des OS und macht Geräte anfälliger für Malware. Auf Firmengeräten strikt verboten.",
  },
];

export const currentUser: User = {
  id: "user-1",
  name: "Sarah Müller",
  email: "sarah.mueller@example-gmbh.de",
  company: "Example GmbH",
  department: "Marketing",
  role: "employee",
  avatar: "SM",
  points: 1450,
  level: 4,
  streak: 7,
  completedModules: [1, 2, 3, 4],
  badges: [
    {
      id: "first_module",
      name: "Erster Schritt",
      description: "Erstes Modul abgeschlossen",
      icon: "🎯",
      color: "bg-blue-100 text-blue-700",
      earned: true,
      earnedAt: "2024-01-15",
    },
    {
      id: "speed_learner",
      name: "Schnelldenker",
      description: "Modul in unter 5 Minuten abgeschlossen",
      icon: "⚡",
      color: "bg-yellow-100 text-yellow-700",
      earned: true,
      earnedAt: "2024-01-16",
    },
    {
      id: "perfect_score",
      name: "Perfektionist",
      description: "100% in einem Wissenscheck",
      icon: "⭐",
      color: "bg-purple-100 text-purple-700",
      earned: true,
      earnedAt: "2024-01-18",
    },
    {
      id: "phishing_hero",
      name: "Phishing-Held",
      description: "Phishing-Simulation erkannt und gemeldet",
      icon: "🦸",
      color: "bg-green-100 text-green-700",
      earned: false,
    },
    {
      id: "all_modules",
      name: "Vollständig",
      description: "Alle Module abgeschlossen",
      icon: "🏆",
      color: "bg-gold-100 text-yellow-600",
      earned: false,
    },
    {
      id: "streak_7",
      name: "7-Tage-Streak",
      description: "7 Tage in Folge gelernt",
      icon: "🔥",
      color: "bg-orange-100 text-orange-700",
      earned: true,
      earnedAt: "2024-01-22",
    },
    {
      id: "streak_30",
      name: "30-Tage-Streak",
      description: "30 Tage in Folge gelernt",
      icon: "💎",
      color: "bg-cyan-100 text-cyan-700",
      earned: false,
    },
    {
      id: "certificate_gold",
      name: "Gold-Zertifikat",
      description: "Gold-Zertifikat erhalten",
      icon: "🥇",
      color: "bg-yellow-100 text-yellow-700",
      earned: false,
    },
  ],
  certLevel: "Bronze",
  certExpiry: "2025-01-22",
  examAttempts: 1,
  examScore: 76,
  joinedAt: "2024-01-10",
  lastActive: "2024-01-22",
};

export const leaderboard = [
  { rank: 1, name: "Thomas Weber", points: 2890, department: "IT", certLevel: "Gold" as CertLevel },
  { rank: 2, name: "Anna Schmidt", points: 2450, department: "Finance", certLevel: "Silber" as CertLevel },
  { rank: 3, name: "Michael Bauer", points: 2100, department: "HR", certLevel: "Silber" as CertLevel },
  { rank: 4, name: "Sarah Müller", points: 1450, department: "Marketing", certLevel: "Bronze" as CertLevel },
  { rank: 5, name: "Julia Fischer", points: 1320, department: "Sales", certLevel: "Bronze" as CertLevel },
  { rank: 6, name: "Klaus Richter", points: 980, department: "Operations", certLevel: undefined },
  { rank: 7, name: "Laura Hoffmann", points: 750, department: "Legal", certLevel: undefined },
  { rank: 8, name: "Peter Schulz", points: 520, department: "Marketing", certLevel: undefined },
];

export const companyEmployees: CompanyEmployee[] = [
  {
    id: "e1",
    name: "Thomas Weber",
    email: "t.weber@example-gmbh.de",
    department: "IT",
    completedModules: 8,
    totalModules: 8,
    certLevel: "Gold",
    certExpiry: "2025-03-15",
    lastActive: "2024-01-22",
    examScore: 94,
  },
  {
    id: "e2",
    name: "Anna Schmidt",
    email: "a.schmidt@example-gmbh.de",
    department: "Finance",
    completedModules: 8,
    totalModules: 8,
    certLevel: "Silber",
    certExpiry: "2025-02-28",
    lastActive: "2024-01-21",
    examScore: 82,
  },
  {
    id: "e3",
    name: "Michael Bauer",
    email: "m.bauer@example-gmbh.de",
    department: "HR",
    completedModules: 7,
    totalModules: 8,
    certLevel: "Silber",
    certExpiry: "2025-01-30",
    lastActive: "2024-01-20",
    examScore: 81,
  },
  {
    id: "e4",
    name: "Sarah Müller",
    email: "sarah.mueller@example-gmbh.de",
    department: "Marketing",
    completedModules: 4,
    totalModules: 8,
    certLevel: "Bronze",
    certExpiry: "2025-01-22",
    lastActive: "2024-01-22",
    examScore: 76,
  },
  {
    id: "e5",
    name: "Julia Fischer",
    email: "j.fischer@example-gmbh.de",
    department: "Sales",
    completedModules: 4,
    totalModules: 8,
    certLevel: "Bronze",
    certExpiry: "2025-01-10",
    lastActive: "2024-01-15",
    examScore: 72,
  },
  {
    id: "e6",
    name: "Klaus Richter",
    email: "k.richter@example-gmbh.de",
    department: "Operations",
    completedModules: 2,
    totalModules: 8,
    certLevel: undefined,
    certExpiry: undefined,
    lastActive: "2024-01-10",
    examScore: undefined,
  },
  {
    id: "e7",
    name: "Laura Hoffmann",
    email: "l.hoffmann@example-gmbh.de",
    department: "Legal",
    completedModules: 1,
    totalModules: 8,
    certLevel: undefined,
    certExpiry: undefined,
    lastActive: "2024-01-05",
    examScore: undefined,
  },
  {
    id: "e8",
    name: "Peter Schulz",
    email: "p.schulz@example-gmbh.de",
    department: "Marketing",
    completedModules: 0,
    totalModules: 8,
    certLevel: undefined,
    certExpiry: undefined,
    lastActive: "2024-01-01",
    examScore: undefined,
  },
];

export const phishingCampaigns: PhishingCampaign[] = [
  {
    id: "c1",
    name: "Q1 2024 – IT-Support Kampagne",
    status: "completed",
    sentTo: 48,
    clicked: 12,
    reported: 8,
    createdAt: "2024-01-10",
    template: "IT-Support Passwort-Reset",
  },
  {
    id: "c2",
    name: "Q1 2024 – CEO-Fraud Test",
    status: "running",
    sentTo: 48,
    clicked: 5,
    reported: 15,
    createdAt: "2024-01-20",
    template: "CEO-Anfrage Überweisung",
  },
  {
    id: "c3",
    name: "Q2 2024 – Paket-Benachrichtigung",
    status: "draft",
    sentTo: 0,
    clicked: 0,
    reported: 0,
    createdAt: "2024-01-22",
    template: "Paketdienst Lieferung",
  },
];

export const knowledgeBase = [
  {
    term: "2FA / MFA",
    definition:
      "Zwei-Faktor-Authentifizierung (2FA) oder Multi-Faktor-Authentifizierung (MFA) ist ein Sicherheitsverfahren, bei dem sich Nutzer mit zwei oder mehr unabhängigen Faktoren authentifizieren müssen: etwas, das sie wissen (Passwort), haben (Token/Handy) oder sind (Biometrie).",
    category: "Authentifizierung",
  },
  {
    term: "BEC (Business Email Compromise)",
    definition:
      "Eine Betrugsmasche, bei der Angreifer gefälschte E-Mails im Namen von Führungskräften oder Lieferanten senden, um Mitarbeiter zu unautorisierten Überweisungen zu verleiten. Auch als CEO-Fraud bekannt.",
    category: "Angriffsmethoden",
  },
  {
    term: "DSGVO",
    definition:
      "Die Datenschutz-Grundverordnung (DSGVO) ist eine EU-Verordnung, die seit Mai 2018 den Umgang mit personenbezogenen Daten regelt. Sie gewährt Betroffenen umfangreiche Rechte und verpflichtet Unternehmen zu transparenter Datenverarbeitung.",
    category: "Recht & Compliance",
  },
  {
    term: "DNS (Domain Name System)",
    definition:
      "Das Domain Name System ist das 'Telefonbuch des Internets'. Es übersetzt menschenlesbare Domainnamen (z.B. google.com) in numerische IP-Adressen, die Computer für die Kommunikation benötigen.",
    category: "Netzwerk",
  },
  {
    term: "Phishing",
    definition:
      "Phishing ist eine Methode, bei der Angreifer gefälschte E-Mails, Websites oder Nachrichten verwenden, um vertrauliche Informationen wie Passwörter oder Kreditkartendaten zu stehlen. Der Name leitet sich vom englischen 'fishing' (Angeln) ab.",
    category: "Angriffsmethoden",
  },
  {
    term: "SSL/TLS",
    definition:
      "SSL (Secure Sockets Layer) und sein Nachfolger TLS (Transport Layer Security) sind kryptographische Protokolle, die eine verschlüsselte Kommunikation über das Internet ermöglichen. Sie bilden die Grundlage für HTTPS.",
    category: "Verschlüsselung",
  },
  {
    term: "VPN (Virtual Private Network)",
    definition:
      "Ein VPN schafft einen verschlüsselten Tunnel zwischen Ihrem Gerät und einem VPN-Server, sodass Ihr Internetverkehr für Dritte nicht einsehbar ist. Besonders wichtig bei der Nutzung öffentlicher WLANs.",
    category: "Netzwerk",
  },
  {
    term: "Zero-Day",
    definition:
      "Eine Zero-Day-Schwachstelle ist eine Sicherheitslücke in Software, die dem Hersteller noch unbekannt ist oder für die noch kein Patch veröffentlicht wurde. Angreifer, die solche Lücken ausnutzen, haben einen erheblichen Vorteil.",
    category: "Schwachstellen",
  },
  {
    term: "Ransomware",
    definition:
      "Ransomware ist Schadsoftware, die Dateien auf einem Computer verschlüsselt und ein Lösegeld (Ransom) für die Entschlüsselung fordert. Bekannte Beispiele sind WannaCry und NotPetya.",
    category: "Malware",
  },
  {
    term: "Social Engineering",
    definition:
      "Social Engineering bezeichnet psychologische Manipulationstechniken, mit denen Angreifer Menschen dazu bringen, vertrauliche Informationen preiszugeben oder sicherheitsrelevante Handlungen durchzuführen. Phishing ist die bekannteste Form.",
    category: "Angriffsmethoden",
  },
  {
    term: "Endpoint Security",
    definition:
      "Endpoint Security bezeichnet den Schutz von Endgeräten (Laptops, Smartphones, Tablets) vor Cyberbedrohungen. Umfasst Antivirensoftware, Firewalls, Verschlüsselung und MDM.",
    category: "Gerätesicherheit",
  },
  {
    term: "SCORM",
    definition:
      "Sharable Content Object Reference Model (SCORM) ist ein Standard für e-Learning-Inhalte, der die Kompatibilität zwischen verschiedenen Lernmanagementsystemen (LMS) wie Moodle oder SAP SuccessFactors sicherstellt.",
    category: "E-Learning",
  },
];
