"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  badges: string[];
  ctaLabel: string;
  badgeAccentClassName?: string;
}

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export function HeroSection({
  title,
  subtitle,
  badges,
  ctaLabel,
  badgeAccentClassName,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 py-20 md:py-28">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.h1
            variants={fadeUp}
            className="font-heading text-3xl font-bold leading-tight md:text-5xl lg:text-[3.25rem]"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#C7C9D1] md:text-lg"
          >
            {subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {badges.map((badge) => (
              <span
                key={badge}
                className={`rounded-xl border border-[#2A2A40] bg-[#12121A] px-4 py-2 text-sm font-medium text-[#F0F0FF] ${
                  badgeAccentClassName ?? ""
                }`}
              >
                {badge}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="w-full rounded-xl bg-[#6366F1] px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 sm:w-auto"
            >
              <Link href="/order">
                {ctaLabel}
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="w-full rounded-xl border-[#2A2A40] px-8 py-3 text-[#F0F0FF] transition-colors hover:border-[#6366F1] sm:w-auto"
            >
              <Link href="/guarantee">
                <Shield size={16} className="mr-2" />
                Гарантии
              </Link>
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-xs text-muted-foreground"
          >
            Среднее время активации — 15 минут &nbsp;·&nbsp; Гарантия 30 дней
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
