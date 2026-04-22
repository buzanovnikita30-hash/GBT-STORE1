import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = { title: "Admin � ���������" };

export default async function AdminSettingsPage() {
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("site_settings")
    .select("*");

  const settingsMap: Record<string, unknown> = {};
  (settings ?? []).forEach((s) => { settingsMap[s.key] = s.value; });

  return (
    <div className="p-6">
      <h1 className="font-heading text-2xl font-bold text-gray-100 mb-6">��������� �����</h1>
      <div className="max-w-lg">
        <SettingsForm initialSettings={settingsMap} />
      </div>
    </div>
  );
}
