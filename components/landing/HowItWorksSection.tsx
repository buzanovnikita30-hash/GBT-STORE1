"use client";

import { LandingStep } from "@/lib/content/landing";
import { SectionReveal, StaggerChildren } from "@/components/landing/SectionReveal";
import { motion } from "framer-motion";

interface HowItWorksSectionProps {
  steps: LandingStep[];
}

const STEP_COLORS = [
  "bg-[#6366F1] text-white",
  "bg-[#8B5CF6] text-white",
  "bg-[#A855F7] text-white",
  "bg-[#EC4899] text-white",
];

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionReveal>
          <h2 className="text-center font-heading text-2xl font-bold md:text-4xl">
            Как это работает
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted-foreground">
            Просто и прозрачно — от оплаты до активации
          </p>
        </SectionReveal>

        <StaggerChildren className="mt-10 grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              variants={itemVariant}
              className="group relative rounded-xl border border-[#2A2A40] bg-[#12121A] p-6 transition-colors hover:border-[#3A3A55]"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-heading text-sm font-bold ${
                    STEP_COLORS[index % STEP_COLORS.length]
                  }`}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold md:text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#C7C9D1]">{step.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
