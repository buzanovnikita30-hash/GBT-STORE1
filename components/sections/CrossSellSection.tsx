"use client";

import { motion } from "framer-motion";
import { ArrowRight, Music } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion-config";

export function CrossSellSection() {
  return (
    <section className="px-4 py-12 md:px-6 md:py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="mx-auto max-w-4xl"
      >
        <motion.div
          variants={fadeUp}
          className="overflow-hidden rounded-2xl border border-black/[0.08] bg-gray-50"
        >
          <div className="flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1db954]/10">
                <Music size={22} className="text-[#1db954]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Также подключаем</p>
                <h3 className="font-heading text-lg font-bold text-gray-900">Spotify Premium</h3>
                <p className="text-sm text-gray-500">Оплата картой РФ, активация за 5 минут</p>
              </div>
            </div>
            <motion.a
              href="/spotify"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "#1db954" }}
            >
              Посмотреть тарифы
              <ArrowRight size={15} />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}


