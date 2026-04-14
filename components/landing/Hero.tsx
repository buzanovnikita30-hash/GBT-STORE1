"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const badges = [
  "Без смены аккаунта",
  "Гарантия возврата",
  "Оплата картой РФ",
  "500+ клиентов",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(79,142,247,0.22),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] noise-hero mix-blend-overlay"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-primary sm:text-sm">
            Только ChatGPT Plus и Spotify Premium
          </p>
          <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            ChatGPT Plus и Spotify — без иностранной карты
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Узкая специализация: активируем эти две подписки на ваш аккаунт за ~15
            минут. Оплата в рублях, работаем в РФ с 2022 года.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button size="lg" className="min-w-[200px] shadow-xl shadow-primary/25" asChild>
              <Link href="/order">Выбрать подписку</Link>
            </Button>
            <Button variant="ghost" size="lg" className="text-foreground" asChild>
              <Link href="#how">Как это работает</Link>
            </Button>
          </div>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-left text-sm text-muted-foreground">
            {badges.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
