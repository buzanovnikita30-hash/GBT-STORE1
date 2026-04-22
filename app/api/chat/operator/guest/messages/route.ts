import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("chat_messages")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) {
    return NextResponse.json({ error: "Не удалось загрузить сообщения" }, { status: 500 });
  }

  return NextResponse.json({ messages: data ?? [] });
}

export async function POST(req: NextRequest) {
  let body: { sessionId?: string; content?: string };

  try {
    body = (await req.json()) as { sessionId?: string; content?: string };
  } catch {
    return NextResponse.json({ error: "Неверный формат запроса" }, { status: 400 });
  }

  const sessionId = body.sessionId?.trim();
  const content = body.content?.trim();

  if (!sessionId || !content) {
    return NextResponse.json({ error: "sessionId и content обязательны" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("chat_messages").insert({
    session_id: sessionId,
    sender_id: null,
    sender_type: "client",
    content,
  });

  if (error) {
    return NextResponse.json({ error: "Не удалось отправить сообщение" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

