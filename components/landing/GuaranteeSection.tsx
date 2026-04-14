import Link from "next/link";
import { SectionReveal } from "@/components/landing/SectionReveal";
import { ShieldCheck } from "lucide-react";

export function GuaranteeSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <SectionReveal>
          <div
            className="relative overflow-hidden rounded-xl border border-[#6366F1]/30 bg-[#1A1A28] p-8 text-center md:p-12"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(99,102,241,0.12) 0%, transparent 70%), #1A1A28",
            }}
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6366F1]/15 text-[#6366F1]">
              <ShieldCheck size={32} />
            </div>

            <h2 className="font-heading text-2xl font-bold md:text-3xl">Гарантия 30 дней</h2>

            <p className="mx-auto mt-4 max-w-2xl text-[#C7C9D1]">
              Если подписка слетела по нашей вине — восстановим бесплатно или вернём деньги.
              Без лишних вопросов. Просто напишите нам в Telegram.
            </p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="https://t.me/subrfmanager"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#6366F1] px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-500"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.29c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.931z" />
                </svg>
                Написать в Telegram
              </Link>
              <Link
                href="/guarantee"
                className="text-sm text-[#6366F1] underline-offset-4 hover:underline"
              >
                Подробнее о гарантии →
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
