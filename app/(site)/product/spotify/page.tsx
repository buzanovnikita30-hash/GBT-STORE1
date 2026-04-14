import Link from "next/link";
import { SectionReveal } from "@/components/landing/SectionReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Headphones, Radio, Smartphone, Volume2 } from "lucide-react";
import { products, spotifyProductFaq } from "@/lib/mockData";

const spotify = products.find((p) => p.id === "spotify")!;

const features = [
  { icon: Volume2, text: "Музыка и подкасты без рекламы" },
  { icon: Headphones, text: "Офлайн-прослушивание на устройствах" },
  { icon: Radio, text: "Качество звука по тарифу Premium" },
  { icon: Smartphone, text: "Ваш аккаунт Spotify — логин не меняем" },
];

const flowSteps = [
  "Оформите заказ на Spotify Premium и оплатите картой РФ.",
  "Передайте email или логин Spotify по инструкции — пароль не нужен, если иначе не оговорено.",
  "Мы активируем Premium на вашем аккаунте по согласованной схеме.",
  "Проверьте статус подписки в приложении — обычно до 15 минут.",
];

export default function SpotifyProductPage() {
  return (
    <div className="pb-20">
      <section className="border-b border-white/5 bg-[#080d18]/40 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Продукт
            </p>
            <h1 className="mt-4 font-heading text-3xl font-bold sm:text-5xl">
              Spotify Premium
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Premium на вашем аккаунте — без иностранной карты. Вторая наша услуга
              наряду с ChatGPT Plus.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="shadow-lg shadow-primary/25" asChild>
                <Link href="/order">Оформить Spotify</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/product/chatgpt-plus">ChatGPT Plus</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionReveal>
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Что вы получаете
          </h2>
        </SectionReveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <SectionReveal key={f.text} delay={i * 0.06}>
              <Card className="border-white/10 bg-card/60">
                <CardContent className="flex gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-relaxed">{f.text}</p>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#080d18]/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Активация Spotify Premium
            </h2>
            <p className="mt-2 text-muted-foreground">
              Пошагово для этого продукта.
            </p>
          </SectionReveal>
          <ol className="mt-10 space-y-4">
            {flowSteps.map((step, i) => (
              <SectionReveal key={step} delay={i * 0.08}>
                <li className="glass-card flex gap-4 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 font-heading text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed">{step}</span>
                </li>
              </SectionReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionReveal>
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">Тарифы</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Те же периоды оплаты, что и на главной — цены в рублях.
          </p>
        </SectionReveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {spotify.pricing.map((t, i) => (
            <SectionReveal key={t.months} delay={i * 0.08}>
              <Card
                className={`border-white/10 ${t.months === 3 ? "border-primary/50 shadow-[0_0_32px_rgba(79,142,247,0.2)]" : ""}`}
              >
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">{t.months} мес.</p>
                  <p className="mt-2 font-heading text-2xl font-bold">
                    {t.price.toLocaleString("ru-RU")} ₽
                  </p>
                  {t.savings != null && (
                    <p className="mt-1 text-sm text-success">
                      экономия {t.savings.toLocaleString("ru-RU")} ₽
                    </p>
                  )}
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      Premium на вашем аккаунте
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      Поддержка и гарантия 30 дней
                    </li>
                  </ul>
                  <Button className="mt-6 w-full" asChild>
                    <Link href="/order">Оформить</Link>
                  </Button>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionReveal>
          <h2 className="font-heading text-2xl font-bold">Вопросы по Spotify</h2>
        </SectionReveal>
        <SectionReveal className="mt-8" delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {spotifyProductFaq.map((item, i) => (
              <AccordionItem key={item.q} value={`spf-${i}`}>
                <AccordionTrigger className="text-left font-heading text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionReveal>
        <SectionReveal className="mt-12 text-center" delay={0.15}>
          <Button size="lg" asChild>
            <Link href="/order">Перейти к заказу</Link>
          </Button>
        </SectionReveal>
      </section>
    </div>
  );
}
