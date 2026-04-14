import Link from "next/link";
import { SectionReveal } from "@/components/landing/SectionReveal";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Mail,
  XCircle,
  RefreshCw,
  Clock,
  Headphones,
} from "lucide-react";

const guaranteeFlow = [
  { title: "Оплата и заявка", desc: "Фиксируем заказ и связываемся в чате." },
  { title: "Данные без пароля", desc: "Запрашиваем только то, что нужно для активации." },
  { title: "Активация", desc: "Подключаем подписку на ваш аккаунт." },
  { title: "Гарантия 30 дней", desc: "Если сбой — восстанавливаем или возврат по регламенту." },
];

export default function GuaranteePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionReveal>
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">
          Гарантии и безопасность
        </h1>
        <p className="mt-4 text-muted-foreground">
          Для ChatGPT Plus и Spotify Premium: как мы работаем, какие данные нужны и
          что происходит, если подписка перестала работать.
        </p>
      </SectionReveal>

      <SectionReveal className="mt-14" delay={0.05}>
        <h2 className="font-heading text-xl font-semibold">Как устроен процесс</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Вы оплачиваете в рублях и получаете инструкцию. Мы активируем сервис на
          вашем существующем аккаунте там, где это технически возможно, либо
          подключаем по согласованной схеме партнёра. Статус заказа отображается в
          личном кабинете.
        </p>
      </SectionReveal>

      <div className="mt-12 space-y-4">
        {guaranteeFlow.map((step, i) => (
          <SectionReveal key={step.title} delay={i * 0.07}>
            <div className="glass-card flex gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 font-heading text-sm font-bold text-primary">
                {i + 1}
              </div>
              <div>
                <h3 className="font-heading font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>

      <SectionReveal className="mt-16" delay={0.1}>
        <h2 className="font-heading text-xl font-semibold">Какие данные нужны</h2>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span>
              Чаще всего достаточно <strong className="text-foreground">email</strong>,
              привязанного к аккаунту сервиса, и подтверждения в почте.
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
            <span>Пароль от аккаунта <strong className="text-foreground">не запрашиваем</strong>.</span>
          </li>
        </ul>
      </SectionReveal>

      <SectionReveal className="mt-14" delay={0.12}>
        <h2 className="font-heading text-xl font-semibold">Что не нужно</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <XCircle className="h-4 w-4 shrink-0 text-danger" />
            Иностранная банковская карта
          </li>
          <li className="flex gap-2">
            <XCircle className="h-4 w-4 shrink-0 text-danger" />
            Новый аккаунт (если не согласовано отдельно)
          </li>
          <li className="flex gap-2">
            <XCircle className="h-4 w-4 shrink-0 text-danger" />
            Доступ к банку или SMS от банка
          </li>
        </ul>
      </SectionReveal>

      <SectionReveal className="mt-14" delay={0.14}>
        <h2 className="font-heading text-xl font-semibold">
          Если подписка перестала работать
        </h2>
        <p className="mt-3 flex gap-3 text-sm text-muted-foreground">
          <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
          В течение 30 дней с момента активации мы бесплатно восстанавливаем доступ
          или оформляем возврат согласно условиям гарантии. Напишите в чат заказа —
          ответим с приоритетом.
        </p>
      </SectionReveal>

      <SectionReveal className="mt-14" delay={0.16}>
        <h2 className="font-heading text-xl font-semibold">SLA поддержки</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="glass-card flex gap-3 p-4">
            <Clock className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium">Ответ до 2 часов</p>
              <p className="text-xs text-muted-foreground">В рабочее время</p>
            </div>
          </div>
          <div className="glass-card flex gap-3 p-4">
            <Headphones className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium">Устранение до 24 часов</p>
              <p className="text-xs text-muted-foreground">После подтверждения проблемы</p>
            </div>
          </div>
        </div>
      </SectionReveal>

      <div className="mt-16 text-center">
        <Button asChild size="lg">
          <Link href="/order">Оформить заказ</Link>
        </Button>
      </div>
    </div>
  );
}
