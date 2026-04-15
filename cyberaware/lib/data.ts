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
  // ─── Netzwerk ───
  { term: "DNS (Domain Name System)", definition: "Das Domain Name System ist das 'Telefonbuch des Internets'. Es übersetzt menschenlesbare Domainnamen (z.B. google.com) in numerische IP-Adressen, die Computer für die Kommunikation benötigen.", category: "Netzwerk" },
  { term: "DHCP", definition: "Dynamic Host Configuration Protocol — weist Geräten im Netzwerk automatisch IP-Adressen und Netzwerkkonfigurationen zu.", category: "Netzwerk" },
  { term: "VPN (Virtual Private Network)", definition: "Ein VPN schafft einen verschlüsselten Tunnel zwischen Ihrem Gerät und einem VPN-Server, sodass Ihr Internetverkehr für Dritte nicht einsehbar ist. Besonders wichtig bei der Nutzung öffentlicher WLANs.", category: "Netzwerk" },
  { term: "Firewall", definition: "Ein Sicherheitssystem, das den ein- und ausgehenden Netzwerkverkehr anhand vordefinierter Regeln überwacht und kontrolliert. Firewalls können hardware- oder softwarebasiert sein.", category: "Netzwerk" },
  { term: "IP-Adresse", definition: "Eine numerische Kennung, die jedem Gerät in einem Computernetzwerk zugewiesen wird. IPv4 (z.B. 192.168.1.1) und IPv6 sind die zwei verwendeten Versionen.", category: "Netzwerk" },
  { term: "MAC-Adresse", definition: "Media Access Control — eine weltweit eindeutige, 48 Bit lange Hardware-Adresse, die jedem Netzwerkadapter bei der Herstellung zugewiesen wird.", category: "Netzwerk" },
  { term: "NAT (Network Address Translation)", definition: "Ein Verfahren, bei dem private IP-Adressen in öffentliche IP-Adressen übersetzt werden, um mehreren Geräten den Internetzugang über eine einzige öffentliche IP zu ermöglichen.", category: "Netzwerk" },
  { term: "Proxy-Server", definition: "Ein Vermittlungsserver, der als Zwischenstation zwischen Client und Zielserver agiert. Kann für Caching, Filterung, Anonymisierung und Lastverteilung eingesetzt werden.", category: "Netzwerk" },
  { term: "TCP/IP", definition: "Transmission Control Protocol/Internet Protocol — das grundlegende Kommunikationsprotokoll des Internets, das den zuverlässigen Datenaustausch zwischen Computern regelt.", category: "Netzwerk" },
  { term: "WLAN", definition: "Wireless Local Area Network — ein drahtloses lokales Netzwerk, das Geräte über Funkwellen verbindet. Sicherheitsstandards: WPA2 und WPA3.", category: "Netzwerk" },
  { term: "Port", definition: "Eine logische Adresse (0–65535) für Netzwerkdienste. Bekannte Ports: 80 (HTTP), 443 (HTTPS), 22 (SSH), 25 (SMTP). Port-Scanning wird zur Schwachstellenanalyse eingesetzt.", category: "Netzwerk" },
  { term: "Subnetting", definition: "Die Aufteilung eines IP-Netzwerks in kleinere Teilnetze. Verbessert Sicherheit durch Netzwerksegmentierung und effizientere IP-Adressvergabe.", category: "Netzwerk" },
  { term: "SSID", definition: "Service Set Identifier — der Name eines WLANs. Kann versteckt werden, was jedoch keinen echten Sicherheitsgewinn bietet.", category: "Netzwerk" },
  { term: "Bandbreite", definition: "Die maximale Datenübertragungsrate einer Netzwerkverbindung, gemessen in Bit pro Sekunde (bps). Unterschied zwischen Upload- und Download-Geschwindigkeit.", category: "Netzwerk" },
  { term: "Latenz", definition: "Die Verzögerung bei der Datenübertragung im Netzwerk, gemessen in Millisekunden. Niedrige Latenz ist wichtig für Echtzeitanwendungen wie VoIP oder Videokonferenzen.", category: "Netzwerk" },

  // ─── Angriffsmethoden ───
  { term: "Phishing", definition: "Phishing ist eine Methode, bei der Angreifer gefälschte E-Mails, Websites oder Nachrichten verwenden, um vertrauliche Informationen wie Passwörter oder Kreditkartendaten zu stehlen.", category: "Angriffsmethoden" },
  { term: "Spear-Phishing", definition: "Gezielte Phishing-Angriffe auf bestimmte Personen oder Organisationen. Im Gegensatz zu Massen-Phishing werden die Nachrichten individuell auf das Opfer zugeschnitten.", category: "Angriffsmethoden" },
  { term: "Whaling", definition: "Eine Form des Spear-Phishing, die sich gezielt gegen hochrangige Führungskräfte (C-Level) richtet. Die E-Mails sind besonders sorgfältig erstellt.", category: "Angriffsmethoden" },
  { term: "Smishing", definition: "Phishing per SMS. Angreifer senden gefälschte Textnachrichten mit Links zu schadhaften Websites oder fordern zur Preisgabe persönlicher Daten auf.", category: "Angriffsmethoden" },
  { term: "Vishing", definition: "Voice Phishing — Betrug per Telefonanruf. Angreifer geben sich als Bank, Behörde oder IT-Support aus, um an vertrauliche Informationen zu gelangen.", category: "Angriffsmethoden" },
  { term: "BEC (Business Email Compromise)", definition: "Eine Betrugsmasche, bei der Angreifer gefälschte E-Mails im Namen von Führungskräften oder Lieferanten senden, um Mitarbeiter zu unautorisierten Überweisungen zu verleiten. Auch als CEO-Fraud bekannt.", category: "Angriffsmethoden" },
  { term: "Social Engineering", definition: "Psychologische Manipulationstechniken, mit denen Angreifer Menschen dazu bringen, vertrauliche Informationen preiszugeben oder sicherheitsrelevante Handlungen durchzuführen.", category: "Angriffsmethoden" },
  { term: "Man-in-the-Middle (MitM)", definition: "Ein Angriff, bei dem sich der Angreifer unbemerkt in die Kommunikation zwischen zwei Parteien einklinkt und Daten mitlesen oder manipulieren kann.", category: "Angriffsmethoden" },
  { term: "DDoS-Angriff", definition: "Distributed Denial of Service — ein Angriff, bei dem ein Server mit so vielen Anfragen überflutet wird, dass er für legitime Nutzer nicht mehr erreichbar ist.", category: "Angriffsmethoden" },
  { term: "Brute-Force-Angriff", definition: "Ein Angriff, bei dem systematisch alle möglichen Passwörter oder Schlüssel durchprobiert werden, bis der richtige gefunden wird.", category: "Angriffsmethoden" },
  { term: "Dictionary Attack", definition: "Eine Variante des Brute-Force-Angriffs, bei der eine Liste häufig verwendeter Passwörter und Wörter durchprobiert wird.", category: "Angriffsmethoden" },
  { term: "SQL Injection", definition: "Ein Angriff, bei dem schadhafter SQL-Code in Eingabefelder eingefügt wird, um Datenbankabfragen zu manipulieren und an sensible Daten zu gelangen.", category: "Angriffsmethoden" },
  { term: "Cross-Site Scripting (XSS)", definition: "Ein Angriff, bei dem schadhafter JavaScript-Code in Webseiten eingeschleust wird, der dann im Browser anderer Nutzer ausgeführt wird.", category: "Angriffsmethoden" },
  { term: "Credential Stuffing", definition: "Automatisiertes Ausprobieren gestohlener Zugangsdaten (aus Datenlecks) bei verschiedenen Diensten, da viele Nutzer Passwörter wiederverwenden.", category: "Angriffsmethoden" },
  { term: "Typosquatting", definition: "Registrierung von Domains mit Tippfehlern bekannter Marken (z.B. gooogle.com), um Nutzer auf gefälschte Websites zu locken.", category: "Angriffsmethoden" },
  { term: "Shoulder Surfing", definition: "Das heimliche Beobachten von Bildschirmen, Tastaturen oder Displays, um Passwörter oder PINs auszuspähen — z.B. am Geldautomaten oder im Büro.", category: "Angriffsmethoden" },
  { term: "Tailgating / Piggybacking", definition: "Unbefugtes Betreten gesicherter Bereiche, indem man einer autorisierten Person durch die Tür folgt, ohne sich selbst zu authentifizieren.", category: "Angriffsmethoden" },
  { term: "Watering Hole Attack", definition: "Gezielter Angriff, bei dem eine Website kompromittiert wird, die von der Zielgruppe häufig besucht wird, um Schadsoftware zu verbreiten.", category: "Angriffsmethoden" },
  { term: "Supply Chain Attack", definition: "Angriff auf die Lieferkette eines Unternehmens, z.B. über kompromittierte Software-Updates eines Drittanbieters (Beispiel: SolarWinds-Angriff 2020).", category: "Angriffsmethoden" },
  { term: "Pharming", definition: "Manipulation des DNS-Systems, um Nutzer ohne ihr Wissen auf gefälschte Websites umzuleiten, selbst wenn sie die korrekte URL eingeben.", category: "Angriffsmethoden" },
  { term: "Dumpster Diving", definition: "Das Durchsuchen von Abfall (physisch oder digital) nach vertraulichen Informationen wie Passwörtern, internen Dokumenten oder Hardwarekomponenten.", category: "Angriffsmethoden" },
  { term: "Pretexting", definition: "Social-Engineering-Technik, bei der der Angreifer eine erfundene Geschichte (Pretext) nutzt, um das Vertrauen des Opfers zu gewinnen und an Informationen zu gelangen.", category: "Angriffsmethoden" },
  { term: "Baiting", definition: "Angriff, bei dem ein mit Malware infizierter USB-Stick oder ein verlockend beschrifteter Datenträger absichtlich platziert wird, damit ein Opfer ihn findet und anschließt.", category: "Angriffsmethoden" },

  // ─── Verschlüsselung ───
  { term: "SSL/TLS", definition: "SSL (Secure Sockets Layer) und sein Nachfolger TLS (Transport Layer Security) sind kryptographische Protokolle für verschlüsselte Kommunikation über das Internet. Sie bilden die Grundlage für HTTPS.", category: "Verschlüsselung" },
  { term: "HTTPS", definition: "HyperText Transfer Protocol Secure — die verschlüsselte Variante von HTTP. Erkennbar am Schloss-Symbol im Browser. Daten werden per TLS verschlüsselt übertragen.", category: "Verschlüsselung" },
  { term: "AES (Advanced Encryption Standard)", definition: "Symmetrischer Verschlüsselungsstandard mit 128-, 192- oder 256-Bit-Schlüsseln. Gilt als sicher und wird weltweit für die Verschlüsselung von Daten eingesetzt.", category: "Verschlüsselung" },
  { term: "RSA", definition: "Asymmetrisches Verschlüsselungsverfahren, bei dem ein öffentlicher Schlüssel zum Verschlüsseln und ein privater Schlüssel zum Entschlüsseln verwendet wird.", category: "Verschlüsselung" },
  { term: "End-to-End-Verschlüsselung", definition: "Verschlüsselungsverfahren, bei dem nur Sender und Empfänger die Nachrichten lesen können. Selbst der Dienstanbieter hat keinen Zugriff auf den Inhalt (z.B. Signal, WhatsApp).", category: "Verschlüsselung" },
  { term: "Hash-Funktion", definition: "Mathematische Einwegfunktion, die eine beliebige Eingabe in einen festen Ausgabewert (Hash) umwandelt. Verwendung für Passwort-Speicherung und Integritätsprüfung. Beispiele: SHA-256, bcrypt.", category: "Verschlüsselung" },
  { term: "Symmetrische Verschlüsselung", definition: "Verschlüsselungsverfahren mit einem einzigen Schlüssel für Ver- und Entschlüsselung. Schnell, aber das Schlüsselaustausch-Problem muss gelöst werden.", category: "Verschlüsselung" },
  { term: "Asymmetrische Verschlüsselung", definition: "Verschlüsselungsverfahren mit einem Schlüsselpaar (öffentlich/privat). Der öffentliche Schlüssel verschlüsselt, der private entschlüsselt. Basis für digitale Signaturen.", category: "Verschlüsselung" },
  { term: "PKI (Public Key Infrastructure)", definition: "Infrastruktur zur Erstellung, Verwaltung und Überprüfung digitaler Zertifikate. Bildet die Vertrauensbasis für HTTPS und digitale Signaturen.", category: "Verschlüsselung" },
  { term: "S/MIME", definition: "Secure/Multipurpose Internet Mail Extensions — Standard für die Verschlüsselung und digitale Signierung von E-Mails per Zertifikat.", category: "Verschlüsselung" },
  { term: "PGP / GPG", definition: "Pretty Good Privacy / GNU Privacy Guard — Verschlüsselungssoftware für E-Mails und Dateien basierend auf asymmetrischer Kryptographie mit Web of Trust.", category: "Verschlüsselung" },
  { term: "Zertifikat (Digital)", definition: "Ein digitaler Ausweis, der die Identität einer Website oder Person bestätigt. Ausgestellt von einer Certificate Authority (CA) und Grundlage für HTTPS.", category: "Verschlüsselung" },
  { term: "Salt (Kryptographie)", definition: "Zufällige Daten, die vor dem Hashing an ein Passwort angehängt werden. Verhindert Rainbow-Table-Angriffe und stellt sicher, dass gleiche Passwörter unterschiedliche Hashes erzeugen.", category: "Verschlüsselung" },
  { term: "BitLocker", definition: "Microsoft-Vollverschlüsselung für Windows-Festplatten. Schützt Daten auf dem Gerät, selbst wenn die Festplatte physisch ausgebaut wird.", category: "Verschlüsselung" },
  { term: "FileVault", definition: "Apple-Vollverschlüsselung für macOS. Verschlüsselt die gesamte Festplatte mit XTS-AES-128-Verschlüsselung.", category: "Verschlüsselung" },

  // ─── Authentifizierung ───
  { term: "2FA / MFA", definition: "Zwei-Faktor-Authentifizierung (2FA) oder Multi-Faktor-Authentifizierung (MFA) erfordert zwei oder mehr Faktoren: Wissen (Passwort), Besitz (Token/Handy) oder Biometrie (Fingerabdruck).", category: "Authentifizierung" },
  { term: "TOTP", definition: "Time-based One-Time Password — ein zeitbasiertes Einmalpasswort, das von Authenticator-Apps (Google Authenticator, Authy) generiert wird und alle 30 Sekunden wechselt.", category: "Authentifizierung" },
  { term: "FIDO2 / WebAuthn", definition: "Moderner Authentifizierungsstandard, der passwortlose Anmeldung per Hardware-Schlüssel (YubiKey) oder biometrischen Sensoren ermöglicht.", category: "Authentifizierung" },
  { term: "SSO (Single Sign-On)", definition: "Einmalanmeldung — ein Authentifizierungsverfahren, bei dem ein einzelner Login-Vorgang den Zugriff auf mehrere Systeme ermöglicht (z.B. Microsoft 365, Google Workspace).", category: "Authentifizierung" },
  { term: "OAuth 2.0", definition: "Autorisierungsprotokoll, das Drittanbieter-Apps den begrenzten Zugriff auf Ressourcen eines Nutzers erlaubt, ohne das Passwort preiszugeben (z.B. 'Mit Google anmelden').", category: "Authentifizierung" },
  { term: "SAML", definition: "Security Assertion Markup Language — XML-basierter Standard für den Austausch von Authentifizierungs- und Autorisierungsdaten zwischen Identity Provider und Service Provider.", category: "Authentifizierung" },
  { term: "Passkey", definition: "Modernes, passwortloses Anmeldeverfahren basierend auf FIDO2. Verwendet kryptographische Schlüsselpaare statt Passwörter. Von Apple, Google und Microsoft unterstützt.", category: "Authentifizierung" },
  { term: "Passwortmanager", definition: "Software zur sicheren Verwaltung aller Passwörter in einem verschlüsselten Tresor. Beispiele: Bitwarden, 1Password, KeePass. Generiert starke, einzigartige Passwörter.", category: "Authentifizierung" },
  { term: "YubiKey", definition: "Hardware-Sicherheitsschlüssel von Yubico für 2FA und passwortlose Authentifizierung. Unterstützt FIDO2, OTP und PIV. Gilt als sicherste 2FA-Methode.", category: "Authentifizierung" },
  { term: "Biometrische Authentifizierung", definition: "Identitätsprüfung anhand körperlicher Merkmale: Fingerabdruck, Gesichtserkennung, Iris-Scan. Bequem, aber bei Kompromittierung nicht änderbar.", category: "Authentifizierung" },
  { term: "Kerberos", definition: "Netzwerk-Authentifizierungsprotokoll, das Tickets zur sicheren Identitätsprüfung in Windows-Domänen verwendet. Vermeidet die Übertragung von Passwörtern.", category: "Authentifizierung" },
  { term: "LDAP", definition: "Lightweight Directory Access Protocol — Protokoll für den Zugriff auf Verzeichnisdienste (z.B. Active Directory), die Benutzerkonten und Berechtigungen verwalten.", category: "Authentifizierung" },

  // ─── Recht & Compliance ───
  { term: "DSGVO", definition: "Die Datenschutz-Grundverordnung ist eine EU-Verordnung, die seit Mai 2018 den Umgang mit personenbezogenen Daten regelt. Sie gewährt Betroffenen umfangreiche Rechte und verpflichtet Unternehmen zu transparenter Datenverarbeitung.", category: "Recht & Compliance" },
  { term: "BDSG", definition: "Bundesdatenschutzgesetz — das deutsche Datenschutzgesetz, das die DSGVO für Deutschland ergänzt und konkretisiert.", category: "Recht & Compliance" },
  { term: "CCPA", definition: "California Consumer Privacy Act — das kalifornische Datenschutzgesetz, das Verbrauchern ähnliche Rechte wie die DSGVO einräumt.", category: "Recht & Compliance" },
  { term: "NIS2-Richtlinie", definition: "EU-Richtlinie für Cybersicherheit, die seit 2024 gilt. Erweitert den Kreis der betroffenen Unternehmen und verschärft die Meldepflichten bei Sicherheitsvorfällen.", category: "Recht & Compliance" },
  { term: "ISO 27001", definition: "Internationaler Standard für Informationssicherheits-Managementsysteme (ISMS). Zertifizierung belegt, dass ein Unternehmen systematisch Informationssicherheit betreibt.", category: "Recht & Compliance" },
  { term: "BSI Grundschutz", definition: "Vom Bundesamt für Sicherheit in der Informationstechnik (BSI) entwickelte Methodik zur Identifizierung und Umsetzung von IT-Sicherheitsmaßnahmen.", category: "Recht & Compliance" },
  { term: "Auftragsverarbeitung (AVV)", definition: "Vertrag nach Art. 28 DSGVO, der geschlossen werden muss, wenn ein externer Dienstleister personenbezogene Daten im Auftrag eines Unternehmens verarbeitet.", category: "Recht & Compliance" },
  { term: "Datenschutzbeauftragter (DSB)", definition: "Ab 20 Personen mit regelmäßiger Datenverarbeitung gesetzlich vorgeschrieben. Intern unabhängig und weisungsfrei tätig. Berät und kontrolliert die DSGVO-Einhaltung.", category: "Recht & Compliance" },
  { term: "Datenschutz-Folgenabschätzung", definition: "DSFA nach Art. 35 DSGVO — Pflicht bei hohem Risiko für die Rechte von Betroffenen. Analysiert die Risiken einer Datenverarbeitung und legt Schutzmaßnahmen fest.", category: "Recht & Compliance" },
  { term: "Recht auf Vergessenwerden", definition: "Art. 17 DSGVO — Betroffene können die Löschung ihrer Daten verlangen, wenn der Zweck der Verarbeitung entfallen ist oder die Einwilligung widerrufen wurde.", category: "Recht & Compliance" },
  { term: "Datenportabilität", definition: "Art. 20 DSGVO — das Recht, persönliche Daten in einem maschinenlesbaren Format zu erhalten und an einen anderen Anbieter zu übertragen.", category: "Recht & Compliance" },
  { term: "Privacy by Design", definition: "Datenschutzprinzip, das verlangt, dass Datenschutz von Anfang an in die Entwicklung von Systemen und Prozessen eingebaut wird, nicht erst nachträglich.", category: "Recht & Compliance" },
  { term: "Privacy by Default", definition: "Standardmäßig datenschutzfreundliche Einstellungen — nur die für den Zweck notwendigen Daten werden erhoben und verarbeitet.", category: "Recht & Compliance" },
  { term: "Whistleblower-Schutz", definition: "Gesetzlicher Schutz für Personen, die Missstände oder Rechtsverstöße in Unternehmen melden. EU-Whistleblower-Richtlinie seit 2023 in deutsches Recht umgesetzt.", category: "Recht & Compliance" },
  { term: "SOC 2", definition: "Service Organization Control 2 — Audit-Standard für Cloud-Dienstleister zu Sicherheit, Verfügbarkeit, Integrität, Vertraulichkeit und Datenschutz.", category: "Recht & Compliance" },
  { term: "TISAX", definition: "Trusted Information Security Assessment Exchange — branchenspezifischer Sicherheitsstandard der Automobilindustrie basierend auf ISO 27001.", category: "Recht & Compliance" },

  // ─── Malware ───
  { term: "Ransomware", definition: "Schadsoftware, die Dateien verschlüsselt und ein Lösegeld (Ransom) für die Entschlüsselung fordert. Bekannte Beispiele: WannaCry, LockBit, Conti.", category: "Malware" },
  { term: "Trojaner", definition: "Schadsoftware, die sich als nützliches Programm tarnt und im Hintergrund schädliche Funktionen ausführt, z.B. Daten ausspähen oder Hintertüren öffnen.", category: "Malware" },
  { term: "Rootkit", definition: "Software, die sich tief im Betriebssystem verankert, um einem Angreifer dauerhaften, versteckten Zugriff auf ein System zu ermöglichen.", category: "Malware" },
  { term: "Keylogger", definition: "Schadsoftware oder Hardware, die Tastatureingaben aufzeichnet, um Passwörter, Kreditkartennummern und andere sensible Daten zu stehlen.", category: "Malware" },
  { term: "Spyware", definition: "Software, die heimlich Informationen über die Aktivitäten eines Nutzers sammelt und an Dritte übermittelt — z.B. Browsing-Verhalten, Tastatureingaben.", category: "Malware" },
  { term: "Adware", definition: "Software, die unerwünschte Werbung anzeigt. Oft mit Freeware gebündelt. Kann die Privatsphäre gefährden, indem sie das Surfverhalten trackt.", category: "Malware" },
  { term: "Wurm", definition: "Selbstreplizierende Malware, die sich ohne menschliches Zutun über Netzwerke verbreitet. Im Gegensatz zu Viren benötigt ein Wurm kein Wirtsprogramm.", category: "Malware" },
  { term: "Bot / Botnet", definition: "Ein infizierter Computer (Bot), der ferngesteuert werden kann. Viele Bots bilden ein Botnet, das für DDoS-Angriffe, Spam-Versand oder Krypto-Mining missbraucht wird.", category: "Malware" },
  { term: "Fileless Malware", definition: "Schadsoftware, die ohne Dateien auf der Festplatte auskommt. Läuft nur im Arbeitsspeicher und nutzt System-Tools wie PowerShell, was die Erkennung erschwert.", category: "Malware" },
  { term: "Polymorphe Malware", definition: "Malware, die ihren Code bei jeder Infektion verändert, um signaturbasierte Antivirenprogramme zu umgehen.", category: "Malware" },
  { term: "Cryptojacking", definition: "Unbefugte Nutzung von Computerressourcen zum Schürfen von Kryptowährungen, oft über JavaScript-Code in Webseiten oder durch Malware.", category: "Malware" },
  { term: "Dropper", definition: "Malware-Typ, dessen einziger Zweck es ist, andere Schadsoftware herunterzuladen und auf dem System zu installieren.", category: "Malware" },

  // ─── Gerätesicherheit ───
  { term: "Endpoint Security", definition: "Der Schutz von Endgeräten (Laptops, Smartphones, Tablets) vor Cyberbedrohungen. Umfasst Antivirensoftware, Firewalls, Verschlüsselung und MDM.", category: "Gerätesicherheit" },
  { term: "MDM (Mobile Device Management)", definition: "Zentrale Verwaltung mobiler Firmengräte: App-Verteilung, Richtlinien durchsetzen, Fernlöschung bei Verlust, Verschlüsselung erzwingen.", category: "Gerätesicherheit" },
  { term: "BYOD", definition: "Bring Your Own Device — Richtlinie, die Mitarbeitern erlaubt, private Geräte geschäftlich zu nutzen. Erfordert klare Sicherheitsregeln und MDM-Profile.", category: "Gerätesicherheit" },
  { term: "Patch Management", definition: "Systematischer Prozess zur Identifikation, Bewertung und Installation von Software-Updates, um bekannte Sicherheitslücken zu schließen.", category: "Gerätesicherheit" },
  { term: "EDR (Endpoint Detection & Response)", definition: "Erweiterte Endpoint-Security-Lösung, die Bedrohungen in Echtzeit erkennt, analysiert und automatisch darauf reagiert.", category: "Gerätesicherheit" },
  { term: "Festplattenverschlüsselung", definition: "Vollständige Verschlüsselung der Festplatte (BitLocker, FileVault). Schützt Daten bei Verlust oder Diebstahl des Geräts.", category: "Gerätesicherheit" },
  { term: "Secure Boot", definition: "Firmware-Sicherheitsfunktion, die sicherstellt, dass nur vertrauenswürdige Software beim Systemstart geladen wird.", category: "Gerätesicherheit" },
  { term: "Remote Wipe", definition: "Fernlöschung aller Daten auf einem verlorenen oder gestohlenen Gerät über MDM. Sofort IT informieren bei Geräteverlust.", category: "Gerätesicherheit" },
  { term: "Bildschirmsperre", definition: "Automatische Sperrung nach max. 5 Min. Inaktivität. Shortcut: Win+L (Windows) / Ctrl+Cmd+Q (Mac). Standard-Sicherheitsmaßnahme am Arbeitsplatz.", category: "Gerätesicherheit" },
  { term: "USB-Sicherheit", definition: "Richtlinien zum Umgang mit USB-Geräten: keine unbekannten USB-Sticks verwenden, USB-Ports sperren, verschlüsselte USB-Sticks für Firmendaten.", category: "Gerätesicherheit" },
  { term: "Antivirus / Anti-Malware", definition: "Software zur Erkennung, Quarantäne und Entfernung von Schadsoftware. Moderne Lösungen nutzen heuristiken und KI neben Signaturen.", category: "Gerätesicherheit" },

  // ─── Cloud & Infrastruktur ───
  { term: "SaaS", definition: "Software as a Service — Cloud-Modell, bei dem Software über das Internet bereitgestellt wird (z.B. Microsoft 365, Google Workspace). Keine lokale Installation nötig.", category: "Cloud" },
  { term: "IaaS", definition: "Infrastructure as a Service — Cloud-Modell, bei dem virtuelle Server, Speicher und Netzwerke gemietet werden (z.B. AWS EC2, Azure VMs).", category: "Cloud" },
  { term: "PaaS", definition: "Platform as a Service — Cloud-Modell, das eine Entwicklungsplattform bereitstellt (z.B. Heroku, Google App Engine).", category: "Cloud" },
  { term: "Shared Responsibility Model", definition: "Verantwortungsteilung in der Cloud: Der Anbieter schützt die Infrastruktur, der Kunde ist für Daten, Anwendungen und Zugriffsrechte selbst verantwortlich.", category: "Cloud" },
  { term: "3-2-1-Backup-Regel", definition: "Best Practice: 3 Kopien auf 2 verschiedenen Medientypen, davon 1 extern. Ein nicht getestetes Backup ist kein Backup.", category: "Cloud" },
  { term: "Data Residency", definition: "Bestimmung des physischen Speicherorts von Daten. DSGVO-relevant: Daten von EU-Bürgern sollten idealerweise in der EU gespeichert werden.", category: "Cloud" },
  { term: "Shadow IT", definition: "IT-Systeme, Software oder Cloud-Dienste, die ohne Wissen oder Genehmigung der IT-Abteilung von Mitarbeitern genutzt werden.", category: "Cloud" },
  { term: "Container-Sicherheit", definition: "Schutz von Docker- und Kubernetes-Containern: Image-Scanning, minimale Basis-Images, keine Root-Rechte, Netzwerkpolicies.", category: "Cloud" },
  { term: "Least Privilege", definition: "Minimale Rechtevergabe — jeder Nutzer und jede Anwendung erhält nur die Berechtigungen, die für die jeweilige Aufgabe notwendig sind.", category: "Cloud" },

  // ─── Schwachstellen ───
  { term: "Zero-Day", definition: "Eine Sicherheitslücke in Software, die dem Hersteller noch unbekannt ist oder für die noch kein Patch existiert. 'Zero Days' seit Bekanntwerden.", category: "Schwachstellen" },
  { term: "CVE", definition: "Common Vulnerabilities and Exposures — ein standardisiertes Nummerierungssystem für bekannte Sicherheitslücken (z.B. CVE-2023-44487).", category: "Schwachstellen" },
  { term: "CVSS", definition: "Common Vulnerability Scoring System — Bewertungsskala (0–10) für den Schweregrad von Schwachstellen. Ab 7.0 gilt eine Lücke als 'hoch'.", category: "Schwachstellen" },
  { term: "Exploit", definition: "Code oder Technik, die eine Sicherheitslücke ausnutzt. Exploits können automatisiert in Exploit-Kits gebündelt werden.", category: "Schwachstellen" },
  { term: "Bug Bounty", definition: "Programm, bei dem Unternehmen ethische Hacker dafür bezahlen, Sicherheitslücken zu finden und verantwortungsvoll zu melden.", category: "Schwachstellen" },
  { term: "Penetrationstest (Pentest)", definition: "Autorisierter, simulierter Cyberangriff auf ein System, um Schwachstellen zu identifizieren, bevor echte Angreifer sie finden.", category: "Schwachstellen" },
  { term: "Vulnerability Scanning", definition: "Automatisierte Überprüfung von Systemen auf bekannte Schwachstellen. Tools: Nessus, Qualys, OpenVAS.", category: "Schwachstellen" },
  { term: "Attack Surface", definition: "Die Gesamtheit aller Angriffspunkte eines Systems — alle Ports, Dienste, APIs, E-Mail-Adressen und Schnittstellen, die ein Angreifer potenziell nutzen kann.", category: "Schwachstellen" },
  { term: "OWASP Top 10", definition: "Liste der zehn häufigsten Sicherheitsrisiken in Webanwendungen, herausgegeben von der Open Worldwide Application Security Project Foundation.", category: "Schwachstellen" },

  // ─── E-Mail-Sicherheit ───
  { term: "SPF (Sender Policy Framework)", definition: "DNS-Eintrag, der festlegt, welche Server E-Mails im Namen einer Domain senden dürfen. Verhindert E-Mail-Spoofing.", category: "E-Mail" },
  { term: "DKIM", definition: "DomainKeys Identified Mail — digitale Signatur für E-Mails, die die Authentizität und Unverändertheit einer Nachricht bestätigt.", category: "E-Mail" },
  { term: "DMARC", definition: "Domain-based Message Authentication, Reporting & Conformance — Richtlinie, die SPF und DKIM kombiniert und vorschreibt, was mit nicht-authentifizierten E-Mails geschehen soll.", category: "E-Mail" },
  { term: "E-Mail-Spoofing", definition: "Fälschung des Absenderfeldes einer E-Mail, um den Anschein zu erwecken, sie stamme von einer vertrauenswürdigen Quelle.", category: "E-Mail" },
  { term: "Spam", definition: "Unerwünschte Massen-E-Mails, die Werbung, Betrugsversuche oder Malware enthalten. Spam-Filter sortieren diese automatisch aus.", category: "E-Mail" },
  { term: "Sandbox (E-Mail)", definition: "Isolierte Umgebung, in der E-Mail-Anhänge automatisch geöffnet und analysiert werden, bevor sie den Empfänger erreichen.", category: "E-Mail" },
  { term: "URL Rewriting", definition: "Sicherheitstechnik, bei der Links in E-Mails durch einen Proxy-Link ersetzt werden, der die Ziel-URL vor dem Weiterleiten auf Gefahren prüft.", category: "E-Mail" },
  { term: "Makro-Sicherheit", definition: "Office-Makros (.docm, .xlsm) können Schadcode enthalten. Best Practice: Makros standardmäßig deaktivieren, nur signierte Makros aus vertrauenswürdigen Quellen erlauben.", category: "E-Mail" },

  // ─── Incident Response ───
  { term: "SIEM", definition: "Security Information and Event Management — zentralisierte Plattform, die Sicherheitsereignisse aus verschiedenen Quellen sammelt, korreliert und analysiert.", category: "Incident Response" },
  { term: "SOC (Security Operations Center)", definition: "Team und Einrichtung, die IT-Sicherheit rund um die Uhr überwacht, Sicherheitsvorfälle erkennt und darauf reagiert.", category: "Incident Response" },
  { term: "Incident Response Plan", definition: "Dokumentierter Ablaufplan für den Umgang mit Sicherheitsvorfällen: Erkennung, Eindämmung, Beseitigung, Wiederherstellung und Nachbereitung.", category: "Incident Response" },
  { term: "Forensik (IT)", definition: "Wissenschaftliche Untersuchung digitaler Geräte und Daten zur Aufklärung von Sicherheitsvorfällen und Straftaten. Beweissicherung ist entscheidend.", category: "Incident Response" },
  { term: "Chain of Custody", definition: "Lückenlose Dokumentation der Beweiskette bei digitaler Forensik. Stellt sicher, dass Beweise vor Gericht verwertbar sind.", category: "Incident Response" },
  { term: "Datenpanne (Breach)", definition: "Verletzung der Datensicherheit, bei der personenbezogene Daten unbefugt offengelegt werden. Meldepflicht: 72 Stunden an die Aufsichtsbehörde (Art. 33 DSGVO).", category: "Incident Response" },
  { term: "Business Continuity", definition: "Strategien und Maßnahmen, die sicherstellen, dass kritische Geschäftsprozesse auch bei Störungen oder Katastrophen weiterlaufen können.", category: "Incident Response" },
  { term: "Disaster Recovery", definition: "Plan zur Wiederherstellung von IT-Infrastruktur und Daten nach einem Zwischenfall. Definiert RTO (Wiederherstellungszeit) und RPO (max. Datenverlust).", category: "Incident Response" },
  { term: "Threat Intelligence", definition: "Sammlung und Analyse von Informationen über aktuelle Bedrohungen, Angreifer und Angriffstechniken zur proaktiven Verteidigung.", category: "Incident Response" },
  { term: "IOC (Indicator of Compromise)", definition: "Indikatoren eines Sicherheitsvorfalls: verdächtige IP-Adressen, Datei-Hashes, ungewöhnliche DNS-Abfragen oder Registry-Änderungen.", category: "Incident Response" },

  // ─── Web-Sicherheit ───
  { term: "CORS", definition: "Cross-Origin Resource Sharing — HTTP-Header-basierter Mechanismus, der regelt, welche Domains auf Ressourcen einer Website zugreifen dürfen.", category: "Web-Sicherheit" },
  { term: "CSP (Content Security Policy)", definition: "HTTP-Header, der festlegt, welche Ressourcen (Scripts, Styles) eine Webseite laden darf. Schützt vor XSS und Code-Injection.", category: "Web-Sicherheit" },
  { term: "CSRF", definition: "Cross-Site Request Forgery — Angriff, bei dem ein eingeloggter Nutzer dazu gebracht wird, unbeabsichtigt Aktionen auf einer Website auszuführen.", category: "Web-Sicherheit" },
  { term: "WAF (Web Application Firewall)", definition: "Firewall speziell für Webanwendungen, die HTTP/HTTPS-Verkehr filtert und vor Angriffen wie SQL Injection und XSS schützt.", category: "Web-Sicherheit" },
  { term: "Cookie", definition: "Kleine Datei, die von Websites im Browser gespeichert wird. First-Party-Cookies sind meist nötig, Third-Party-Cookies dienen oft dem Tracking.", category: "Web-Sicherheit" },
  { term: "Same-Origin-Policy", definition: "Browser-Sicherheitsrichtlinie, die verhindert, dass Scripts einer Website auf Daten einer anderen Website zugreifen können.", category: "Web-Sicherheit" },
  { term: "HSTS", definition: "HTTP Strict Transport Security — zwingt Browser, nur HTTPS-Verbindungen zu einer Website zuzulassen. Schützt vor SSL-Stripping-Angriffen.", category: "Web-Sicherheit" },
  { term: "Clickjacking", definition: "Angriff, bei dem unsichtbare iframe-Elemente über eine sichtbare Webseite gelegt werden, um Nutzer zum Klicken auf versteckte Schaltflächen zu verleiten.", category: "Web-Sicherheit" },
  { term: "API-Sicherheit", definition: "Schutz von Programmierschnittstellen: API-Keys, OAuth-Tokens, Rate-Limiting, Input-Validierung und Protokollierung aller API-Aufrufe.", category: "Web-Sicherheit" },

  // ─── Datenschutz ───
  { term: "Personenbezogene Daten", definition: "Alle Informationen, die eine Person direkt oder indirekt identifizieren: Name, E-Mail, IP-Adresse, Standort, biometrische Daten, Gesundheitsdaten.", category: "Datenschutz" },
  { term: "Pseudonymisierung", definition: "Verarbeitung personenbezogener Daten, sodass sie ohne Hinzuziehung zusätzlicher Informationen nicht mehr einer Person zugeordnet werden können.", category: "Datenschutz" },
  { term: "Anonymisierung", definition: "Unwiderrufliche Entfernung aller personenidentifizierenden Merkmale. Anonymisierte Daten unterliegen nicht mehr der DSGVO.", category: "Datenschutz" },
  { term: "Data Minimization", definition: "DSGVO-Grundsatz: Nur die personenbezogenen Daten erheben, die für den konkreten Zweck tatsächlich erforderlich sind.", category: "Datenschutz" },
  { term: "Zweckbindung", definition: "Personenbezogene Daten dürfen nur für den Zweck verarbeitet werden, für den sie erhoben wurden (Art. 5 DSGVO).", category: "Datenschutz" },
  { term: "Aufbewahrungsfrist", definition: "Zeitraum, für den Daten gespeichert werden dürfen/müssen. Nach Ablauf müssen sie gelöscht werden. Variiert je nach Datentyp und Rechtsgrundlage.", category: "Datenschutz" },
  { term: "Einwilligung (Consent)", definition: "Freiwillige, informierte und eindeutige Zustimmung zur Datenverarbeitung. Muss jederzeit widerrufbar sein. Vorausgefüllte Checkboxen sind ungültig.", category: "Datenschutz" },
  { term: "Berechtigtes Interesse", definition: "Art. 6 Abs.1 lit.f DSGVO — Rechtsgrundlage für Datenverarbeitung ohne Einwilligung, wenn das Interesse des Unternehmens überwiegt und angemessen ist.", category: "Datenschutz" },
  { term: "TOM", definition: "Technische und Organisatorische Maßnahmen — dokumentierte Schutzmaßnahmen für personenbezogene Daten (Zutrittskontrolle, Verschlüsselung, Backup-Konzept).", category: "Datenschutz" },
  { term: "Verzeichnis der Verarbeitungstätigkeiten", definition: "DSGVO-Pflichtdokument, das alle Verarbeitungstätigkeiten mit personenbezogenen Daten eines Unternehmens erfasst.", category: "Datenschutz" },
  { term: "Datenübertragung in Drittländer", definition: "Transfer personenbezogener Daten außerhalb der EU. Rechtmäßig nur bei Angemessenheitsbeschluss, Standardvertragsklauseln oder Binding Corporate Rules.", category: "Datenschutz" },

  // ─── E-Learning Standards ───
  { term: "SCORM", definition: "Sharable Content Object Reference Model — Standard für e-Learning-Inhalte, der Kompatibilität zwischen verschiedenen LMS wie Moodle oder SAP SuccessFactors sicherstellt.", category: "E-Learning" },
  { term: "xAPI (Experience API)", definition: "Nachfolger von SCORM. Erfasst Lernerfahrungen  flexibler und geräteübergreifend, auch außerhalb eines LMS (z.B. mobile Apps, Simulationen).", category: "E-Learning" },
  { term: "LMS (Learning Management System)", definition: "Software zur Verwaltung und Bereitstellung von Online-Lerninhalten: Moodle, SAP SuccessFactors, Cornerstone OnDemand.", category: "E-Learning" },
  { term: "Microlearning", definition: "Lernmethode mit kurzen, fokussierten Lerneinheiten (3–10 Minuten), die sich gut in den Arbeitsalltag integrieren lassen.", category: "E-Learning" },
  { term: "Gamification", definition: "Einsatz spielerischer Elemente (Punkte, Badges, Ranglisten) in nicht-spielerischen Kontexten, um Motivation und Engagement zu steigern.", category: "E-Learning" },
  { term: "Completion Rate", definition: "Abschlussquote — der Prozentsatz der Lernenden, die eine Schulung erfolgreich abgeschlossen haben. KPI für Compliance-Reporting.", category: "E-Learning" },

  // ─── Spezialthemen ───
  { term: "Dark Web", definition: "Teil des Internets, der nur über spezielle Software (Tor-Browser) zugänglich ist. Wird für anonyme Kommunikation, aber auch für illegale Handelsplätze genutzt.", category: "Spezialthemen" },
  { term: "Deepfake", definition: "KI-generierte Medieninhalte (Video, Audio), die echte Personen täuschend echt imitieren. Zunehmend für CEO-Fraud und Identitätsbetrug eingesetzt.", category: "Spezialthemen" },
  { term: "Honeypot", definition: "Absichtlich verwundbares System, das als Köder für Angreifer dient. Dient der Analyse von Angriffsmethoden und der Frühwarnung.", category: "Spezialthemen" },
  { term: "Red Team / Blue Team", definition: "Red Team: simuliert Angriffe. Blue Team: verteidigt. Purple Team: kombiniert beide Perspektiven für ganzheitliche Sicherheit.", category: "Spezialthemen" },
  { term: "Zero Trust", definition: "Sicherheitsmodell, das keinem Nutzer oder Gerät automatisch vertraut — auch nicht innerhalb des Firmennetzwerks. 'Never trust, always verify.'", category: "Spezialthemen" },
  { term: "SASE (Secure Access Service Edge)", definition: "Cloud-basiertes Sicherheitsmodell, das Netzwerk- und Sicherheitsfunktionen (VPN, Firewall, CASB) in einem Service vereint.", category: "Spezialthemen" },
  { term: "Quantencomputing-Bedrohung", definition: "Zukünftige Quantencomputer könnten heutige Verschlüsselung (RSA, ECC) brechen. Post-Quantum-Kryptographie wird bereits entwickelt.", category: "Spezialthemen" },
  { term: "Threat Modeling", definition: "Systematische Analyse potenzieller Bedrohungen für ein System. Gängige Methoden: STRIDE, PASTA, Attack Trees.", category: "Spezialthemen" },
  { term: "Rainbow Table", definition: "Vorberechnete Tabelle von Hash-Werten für bekannte Passwörter. Wird durch Salting unwirksam gemacht.", category: "Spezialthemen" },
  { term: "Have I Been Pwned", definition: "Kostenloser Online-Dienst (haveibeenpwned.com), der prüft, ob die eigene E-Mail-Adresse in einem Datenleck aufgetaucht ist.", category: "Spezialthemen" },
  { term: "Cyber Kill Chain", definition: "7-Phasen-Modell von Lockheed Martin für Cyberangriffe: Aufklärung, Bewaffnung, Lieferung, Ausnutzung, Installation, C2, Aktionen auf dem Ziel.", category: "Spezialthemen" },
  { term: "MITRE ATT&CK", definition: "Umfassende Wissensbasis für Angriffstechniken und -taktiken, die von Sicherheitsteams weltweit zur Bedrohungsanalyse und -abwehr genutzt wird.", category: "Spezialthemen" },
];

