import { type NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { mapCryptoStatus } from "@/lib/payments/crypto";
import { notifyPaymentStatus } from "@/lib/telegram/notifications";

export async function POST(request: NextRequest) {
  const body = await request.json() as Record<string, unknown>;

  const invoiceId = String(body.invoice_id ?? body.uuid ?? "");
  const status = String(body.status ?? "");

  if (!invoiceId) {
    return NextResponse.json({ error: "Missing invoice_id" }, { status: 400 });
  }

  const internalStatus = mapCryptoStatus(status);
  const supabase = createAdminClient();

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_id", invoiceId)
    .single();

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const updates: Record<string, unknown> = {
    status: internalStatus === "paid" ? "activating" : internalStatus,
  };

  await supabase.from("orders").update(updates).eq("id", order.id);
  await notifyPaymentStatus(order, internalStatus).catch(() => {});

  return NextResponse.json({ ok: true });
}
