"use client";

import { LandingTrustItem } from "@/lib/content/landing";
import { SectionReveal, StaggerChildren } from "@/components/landing/SectionReveal";
import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, KeyRound, Mail } from "lucide-react";

interface TrustSectionProps {
  items: LandingTrustItem[];
}

const ICONS = [ShieldCheck, KeyRound, UserCheck, Mail];

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export function TrustSection({ items }: TrustSectionProps) {
  return (
    <section className="bg-[#0E0E16] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionReveal>
          <h2 className="text-center font-heading text-2xl font-bold md:text-4xl">
            Безопасность аккаунта
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted-foreground">
            Ваши данные под защитой — мы работаем прозрачно
          </p>
        </SectionReveal>

        <StaggerChildren className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.article
                key={item.title}
                variants={itemVariant}
                className="flex gap-4 rounded-xl border border-[#2A2A40] bg-[#1A1A28] p-6 transition-colors hover:border-[#3A3A55]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6366F1]/10 text-[#6366F1]">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#C7C9D1]">{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
