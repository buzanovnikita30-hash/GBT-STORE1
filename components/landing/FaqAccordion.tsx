"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/landing/SectionReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { landingFaq } from "@/lib/mockData";

export function FaqAccordion() {
  return (
    <section id="faq" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
            Частые вопросы
          </h2>
          <p className="mx-auto mt-3 text-center text-muted-foreground">
            Кратко о главном — полный список на странице{" "}
            <Link href="/faq" className="text-primary hover:underline">
              FAQ
            </Link>
            .
          </p>
        </SectionReveal>
        <SectionReveal className="mt-10" delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {landingFaq.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-heading text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionReveal>
      </div>
    </section>
  );
}
