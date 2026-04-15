import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CyberAware – Datensicherheitsschulungen für Unternehmen",
  description:
    "Schulen Sie Ihre Mitarbeiter mit interaktiven Modulen zu Datensicherheit, DSGVO und Phishing-Erkennung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={geist.variable}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
