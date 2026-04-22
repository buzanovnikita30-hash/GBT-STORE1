import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/server";
import { notifyNewUser } from "@/lib/telegram/notifications";

// Telegram Login Widget данные
interface TelegramAuthData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

function verifyTelegramAuth(data: TelegramAuthData): boolean {
  const { hash, ...rest } = data;
  const botToken = process.env.TELEGRAM_BOT_TOKEN ?? "";
  const secretKey = crypto.createHash("sha256").update(botToken).digest();

  const checkString = Object.entries(rest)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");

  const expectedHash = crypto
    .createHmac("sha256", secretKey)
    .update(checkString)
    .digest("hex");

  // Проверяем что данные не старше 1 часа
  const age = Date.now() / 1000 - data.auth_date;
  if (age > 3600) return false;

  return expectedHash === hash;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const returnUrl = searchParams.get("returnUrl") ?? "/dashboard";

  const authData: Partial<TelegramAuthData> = {
    id: Number(searchParams.get("id")),
    first_name: searchParams.get("first_name") ?? "",
    last_name: searchParams.get("last_name") ?? undefined,
    username: searchParams.get("username") ?? undefined,
    photo_url: searchParams.get("photo_url") ?? undefined,
    auth_date: Number(searchParams.get("auth_date")),
    hash: searchParams.get("hash") ?? "",
  };

  if (!authData.id || !authData.hash) {
    return NextResponse.redirect(new URL("/login?error=telegram_invalid", request.url));
  }

  if (!verifyTelegramAuth(authData as TelegramAuthData)) {
    return NextResponse.redirect(new URL("/login?error=telegram_auth_failed", request.url));
  }

  const supabase = createAdminClient();

  // Ищем существующего пользователя по telegram_id
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("telegram_id", authData.id)
    .single();

  let userId: string;

  if (existingProfile) {
    userId = existingProfile.id;
    // Обновляем last_seen и telegram_username
    await supabase.from("profiles").update({
      telegram_username: authData.username ?? null,
      last_seen: new Date().toISOString(),
    }).eq("id", userId);
  } else {
    // Создаём нового пользователя через Supabase Admin
    const fakeEmail = `tg_${authData.id}@telegram.subrf.internal`;
    const randomPass = crypto.randomBytes(32).toString("hex");

    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: fakeEmail,
      password: randomPass,
      email_confirm: true,
      user_metadata: {
        full_name: [authData.first_name, authData.last_name].filter(Boolean).join(" "),
        telegram_id: authData.id,
        telegram_username: authData.username,
      },
    });

    if (createError || !newUser.user) {
      return NextResponse.redirect(new URL("/login?error=telegram_create_failed", request.url));
    }

    userId = newUser.user.id;

    // Обновляем профиль с Telegram данными
    await supabase.from("profiles").update({
      telegram_id: authData.id,
      telegram_username: authData.username ?? null,
      username: [authData.first_name, authData.last_name].filter(Boolean).join(" "),
    }).eq("id", userId);

    // Уведомляем владельца о новом пользователе
    await notifyNewUser({ id: userId, telegram_username: authData.username ?? null, username: authData.first_name }).catch(() => {});
  }

  // Создаём Magic Link для авторизации в браузере
  const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email: `tg_${authData.id}@telegram.subrf.internal`,
  });

  if (linkError || !linkData.properties?.action_link) {
    return NextResponse.redirect(new URL("/login?error=telegram_link_failed", request.url));
  }

  // Перенаправляем на magic link, который затем редиректит на returnUrl
  const magicUrl = new URL(linkData.properties.action_link);
  magicUrl.searchParams.set("next", returnUrl);

  return NextResponse.redirect(magicUrl);
}
