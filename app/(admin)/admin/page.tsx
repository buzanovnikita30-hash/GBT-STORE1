import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin � �����" };

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [
    { count: totalOrders },
    { count: pendingOrders },
    { count: activeOrders },
    { count: openChats },
    { count: pendingReviews },
  ] = await Promise.all([
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("chat_sessions").select("id", { count: "exact", head: true }).eq("status", "open"),
    supabase.from("reviews").select("id", { count: "exact", head: true }).eq("status", "pending"),
  ]);

  const stats = [
    { label: "����� �������", value: totalOrders ?? 0, color: "text-gray-900" },
    { label: "������� ������", value: pendingOrders ?? 0, color: "text-amber-600" },
    { label: "�������� ��������", value: activeOrders ?? 0, color: "text-[#10a37f]" },
    { label: "�������� �����", value: openChats ?? 0, color: "text-blue-600" },
    { label: "������� �� ���������", value: pendingReviews ?? 0, color: "text-purple-600" },
  ];

  return (
    <div className="p-6">
      <h1 className="font-heading text-2xl font-bold text-gray-100 mb-6">�����</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.08] bg-gray-900 p-4">
            <p className={`font-heading text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-xs text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
