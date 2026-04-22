"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { REVIEWS } from "@/lib/chatgpt-data";
import { fadeUp, staggerContainer } from "@/lib/motion-config";
import type { Review } from "@/lib/chatgpt-data";

function ReviewCard({ review }: { review: Review }) {
  return (
    <motion.article
      variants={fadeUp}
      className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm"
    >
      <header className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: review.avatarColor }}
        >
          {review.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{review.name}</p>
          <p className="text-xs text-gray-400">
            {review.city} · {review.date}
          </p>
        </div>
      </header>
      <p className="mt-3 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
        {review.text}
      </p>
      <p className="mt-2 text-xs text-[#10a37f]">✓✓ прочитано</p>
    </motion.article>
  );
}

export function ReviewsSection() {
  const [expanded, setExpanded] = useState(false);
  const allReviews = expanded ? REVIEWS : REVIEWS.slice(0, 4);
  const leftCol = allReviews.filter((_, i) => i % 2 === 0);
  const rightCol = allReviews.filter((_, i) => i % 2 !== 0);

  return (
    <section id="reviews" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-14 flex flex-col items-center gap-3 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[#10a37f]/20 bg-[#10a37f]/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#10a37f]">
            Отзывы клиентов
          </span>
          <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            Что говорят пользователи
          </h2>
          <p className="max-w-2xl text-lg text-gray-500">
            Реальные кейсы из разных городов России.
          </p>
        </motion.div>

        {/* Desktop masonry */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="hidden items-start gap-6 md:flex"
        >
          <div className="flex flex-1 flex-col gap-6">
            {leftCol.map((review) => (
              <ReviewCard key={`${review.name}-${review.date}`} review={review} />
            ))}
          </div>
          <div className="mt-10 flex flex-1 flex-col gap-6">
            {rightCol.map((review) => (
              <ReviewCard key={`${review.name}-${review.date}`} review={review} />
            ))}
          </div>
        </motion.div>

        {/* Mobile list */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col gap-4 md:hidden"
        >
          {REVIEWS.slice(0, expanded ? REVIEWS.length : 3).map((review) => (
            <ReviewCard key={`${review.name}-${review.date}`} review={review} />
          ))}
        </motion.div>

        {!expanded && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              className="border-black/10 text-gray-600 hover:bg-gray-100"
              onClick={() => setExpanded(true)}
            >
              Показать все отзывы
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}


