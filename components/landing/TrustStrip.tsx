"use client";

import { motion } from "framer-motion";
import { trustLogos } from "@/lib/mockData";

export function TrustStrip() {
  const doubled = [...trustLogos, ...trustLogos];
  return (
    <section className="border-b border-white/5 bg-[#080d18] py-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Две услуги — полное внимание качеству активации
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <motion.div
            className="flex w-max gap-12 pr-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {doubled.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap font-heading text-sm font-semibold text-white/40 sm:text-base"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
