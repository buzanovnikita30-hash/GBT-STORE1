"use client";

import { Shield } from "lucide-react";
import { SectionReveal } from "@/components/landing/SectionReveal";

export function GuaranteeBlock() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="glass-card flex flex-col gap-6 rounded-3xl border-primary/20 bg-gradient-to-br from-[#0d1528] to-[#0a0f1e] p-8 sm:flex-row sm:items-center sm:gap-8 sm:p-10">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold sm:text-2xl">
                Гарантия 30 дней
              </h2>
              <p className="mt-3 text-muted-foreground">
                Если подписка перестала работать по нашей вине — восстановим
                бесплатно или вернём деньги в рамках регламента гарантии.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
