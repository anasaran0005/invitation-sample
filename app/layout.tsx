import type { Metadata } from "next";
import { Playfair_Display, Pinyon_Script, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tharun & Keerthi | Wedding Invitation",
  description: "You are cordially invited to celebrate the wedding of Tharun and Keerthi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${pinyon.variable} ${inter.variable} antialiased font-inter`}>
        {children}
      </body>
    </html>
  );
}
