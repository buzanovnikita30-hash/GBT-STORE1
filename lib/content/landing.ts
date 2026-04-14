export interface LandingStep {
  title: string;
  description: string;
}

export interface LandingTrustItem {
  title: string;
  description: string;
}

export interface LandingPricingPlan {
  months: 1 | 3 | 12;
  priceRub: number;
  savingsRub?: number;
  popular?: boolean;
  features: string[];
}

export interface LandingReview {
  name: string;
  initials: string;
  date: string;
  text: string;
}

export interface LandingFaqItem {
  question: string;
  answer: string;
}

export interface LandingStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface LandingContent {
  slug: "chatgpt" | "spotify";
  productName: string;
  hero: {
    title: string;
    subtitle: string;
    badges: string[];
    ctaLabel: string;
  };
  howItWorks: LandingStep[];
  trust: LandingTrustItem[];
  whyNoCard: string;
  whyCheaper: string;
  pricing: LandingPricingPlan[];
  reviews: LandingReview[];
  stats: LandingStat[];
  faq: LandingFaqItem[];
}
