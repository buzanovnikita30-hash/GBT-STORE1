const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID ?? "";

async function sendTelegramMessage(chatId: string, text: string) {
  if (!BOT_TOKEN || !chatId) return;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      console.error("[Telegram] Ошибка отправки:", await res.text());
    }
  } catch (err) {
    console.error("[Telegram] Сетевая ошибка:", err);
  }
}

export async function notifyNewUser(user: {
  id?: string;
  username?: string | null;
  email?: string | null;
  telegram_username?: string | null;
}) {
  const text = `🆕 <b>Новый пользователь</b>
📧 Email: ${user.email ?? "не указан"}
📱 Telegram: ${user.telegram_username ? "@" + user.telegram_username : "нет"}
🔗 <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/users">Открыть в админке</a>`;
  await sendTelegramMessage(ADMIN_CHAT_ID, text);
}

export async function notifyNewOrder(
  order: { id: string; plan_name?: string; price: number; account_email?: string },
  user: { email?: string | null }
) {
  const text = `📦 <b>Новый заказ</b>
🛒 Тариф: ${order.plan_name ?? order.id}
💰 Сумма: ${order.price} ₽
📧 Клиент: ${user.email ?? "неизвестен"}
📧 ChatGPT: ${order.account_email ?? "не указан"}
🔗 <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/orders">Открыть заказ</a>`;
  await sendTelegramMessage(ADMIN_CHAT_ID, text);
}

export async function notifyPaymentStatus(
  order: { id: string; plan_name?: string; price: number; account_email?: string },
  status: string
) {
  const emoji = {
    paid: "✅",
    activating: "🔵",
    active: "🟢",
    failed: "❌",
    refunded: "↩️",
    waiting_client: "⏳",
  }[status] ?? "📋";

  const statusNames: Record<string, string> = {
    paid: "Оплачен",
    activating: "В активации",
    active: "Активирован",
    failed: "Ошибка",
    refunded: "Возврат",
    waiting_client: "Ждём токен",
  };

  const text = `${emoji} <b>Статус заказа изменился</b>
📋 Заказ: ${order.id.slice(0, 8)}...
🛒 Тариф: ${order.plan_name ?? "неизвестен"}
💰 Сумма: ${order.price} ₽
📊 Статус: <b>${statusNames[status] ?? status}</b>
📧 ChatGPT: ${order.account_email ?? "не указан"}
🔗 <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/orders">Открыть в админке</a>`;
  await sendTelegramMessage(ADMIN_CHAT_ID, text);
}

export async function notifyNewMessage(
  sessionId: string,
  userEmail: string | null,
  messagePreview: string
) {
  const text = `💬 <b>Новое сообщение от клиента</b>
👤 Клиент: ${userEmail ?? "неизвестен"}
💬 "${messagePreview.slice(0, 100)}${messagePreview.length > 100 ? "..." : ""}"
🔗 <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/chat">Ответить в админке</a>`;
  await sendTelegramMessage(ADMIN_CHAT_ID, text);
}

export async function notifyNewReview(review: {
  author_name?: string | null;
  content: string;
}) {
  const text = `⭐ <b>Новый отзыв на модерации</b>
👤 Автор: ${review.author_name ?? "Аноним"}
💬 "${review.content.slice(0, 150)}..."
🔗 <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/reviews">Модерировать</a>`;
  await sendTelegramMessage(ADMIN_CHAT_ID, text);
}

export async function notifyDelayedSession(sessionId: string, delayMinutes: number) {
  const text = `🚨 <b>Нет ответа оператора</b>
📋 Сессия: ${sessionId}
⏱ Ожидание: ${delayMinutes} мин
🔗 <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/chat">Открыть чат</a>`;
  await sendTelegramMessage(ADMIN_CHAT_ID, text);
}
