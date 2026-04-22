import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  let providedSessionId: string | undefined;

  try {
    const body = (await req.json()) as { sessionId?: string };
    providedSessionId = body.sessionId;
  } catch {
    providedSessionId = undefined;
  }

  if (providedSessionId) {
    const { data: existing, error: selectError } = await supabaseAdmin
      .from("chat_sessions")
      .select("id")
      .eq("id", providedSessionId)
      .eq("status", "open")
      .maybeSingle();

    if (!selectError && existing?.id) {
      return NextResponse.json({ sessionId: existing.id });
    }
  }

  const { data, error } = await supabaseAdmin
    .from("chat_sessions")
    .insert({
      user_id: null,
      type: "operator",
      status: "open",
    })
    .select("id")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Не удалось создать чат с оператором" }, { status: 500 });
  }

  return NextResponse.json({ sessionId: data.id });
}

