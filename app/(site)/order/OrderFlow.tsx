"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ProductId } from "@/lib/mockData";
import { products } from "@/lib/mockData";

type Step = 1 | 2 | 3 | 4 | 5;

export function OrderFlow() {
  const [step, setStep] = useState<Step>(1);
  const [productId, setProductId] = useState<ProductId>("chatgpt");
  const [months, setMonths] = useState<1 | 3 | 12>(3);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderNo, setOrderNo] = useState("");

  const product = useMemo(
    () => products.find((p) => p.id === productId)!,
    [productId]
  );
  const tier = useMemo(
    () => product.pricing.find((t) => t.months === months)!,
    [product, months]
  );

  function mockPay() {
    setOrderNo(`ORD-${Math.floor(1000 + Math.random() * 9000)}`);
    setStep(5);
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold">Оформление заказа</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Демо: оплата не выполняется.
      </p>
      <div className="mt-8 flex gap-2 text-xs text-muted-foreground">
        {[1, 2, 3, 4].map((s) => (
          <span
            key={s}
            className={cn(
              "rounded-full px-2 py-0.5",
              step >= s ? "bg-primary/20 text-primary" : "bg-muted"
            )}
          >
            Шаг {s}
          </span>
        ))}
      </div>

      {step === 1 && (
        <div className="mt-8 space-y-4">
          <p className="text-sm font-medium">Выберите подписку</p>
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setProductId(p.id)}
              className={cn(
                "w-full rounded-xl border p-4 text-left transition-all hover:border-primary/50",
                productId === p.id
                  ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(79,142,247,0.15)]"
                  : "border-border bg-card/50"
              )}
            >
              <span className="font-heading font-semibold">{p.name}</span>
            </button>
          ))}
          <Button className="w-full" onClick={() => setStep(2)}>
            Далее
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 space-y-4">
          <p className="text-sm font-medium">Срок</p>
          {product.pricing.map((t) => (
            <button
              key={t.months}
              type="button"
              onClick={() => setMonths(t.months)}
              className={cn(
                "flex w-full items-center justify-between rounded-xl border p-4 text-left",
                months === t.months
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card/50"
              )}
            >
              <span>
                {t.months} мес.
                {t.savings != null && (
                  <span className="ml-2 text-success">экономия {t.savings} ₽</span>
                )}
              </span>
              <span className="font-heading font-bold">
                {t.price.toLocaleString("ru-RU")} ₽
              </span>
            </button>
          ))}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
              Назад
            </Button>
            <Button className="flex-1" onClick={() => setStep(3)}>
              Далее
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Телефон</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              placeholder="+7 …"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
              Назад
            </Button>
            <Button
              className="flex-1"
              disabled={!email.trim()}
              onClick={() => setStep(4)}
            >
              Далее
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="mt-8 space-y-4">
          <Card className="border-white/10 bg-card/80">
            <CardContent className="space-y-2 pt-6 text-sm">
              <p>
                <span className="text-muted-foreground">Продукт:</span>{" "}
                {product.name}
              </p>
              <p>
                <span className="text-muted-foreground">Период:</span> {months} мес.
              </p>
              <p>
                <span className="text-muted-foreground">К оплате:</span>{" "}
                <span className="font-heading text-lg font-bold text-primary">
                  {tier.price.toLocaleString("ru-RU")} ₽
                </span>
              </p>
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>
              Назад
            </Button>
            <Button className="flex-1" onClick={mockPay}>
              Оплатить (демо)
            </Button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="mt-8 space-y-6 text-center">
          <p className="font-heading text-xl font-bold text-success">
            Заказ принят
          </p>
          <p className="text-muted-foreground">
            Номер заказа:{" "}
            <span className="font-mono font-semibold text-foreground">{orderNo}</span>
          </p>
          <div className="rounded-xl border border-white/10 bg-card/60 p-6 text-left text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Что дальше</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Менеджер свяжется в течение 15 минут.</li>
              <li>Вы передадите данные по инструкции (без пароля).</li>
              <li>Мы активируем подписку — статус в личном кабинете.</li>
            </ol>
          </div>
          <Button asChild className="w-full">
            <Link href="/cabinet">Личный кабинет</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
