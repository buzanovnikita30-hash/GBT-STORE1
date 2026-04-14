"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/landing/SectionReveal";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <SectionReveal>
          <h2 className="font-heading text-2xl font-bold sm:text-4xl">
            Готовы начать? Активируем за 15 минут
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            ChatGPT Plus или Spotify Premium — выберите в заказе, оплатите картой РФ,
            дальше ведём по шагам.
          </p>
          <Button
            size="lg"
            className="mt-10 min-w-[240px] text-base shadow-xl shadow-primary/30"
            asChild
          >
            <Link href="/order">Оформить заказ</Link>
          </Button>
        </SectionReveal>
      </div>
    </section>
  );
}
