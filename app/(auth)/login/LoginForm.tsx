"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { normalizeEmailForAuth } from "@/lib/auth/normalizeEmail";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawReturnUrl = searchParams.get("returnUrl") ?? "/dashboard";
  const returnUrl =
    rawReturnUrl.startsWith("/") && !rawReturnUrl.startsWith("//")
      ? rawReturnUrl
      : "/dashboard";
  const [showPass, setShowPass] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const authError = searchParams.get("error");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginInput) {
    setServerError(null);
    const supabase = createClient();
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: normalizeEmailForAuth(data.email),
      password: data.password,
    });
    if (error) {
      setServerError("Не удалось войти. Проверьте email/пароль или восстановите пароль.");
      return;
    }
    const accessToken = authData.session?.access_token;
    await fetch("/api/auth/sync-role", {
      method: "POST",
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    });
    router.push(returnUrl);
    router.refresh();
  }

  function onInvalid() {
    setServerError("Заполните email и пароль, затем попробуйте снова.");
  }

  useEffect(() => {
    if (!authError) return;
    if (authError === "telegram_invalid") {
      setServerError("Telegram не передал обязательные параметры авторизации.");
      return;
    }
    if (authError === "telegram_auth_failed") {
      setServerError("Не удалось проверить Telegram-подпись. Проверьте токен бота.");
      return;
    }
    if (authError === "telegram_create_failed") {
      setServerError("Не удалось создать пользователя через Telegram. Проверьте ключи Supabase.");
      return;
    }
    if (authError === "telegram_link_failed") {
      setServerError("Не удалось создать magic link для Telegram-входа.");
      return;
    }
  }, [authError]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
        <input
          type="email"
          autoComplete="email"
          {...register("email")}
          className={cn(
            "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-shadow",
            "focus:ring-2 focus:ring-[#10a37f]/30 focus:border-[#10a37f]",
            errors.email ? "border-red-400" : "border-black/[0.12]"
          )}
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-medium text-gray-700">Пароль</label>
          <a href="/reset-password" className="text-xs text-[#10a37f] hover:underline">Забыли пароль?</a>
        </div>
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            autoComplete="current-password"
            {...register("password")}
            className={cn(
              "w-full rounded-xl border px-3.5 py-2.5 pr-10 text-sm outline-none transition-shadow",
              "focus:ring-2 focus:ring-[#10a37f]/30 focus:border-[#10a37f]",
              errors.password ? "border-red-400" : "border-black/[0.12]"
            )}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>

      {serverError && (
        <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10a37f] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting && <Loader2 size={15} className="animate-spin" />}
        Войти
      </button>

      <div className="relative my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-black/[0.08]" />
        <span className="text-xs text-gray-400">или</span>
        <div className="h-px flex-1 bg-black/[0.08]" />
      </div>

      {/* Telegram Login Widget — скрипт вставляется динамически */}
      <div id="telegram-login-widget" className="flex justify-center" />
      <TelegramLoginButton />
      <DevQuickLoginButtons />
    </form>
  );
}

function TelegramLoginButton() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") ?? "/dashboard";

  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
  const botId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  if (!botUsername || !botId || !appUrl) return null;

  let origin = "";
  try {
    origin = new URL(appUrl).origin;
  } catch {
    return null;
  }

  const callbackPath = `/api/auth/telegram?returnUrl=${encodeURIComponent(returnUrl)}`;
  const oauthUrl =
    `https://oauth.telegram.org/auth?bot_id=${encodeURIComponent(botId)}` +
    `&origin=${encodeURIComponent(origin)}` +
    `&return_to=${encodeURIComponent(callbackPath)}` +
    `&request_access=write`;

  return (
    <a
      href={oauthUrl}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-black/[0.1] py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0088cc">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.29c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.931z"/>
      </svg>
      Войти через Telegram
    </a>
  );
}

function DevQuickLoginButtons() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") ?? "/dashboard";

  if (process.env.NEXT_PUBLIC_ENABLE_DEV_LOGIN !== "1") return null;

  return (
    <div className="space-y-2">
      <a
        href={`/api/auth/dev-login?who=client&returnUrl=${encodeURIComponent(returnUrl)}`}
        className="flex w-full items-center justify-center rounded-xl border border-black/[0.1] py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
      >
        Войти как клиент (тест)
      </a>
      <a
        href={`/api/auth/dev-login?who=operator&returnUrl=${encodeURIComponent(returnUrl)}`}
        className="flex w-full items-center justify-center rounded-xl border border-black/[0.1] py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
      >
        Войти как оператор (тест)
      </a>
    </div>
  );
}
