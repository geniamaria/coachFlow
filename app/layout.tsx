import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CoachFlow",
  description: "Plataforma de gestão para personal trainers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}