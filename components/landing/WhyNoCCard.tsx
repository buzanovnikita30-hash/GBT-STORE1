import { SectionReveal } from "@/components/landing/SectionReveal";
import { CreditCard } from "lucide-react";

interface WhyNoCCardProps {
  text: string;
}

export function WhyNoCCard({ text }: WhyNoCCardProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <SectionReveal>
          <div className="rounded-xl border border-[#2A2A40] bg-[#12121A] p-8 md:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#6366F1]/10 text-[#6366F1]">
                <CreditCard size={24} />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold md:text-2xl">
                  Почему без иностранной карты
                </h2>
                <p className="mt-4 leading-relaxed text-[#C7C9D1]">{text}</p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
