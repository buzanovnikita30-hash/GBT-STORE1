import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { FinalCta } from "@/components/landing/FinalCta";
import { GuaranteeBlock } from "@/components/landing/GuaranteeBlock";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { SocialProof } from "@/components/landing/SocialProof";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { WhySafe } from "@/components/landing/WhySafe";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <WhySafe />
      <Pricing />
      <SocialProof />
      <FaqAccordion />
      <GuaranteeBlock />
      <FinalCta />
    </>
  );
}
