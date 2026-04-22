import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin � ������������" };

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="p-6">
      <h1 className="font-heading text-2xl font-bold text-gray-100 mb-6">������������</h1>
      <div className="overflow-x-auto rounded-xl border border-white/[0.07]">
        <table className="w-full">
          <thead className="border-b border-white/[0.07] bg-white/[0.02]">
            <tr className="text-left text-xs font-semibold uppercase tracking-widest text-gray-500">
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Telegram</th>
              <th className="px-4 py-3">����</th>
              <th className="px-4 py-3">����</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {(users ?? []).map((u) => (
              <tr key={u.id} className="text-sm text-gray-300">
                <td className="px-4 py-3">{u.email ?? <span className="text-gray-600">�</span>}</td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {u.telegram_username ? "@" + u.telegram_username : "�"}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    u.role === "admin" ? "bg-red-900/30 text-red-400"
                    : u.role === "operator" ? "bg-blue-900/30 text-blue-400"
                    : "bg-gray-800 text-gray-400"
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {new Date(u.created_at).toLocaleDateString("ru")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
