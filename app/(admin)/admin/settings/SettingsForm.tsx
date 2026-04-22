"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  initialSettings: Record<string, unknown>;
}

const FIELDS = [
  { key: "auto_reply_delay_minutes", label: "Задержка авто-ответа (минут)", type: "number" },
  { key: "operator_telegram_url", label: "Ссылка на оператора в Telegram", type: "text" },
  { key: "night_start_hour", label: "Начало ночного режима (час)", type: "number" },
  { key: "night_end_hour", label: "Конец ночного режима (час)", type: "number" },
];

export function SettingsForm({ initialSettings }: Props) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(FIELDS.map((f) => [f.key, String(initialSettings[f.key] ?? "")]))
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function onSave() {
    setSaving(true);
    const supabase = createClient();
    for (const field of FIELDS) {
      await supabase.from("site_settings").upsert({
        key: field.key,
        value: field.type === "number" ? Number(values[field.key]) : values[field.key],
      });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-4">
      {FIELDS.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            {field.label}
          </label>
          <input
            type={field.type}
            value={values[field.key] ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
            className="w-full rounded-xl border border-white/[0.12] bg-white/[0.05] px-3.5 py-2.5 text-sm text-gray-200 outline-none focus:border-[#10a37f] focus:ring-2 focus:ring-[#10a37f]/20"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-2 rounded-xl bg-[#10a37f] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {saving && <Loader2 size={14} className="animate-spin" />}
        {saved && <Check size={14} />}
        {saved ? "Сохранено!" : "Сохранить"}
      </button>
    </div>
  );
}
