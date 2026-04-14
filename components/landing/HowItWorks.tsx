"use client";

import { SectionReveal } from "@/components/landing/SectionReveal";

const steps = [
  {
    n: "1",
    title: "Выберите ChatGPT Plus или Spotify и оплатите",
    desc: "Карта РФ, мгновенное подтверждение заказа.",
  },
  {
    n: "2",
    title: "Передайте нужные данные",
    desc: "Инструкция придёт сразу после оплаты — без пароля от аккаунта.",
  },
  {
    n: "3",
    title: "Мы активируем — вы пользуетесь",
    desc: "В среднем до 15 минут. Статус виден в личном кабинете.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
            Как это работает
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Три шага — и подписка на вашем аккаунте.
          </p>
        </SectionReveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <SectionReveal key={s.n} delay={i * 0.1}>
              <div className="glass-card group h-full p-6 transition-transform hover:-translate-y-1">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 font-heading text-lg font-bold text-primary">
                  {s.n}
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
