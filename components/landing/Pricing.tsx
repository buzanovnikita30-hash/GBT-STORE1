"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/landing/SectionReveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

type Tier = {
  name: string;
  period: string;
  price: string;
  savings: string | null;
  popular: boolean;
  included: string[];
};

const chatgptTiers: Tier[] = [
  {
    name: "Базовый",
    period: "1 мес",
    price: "1 490 ₽",
    savings: null,
    popular: false,
    included: ["GPT-4 и инструменты по тарифу", "Приоритетный доступ", "Поддержка в чате"],
  },
  {
    name: "Популярный",
    period: "3 мес",
    price: "3 990 ₽",
    savings: "экономия 480 ₽",
    popular: true,
    included: ["Всё из базового", "Выгоднее помесячно", "Напоминание о продлении"],
  },
  {
    name: "Выгодный",
    period: "12 мес",
    price: "13 990 ₽",
    savings: "экономия 3 890 ₽",
    popular: false,
    included: ["Максимальная скидка", "Приоритет в очереди", "Персональный менеджер"],
  },
];

const spotifyTiers: Tier[] = [
  {
    name: "Базовый",
    period: "1 мес",
    price: "690 ₽",
    savings: null,
    popular: false,
    included: ["Без рекламы, офлайн-режим", "Premium на вашем аккаунте", "Поддержка в чате"],
  },
  {
    name: "Популярный",
    period: "3 мес",
    price: "1 890 ₽",
    savings: "экономия 180 ₽",
    popular: true,
    included: ["Всё из базового", "Выгоднее помесячно", "Напоминание о продлении"],
  },
  {
    name: "Выгодный",
    period: "12 мес",
    price: "6 490 ₽",
    savings: "экономия 1 790 ₽",
    popular: false,
    included: ["Максимальная скидка за год", "Стабильный доступ", "Персональный менеджер"],
  },
];

function TierGrid({
  productLabel,
  tiers,
  delayOffset,
}: {
  productLabel: string;
  tiers: Tier[];
  delayOffset: number;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
      {tiers.map((tier, i) => (
        <SectionReveal key={`${productLabel}-${tier.name}`} delay={delayOffset + i * 0.06}>
          <motion.div
            whileHover={{ y: -4 }}
            className={`relative flex h-full flex-col rounded-2xl border p-6 sm:p-8 ${
              tier.popular
                ? "scale-[1.02] border-primary/60 bg-gradient-to-b from-primary/10 to-white/[0.03] shadow-[0_0_40px_rgba(79,142,247,0.25)] lg:z-10"
                : "glass-card border-white/10"
            }`}
          >
            {tier.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1 border-primary/40 bg-primary text-primary-foreground">
                <Star className="h-3 w-3 fill-current" />
                Популярный
              </Badge>
            )}
            <p className="text-sm text-muted-foreground">{productLabel}</p>
            <h3 className="mt-1 font-heading text-xl font-bold">{tier.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{tier.period}</p>
            <p className="mt-4 font-heading text-3xl font-bold tracking-tight">
              {tier.price}
            </p>
            {tier.savings && (
              <p className="mt-1 text-sm font-medium text-success">{tier.savings}</p>
            )}
            <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm text-muted-foreground">
              {tier.included.map((line) => (
                <li key={line} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {line}
                </li>
              ))}
            </ul>
            <Button
              className="mt-8 w-full"
              variant={tier.popular ? "default" : "outline"}
              asChild
            >
              <Link href="/order">Оформить</Link>
            </Button>
          </motion.div>
        </SectionReveal>
      ))}
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
            Тарифы и оплата
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Действующие цены в рублях — только ChatGPT Plus и Spotify Premium. Сроки 1,
            3 и 12 месяцев; чем дольше период, тем ниже цена за месяц.
          </p>
        </SectionReveal>

        <div className="mt-16 space-y-20">
          <div>
            <SectionReveal delay={0.05}>
              <h3 className="font-heading text-center text-xl font-bold sm:text-2xl">
                ChatGPT Plus
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
                Полный Plus на вашем аккаунте OpenAI.
              </p>
            </SectionReveal>
            <div className="mt-10">
              <TierGrid productLabel="ChatGPT Plus" tiers={chatgptTiers} delayOffset={0.1} />
            </div>
          </div>

          <div>
            <SectionReveal delay={0.05}>
              <h3 className="font-heading text-center text-xl font-bold sm:text-2xl">
                Spotify Premium
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
                Музыка и подкасты без рекламы на вашем Spotify.
              </p>
            </SectionReveal>
            <div className="mt-10">
              <TierGrid productLabel="Spotify Premium" tiers={spotifyTiers} delayOffset={0.15} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
