import type { Metadata } from "next";
import { Unbounded, Golos_Text } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const golos = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--font-golos",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChatGPT Plus и Spotify Premium — активация без иностранной карты",
  description:
    "Только две услуги: ChatGPT Plus и Spotify Premium на ваш аккаунт. Оплата в рублях, ~15 минут, гарантия 30 дней.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={cn("dark", unbounded.variable, golos.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
