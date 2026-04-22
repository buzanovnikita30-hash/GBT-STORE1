import type { Metadata } from "next";
import { Clock } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Ожидание оплаты" };

export default function CheckoutPendingPage() {
  return (
    <div className="w-full max-w-sm text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
        <Clock size={28} className="text-amber-500" />
      </div>
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-3">Ожидаем оплату</h1>
      <p className="text-sm text-gray-500 mb-6">
        Платёж ещё обрабатывается. Обычно это занимает несколько минут. Обновление придёт автоматически.
      </p>
      <Link href="/dashboard" className="block w-full rounded-xl bg-[#10a37f] py-3 text-sm font-semibold text-white text-center hover:opacity-90">
        Перейти в кабинет
      </Link>
    </div>
  );
}
