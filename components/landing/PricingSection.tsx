"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionReveal, StaggerChildren } from "@/components/landing/SectionReveal";
import { LandingPricingPlan } from "@/lib/content/landing";
import { Check, Zap } from "lucide-react";

interface PricingSectionProps {
  productName: string;
  plans: LandingPricingPlan[];
}

const PERIOD_LABELS: Record<1 | 3 | 12, string> = {
  1: "1 месяц",
  3: "3 месяца",
  12: "12 месяцев",
};

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const itemVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export function PricingSection({ productName, plans }: PricingSectionProps) {
  return (
    <section className="py-20 md:py-28" id="pricing">
      <div className="mx-auto max-w-7xl px-4">
        <SectionReveal>
          <h2 className="text-center font-heading text-2xl font-bold md:text-4xl">
            Тарифы {productName}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted-foreground">
            Выберите удобный период — оплата один раз, автосписаний нет
          </p>
        </SectionReveal>

        <StaggerChildren className="mt-10 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.article
              key={plan.months}
              variants={itemVariant}
              whileHover={plan.popular ? { scale: 1.02 } : { scale: 1.01 }}
              className={`relative flex flex-col rounded-xl border p-6 transition-shadow ${
                plan.popular
                  ? "border-[#6366F1] bg-[#1A1A28] shadow-[0_0_40px_rgba(99,102,241,0.2)]"
                  : "border-[#2A2A40] bg-[#12121A]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#6366F1] px-3 py-1 text-xs font-semibold text-white">
                    <Zap size={11} />
                    Популярный
                  </span>
                </div>
              )}

              <div className="mb-5">
                <p className="text-sm font-medium text-muted-foreground">{PERIOD_LABELS[plan.months]}</p>
                <p className="mt-2 font-heading text-4xl font-bold tracking-tight">
                  {plan.priceRub.toLocaleString("ru-RU")}
                  <span className="text-2xl"> ₽</span>
                </p>
                {plan.savingsRub ? (
                  <p className="mt-1.5 text-sm font-medium text-[#22C55E]">
                    Экономия {plan.savingsRub.toLocaleString("ru-RU")} ₽
                  </p>
                ) : (
                  <p className="mt-1.5 text-sm text-transparent select-none">—</p>
                )}
              </div>

              <ul className="mb-6 flex-1 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-[#C7C9D1]">
                    <Check size={15} className="mt-0.5 shrink-0 text-[#6366F1]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full rounded-xl py-3 font-semibold transition-all ${
                  plan.popular
                    ? "bg-[#6366F1] text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 hover:shadow-indigo-500/40"
                    : "bg-[#1A1A28] text-[#F0F0FF] hover:bg-[#222232] border border-[#2A2A40]"
                }`}
              >
                <Link href="/order">Оформить</Link>
              </Button>
            </motion.article>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
