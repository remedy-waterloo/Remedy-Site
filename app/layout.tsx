import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Remedy — AI-Powered Medication Management",
  description:
    "Remedy is a health tech company designing next-generation AI pill dispensers for elderly patients. Safe, smart, and connected medication management.",
  keywords: [
    "pill dispenser",
    "medication management",
    "elderly care",
    "health tech",
    "AI",
    "smart dispenser",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
