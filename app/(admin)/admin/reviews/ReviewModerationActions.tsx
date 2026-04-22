"use client";

import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function ReviewModerationActions({ reviewId }: { reviewId: string }) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);
  const router = useRouter();

  async function moderate(action: "approve" | "reject") {
    setLoading(action);
    const supabase = createClient();
    await supabase
      .from("reviews")
      .update({ status: action === "approve" ? "approved" : "rejected" })
      .eq("id", reviewId);
    router.refresh();
    setLoading(null);
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => moderate("approve")}
        disabled={!!loading}
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-900/30 text-green-400 hover:bg-green-900/50 disabled:opacity-50"
        title="Одобрить"
      >
        {loading === "approve" ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
      </button>
      <button
        type="button"
        onClick={() => moderate("reject")}
        disabled={!!loading}
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 disabled:opacity-50"
        title="Отклонить"
      >
        {loading === "reject" ? <Loader2 size={13} className="animate-spin" /> : <X size={13} />}
      </button>
    </div>
  );
}
