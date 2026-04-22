"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const supabase = createClient();
    const type = searchParams.get("type");
    const code = searchParams.get("code");
    const rawReturnUrl = searchParams.get("returnUrl") ?? "/dashboard";
    const returnUrl =
      rawReturnUrl.startsWith("/") && !rawReturnUrl.startsWith("//")
        ? rawReturnUrl
        : "/dashboard";
    let cancelled = false;

    if (type === "recovery") {
      router.push("/reset-password/update");
      return;
    }

    const redirectToTarget = async () => {
      const { data } = await supabase.auth.getSession();
      if (!cancelled && data.session) {
        await fetch("/api/auth/sync-role", {
          method: "POST",
          headers: { Authorization: `Bearer ${data.session.access_token}` },
        });
        router.replace(returnUrl);
        router.refresh();
      }
    };

    const finishAuth = async () => {
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      }
      await redirectToTarget();
    };

    void finishAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        router.replace(returnUrl);
        router.refresh();
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Loader2 size={28} className="animate-spin text-[#10a37f]" />
      <p className="text-sm text-gray-500">Завершаем вход...</p>
    </div>
  );
}
