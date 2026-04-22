import crypto from "crypto";

const PALLY_CONFIG = {
  shopId: process.env.PALLY_SHOP_ID ?? "",
  secretKey: process.env.PALLY_SECRET_KEY ?? "",
  apiUrl: process.env.PALLY_API_URL ?? "https://pally.info/api/v1",
  testMode: process.env.PALLY_TEST_MODE === "true",
};

export interface CreatePallyPaymentParams {
  orderId: string;
  amount: number;
  description: string;
  returnUrl: string;
  webhookUrl: string;
  customerEmail?: string;
}

export interface PallyPaymentResult {
  paymentId: string;
  paymentUrl: string;
  status: string;
}

export async function createPallyPayment(
  params: CreatePallyPaymentParams
): Promise<PallyPaymentResult> {
  if (!PALLY_CONFIG.shopId || !PALLY_CONFIG.secretKey) {
    throw new Error("Pally не настроен: добавь PALLY_SHOP_ID и PALLY_SECRET_KEY в .env.local");
  }

  const signString = `${PALLY_CONFIG.shopId}:${params.orderId}:${params.amount}:${PALLY_CONFIG.secretKey}`;
  const sign = crypto.createHash("md5").update(signString).digest("hex");

  const body = {
    shop_id: PALLY_CONFIG.shopId,
    order_id: params.orderId,
    amount: params.amount,
    currency: "RUB",
    desc: params.description,
    success_url: `${params.returnUrl}?orderId=${params.orderId}`,
    fail_url: `${params.returnUrl.replace("success", "fail")}?orderId=${params.orderId}`,
    webhook_url: params.webhookUrl,
    email: params.customerEmail,
    sign,
    test: PALLY_CONFIG.testMode ? 1 : 0,
  };

  const response = await fetch(`${PALLY_CONFIG.apiUrl}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PALLY_CONFIG.secretKey}`,
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Pally API ошибка: ${text}`);
  }

  if (!response.ok || data.error) {
    throw new Error(`Pally ошибка: ${JSON.stringify(data.error ?? data.message ?? data)}`);
  }

  return {
    paymentId: String(data.payment_id ?? data.id ?? params.orderId),
    paymentUrl: String(data.payment_url ?? data.url ?? data.redirect_url ?? ""),
    status: String(data.status ?? "pending"),
  };
}

export function verifyPallyWebhook(
  body: Record<string, unknown>,
  receivedSign: string
): boolean {
  const signString = `${PALLY_CONFIG.shopId}:${body.order_id}:${body.amount}:${PALLY_CONFIG.secretKey}`;
  const expectedSign = crypto.createHash("md5").update(signString).digest("hex");

  if (!receivedSign || receivedSign.length !== expectedSign.length) return false;
  return crypto.timingSafeEqual(Buffer.from(receivedSign), Buffer.from(expectedSign));
}

export function mapPallyStatus(pallyStatus: string): string {
  const map: Record<string, string> = {
    paid: "paid",
    success: "paid",
    completed: "paid",
    1: "paid",
    failed: "failed",
    cancelled: "failed",
    cancel: "failed",
    refunded: "refunded",
    pending: "pending",
    created: "pending",
    0: "pending",
  };
  return map[String(pallyStatus).toLowerCase()] ?? "pending";
}
