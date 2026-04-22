import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { OrderStatusTracker } from "@/components/ui/OrderStatusTracker";
import { TokenSafetyBlock } from "@/components/ui/TokenSafetyBlock";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Заказ создан" };

interface Props {
  searchParams: Promise<{ order?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { order: orderId } = await searchParams;

  if (!orderId) {
    return (
      <div className="text-center">
        <p className="text-gray-500">Заказ не найден</p>
        <Link href="/" className="mt-4 text-[#10a37f] hover:underline">На главную</Link>
      </div>
    );
  }

  const supabase = await createClient();
  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (!order) {
    return (
      <div className="text-center">
        <p className="text-gray-500">Заказ не найден или был удалён</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg space-y-5">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#10a37f]/10">
          <CheckCircle2 size={28} className="text-[#10a37f]" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-gray-900">Заказ оформлен!</h1>
        <p className="mt-2 text-sm text-gray-500">
          Мы уже начали активировать вашу подписку. Следите за статусом ниже.
        </p>
      </div>

      <OrderStatusTracker
        orderId={orderId}
        initialStatus={order.status}
        planId={order.plan_id}
        activatedAt={order.activated_at}
      />

      {order.status === "waiting_client" && (
        <TokenSafetyBlock compact={false} />
      )}

      <div className="rounded-xl border border-black/[0.07] bg-gray-50 px-4 py-3 text-sm text-gray-600">
        <p>Email аккаунта: <strong>{order.account_email}</strong></p>
        <p className="mt-1">Ваш чат открыт в кабинете в{" "}
          <a href={`${process.env.NEXT_PUBLIC_APP_URL ?? ""}/dashboard/chat`} className="text-[#10a37f] hover:underline">
            чате поддержки
          </a>
        </p>
      </div>

      <Link href="/dashboard" className="block text-center text-sm text-gray-500 hover:text-gray-800">
        Перейти в личный кабинет →
      </Link>
    </div>
  );
}
