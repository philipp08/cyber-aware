import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
    <html lang="de" className={inter.variable}>
      <body style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>{children}</body>
    </html>
  );
}
