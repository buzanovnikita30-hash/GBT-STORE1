import type { Metadata } from "next";
import { FaqSection } from "@/components/landing/FaqSection";
import { GuaranteeSection } from "@/components/landing/GuaranteeSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { WhyCheaperSection } from "@/components/landing/WhyCheaperSection";
import { WhyNoCCard } from "@/components/landing/WhyNoCCard";
import { chatgptContent } from "@/lib/content/chatgpt";

export const metadata: Metadata = {
  title: "ChatGPT Plus — активация на ваш аккаунт без иностранной карты | SubРФ",
  description:
    "Подключаем ChatGPT Plus или Pro прямо на ваш аккаунт OpenAI. GPT-4o, DALL·E 3, Code Interpreter. Оплата в рублях, активация ~15 минут, гарантия 30 дней.",
};

export default function ChatgptLandingPage() {
  return (
    <>
      <HeroSection
        title={chatgptContent.hero.title}
        subtitle={chatgptContent.hero.subtitle}
        badges={chatgptContent.hero.badges}
        ctaLabel={chatgptContent.hero.ctaLabel}
        // Зелёный акцент OpenAI для бейджей
        badgeAccentClassName="border-[#1c3b2b] bg-[#0e1f16] text-[#6EE7A8] font-medium"
      />
      <HowItWorksSection steps={chatgptContent.howItWorks} />
      <TrustSection items={chatgptContent.trust} />
      <WhyNoCCard text={chatgptContent.whyNoCard} />
      <WhyCheaperSection text={chatgptContent.whyCheaper} />
      <PricingSection productName={chatgptContent.productName} plans={chatgptContent.pricing} />
      <ReviewsSection reviews={chatgptContent.reviews} stats={chatgptContent.stats} />
      <GuaranteeSection />
      <FaqSection items={chatgptContent.faq} />
    </>
  );
}
