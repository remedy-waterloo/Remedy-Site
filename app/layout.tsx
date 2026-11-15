import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Remedy",
  description:
    "Remedy Zero is a countertop pill dispenser that verifies the patient before every dose and gives families, caregivers and retirement homes a live record of medication adherence",
  keywords: [
    "pill dispenser",
    "medication management",
    "elderly care",
    "retirement homes",
    "medication adherence",
    "smart dispenser",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variable sits on <html> so the @theme --font-sans token can
    // resolve it at :root.
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
