import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionReveal } from "@/components/landing/SectionReveal";
import { LandingFaqItem } from "@/lib/content/landing";
import Link from "next/link";

interface FaqSectionProps {
  items: LandingFaqItem[];
}

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <section className="bg-[#0E0E16] py-20 md:py-28" id="faq">
      <div className="mx-auto max-w-4xl px-4">
        <SectionReveal>
          <h2 className="text-center font-heading text-2xl font-bold md:text-4xl">
            Частые вопросы
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted-foreground">
            Не нашли ответ? Напишите нам в{" "}
            <Link
              href="https://t.me/subrfmanager"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Telegram
            </Link>
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-8 w-full">
            {items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className="border-[#2A2A40]"
              >
                <AccordionTrigger className="text-left font-heading text-base hover:text-primary [&[data-state=open]]:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[#C7C9D1]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionReveal>
      </div>
    </section>
  );
}
