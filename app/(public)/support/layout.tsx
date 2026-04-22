import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Поддержка",
  description: "Чат поддержки GBT STORE: вопросы по ChatGPT Plus и Pro",
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
