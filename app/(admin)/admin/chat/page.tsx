import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { AdminChatConsole } from "./AdminChatConsole";

export const metadata: Metadata = { title: "Admin Chat" };

type SessionRow = {
  id: string;
  user_id: string | null;
  type: string;
  status: "open" | "closed";
  first_message_at: string | null;
  created_at: string;
  profiles: { email: string | null; telegram_username: string | null } | null;
};

type OrderRow = {
  id: string;
  user_id: string | null;
  status: string;
  created_at: string;
};

export default async function AdminChatPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: sessionsRaw } = await supabase
    .from("chat_sessions")
    .select("id, user_id, type, status, first_message_at, created_at, profiles(email, telegram_username)")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(100);

  const sessions = (sessionsRaw ?? []) as SessionRow[];
  const userIds = Array.from(new Set(sessions.map((s) => s.user_id).filter(Boolean))) as string[];

  let ordersByUser = new Map<string, OrderRow>();
  if (userIds.length) {
    const { data: ordersRaw } = await supabase
      .from("orders")
      .select("id, user_id, status, created_at")
      .in("user_id", userIds)
      .order("created_at", { ascending: false });

    const orders = (ordersRaw ?? []) as OrderRow[];
    ordersByUser = orders.reduce((acc, order) => {
      if (order.user_id && !acc.has(order.user_id)) acc.set(order.user_id, order);
      return acc;
    }, new Map<string, OrderRow>());
  }

  const sessionItems = sessions.map((s) => {
    const latestOrder = s.user_id ? ordersByUser.get(s.user_id) : undefined;
    return {
      id: s.id,
      user_id: s.user_id,
      type: s.type,
      status: s.status,
      first_message_at: s.first_message_at,
      created_at: s.created_at,
      profileEmail: s.profiles?.email ?? null,
      telegramUsername: s.profiles?.telegram_username ?? null,
      latestOrderId: latestOrder?.id ?? null,
      latestOrderStatus: latestOrder?.status ?? null,
    };
  });

  return (
    <div className="p-6">
      <h1 className="mb-4 font-heading text-2xl font-bold text-gray-100">Чат с клиентами</h1>
      <AdminChatConsole operatorId={user?.id ?? ""} initialSessions={sessionItems} />
    </div>
  );
}
