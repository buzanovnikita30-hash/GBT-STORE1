"use client";

import { SectionReveal } from "@/components/landing/SectionReveal";
import { AnimatedCounter } from "@/components/landing/AnimatedCounter";
import { testimonials } from "@/lib/mockData";

export function SocialProof() {
  return (
    <section className="border-t border-white/5 bg-[#080d18]/50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
            Нам доверяют
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Отзывы клиентов по ChatGPT Plus и Spotify (демо).
          </p>
        </SectionReveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <SectionReveal key={t.id} delay={i * 0.08}>
              <div className="glass-card overflow-hidden p-4">
                <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20" />
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{t.name}</span>
                    <span className="mx-1">·</span>
                    {t.time}
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[90%] rounded-2xl rounded-br-md bg-[#1e293b] px-3 py-2 text-sm text-foreground">
                    {t.text}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
        <SectionReveal className="mt-16">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { label: "клиентов", value: 500, suffix: "+" },
              { label: "лет на рынке", value: 3, suffix: "" },
              { label: "минут среднее время", value: 15, suffix: "" },
              { label: "успешных активаций", value: 98, suffix: "%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card px-4 py-6 text-center sm:px-6"
              >
                <p className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
