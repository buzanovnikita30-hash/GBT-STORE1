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
import { spotifyContent } from "@/lib/content/spotify";

export const metadata: Metadata = {
  title: "Spotify Premium — активация на ваш аккаунт без иностранной карты | SubРФ",
  description:
    "Подключаем Spotify Premium к вашему профилю. Без рекламы, офлайн-режим, плейлисты сохранятся. Оплата в рублях, активация ~15 минут, гарантия 30 дней.",
};

export default function SpotifyLandingPage() {
  return (
    <>
      <HeroSection
        title={spotifyContent.hero.title}
        subtitle={spotifyContent.hero.subtitle}
        badges={spotifyContent.hero.badges}
        ctaLabel={spotifyContent.hero.ctaLabel}
        // Зелёный акцент Spotify для бейджей
        badgeAccentClassName="border-[#1a4028] bg-[#0d1f12] text-[#1DB954] font-medium"
      />
      <HowItWorksSection steps={spotifyContent.howItWorks} />
      <TrustSection items={spotifyContent.trust} />
      <WhyNoCCard text={spotifyContent.whyNoCard} />
      <WhyCheaperSection text={spotifyContent.whyCheaper} />
      <PricingSection productName={spotifyContent.productName} plans={spotifyContent.pricing} />
      <ReviewsSection reviews={spotifyContent.reviews} stats={spotifyContent.stats} />
      <GuaranteeSection />
      <FaqSection items={spotifyContent.faq} />
    </>
  );
}
