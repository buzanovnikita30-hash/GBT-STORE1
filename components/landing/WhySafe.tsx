"use client";

import {
  Lock,
  CreditCard,
  UserCheck,
  Shield,
  BadgeCheck,
  MapPin,
} from "lucide-react";
import { SectionReveal } from "@/components/landing/SectionReveal";

const items = [
  { icon: UserCheck, title: "Ваш аккаунт остаётся вашим" },
  { icon: CreditCard, title: "Не нужна иностранная карта" },
  { icon: Lock, title: "Не нужен новый аккаунт" },
  { icon: Shield, title: "Данные защищены" },
  { icon: BadgeCheck, title: "Гарантия 30 дней" },
  { icon: MapPin, title: "Работает в РФ" },
];

export function WhySafe() {
  return (
    <section className="border-y border-white/5 bg-[#080d18]/80 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
            Почему это безопасно
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Прозрачный процесс без смены аккаунта и без рискованных схем.
          </p>
        </SectionReveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.06}>
              <div className="glass-card flex gap-4 p-5 transition-transform hover:scale-[1.01]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold">{item.title}</h3>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
