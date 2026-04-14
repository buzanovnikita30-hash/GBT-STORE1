"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/landing/AnimatedCounter";
import { SectionReveal, StaggerChildren } from "@/components/landing/SectionReveal";
import { LandingReview, LandingStat } from "@/lib/content/landing";

interface ReviewsSectionProps {
  reviews: LandingReview[];
  stats: LandingStat[];
}

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#F59E0B"
          className="shrink-0"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const AVATAR_COLORS = [
  "bg-[#6366F1]",
  "bg-[#8B5CF6]",
  "bg-[#EC4899]",
  "bg-[#14B8A6]",
  "bg-[#F59E0B]",
];

export function ReviewsSection({ reviews, stats }: ReviewsSectionProps) {
  return (
    <section className="bg-[#0E0E16] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionReveal>
          <h2 className="text-center font-heading text-2xl font-bold md:text-4xl">
            Отзывы клиентов
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted-foreground">
            Реальные покупатели о нашем сервисе
          </p>
        </SectionReveal>

        <StaggerChildren className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={`${review.name}-${review.date}`}
              variants={itemVariant}
              className="flex flex-col gap-3 rounded-xl border border-[#2A2A40] bg-[#12121A] p-5"
            >
              <StarRating />
              <p className="flex-1 text-sm leading-relaxed text-[#C7C9D1]">{review.text}</p>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${
                    AVATAR_COLORS[index % AVATAR_COLORS.length]
                  }`}
                >
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold">{review.name}</p>
                  <p className="text-xs text-[#A9ACB6]">{review.date}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </StaggerChildren>

        {/* Stats grid */}
        <StaggerChildren className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariant}
              className="rounded-xl border border-[#2A2A40] bg-[#12121A] p-4 text-center"
            >
              <p className="font-heading text-2xl font-bold text-[#6366F1] md:text-3xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1.5 text-xs text-[#A9ACB6]">{stat.label}</p>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
