import type { Metadata } from "next";

export const metadata: Metadata = { title: "Чат поддержки" };

export default function DashboardChatPage() {
  return (
    <div className="flex min-h-[calc(100vh-7rem)] w-full flex-col">
      <h1 className="mb-4 font-heading text-xl font-bold text-gray-900">Чат с поддержкой</h1>
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
        <div className="flex h-full min-h-[320px] w-full flex-col items-center justify-center gap-3 p-6 text-center">
          <p className="text-sm text-gray-500">
            Полноценный чат откроется здесь после подключения виджета поддержки.
          </p>
          <a
            href="https://t.me/subs_support"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#0088cc] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Написать в Telegram
          </a>
        </div>
      </div>
    </div>
  );
}
