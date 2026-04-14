import Link from "next/link";
import { SectionReveal } from "@/components/landing/SectionReveal";
import { faqGroups } from "@/lib/mockData";

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionReveal>
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">
          Полный FAQ
        </h1>
        <p className="mt-4 text-muted-foreground">
          Ответы сгруппированы по темам. Все пункты развёрнуты для удобного чтения.
        </p>
      </SectionReveal>

      <div className="mt-14 space-y-16">
        {faqGroups.map((group, gi) => (
          <section key={group.title}>
            <SectionReveal delay={gi * 0.05}>
              <h2 className="font-heading border-b border-white/10 pb-2 text-xl font-semibold text-primary">
                {group.title}
              </h2>
            </SectionReveal>
            <div className="mt-6 space-y-6">
              {group.items.map((item, ii) => (
                <SectionReveal key={`${item.q}-${ii}`} delay={0.04 * ii}>
                  <div className="glass-card p-5">
                    <h3 className="font-heading font-semibold">{item.q}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-16 text-center text-sm text-muted-foreground">
        Не нашли ответ?{" "}
        <Link href="/order" className="text-primary hover:underline">
          Оформите заказ
        </Link>{" "}
        — менеджер подскажет.
      </p>
    </div>
  );
}
