"use client";

import { useMemo, useState } from "react";
import { Loader2, Send } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

type SessionItem = {
  id: string;
  user_id: string | null;
  type: string;
  status: "open" | "closed";
  first_message_at: string | null;
  created_at: string;
  profileEmail: string | null;
  telegramUsername: string | null;
  latestOrderId: string | null;
  latestOrderStatus: string | null;
};

type Props = {
  operatorId: string;
  initialSessions: SessionItem[];
};

export function AdminChatConsole({ operatorId, initialSessions }: Props) {
  const [sessions] = useState<SessionItem[]>(initialSessions);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(initialSessions[0]?.id ?? null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState("");

  const activeSession = useMemo(
    () => sessions.find((s) => s.id === activeSessionId) ?? null,
    [sessions, activeSessionId]
  );

  async function loadMessages(sessionId: string) {
    setLoadingMessages(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });
    setMessages((data as ChatMessage[] | null) ?? []);
    setLoadingMessages(false);
  }

  async function openSession(sessionId: string) {
    setActiveSessionId(sessionId);
    await loadMessages(sessionId);
  }

  async function sendReply() {
    const text = input.trim();
    if (!text || !activeSessionId || sending) return;

    setSending(true);
    setInput("");

    const supabase = createClient();
    await supabase.from("chat_messages").insert({
      session_id: activeSessionId,
      sender_id: operatorId,
      sender_type: "operator",
      content: text,
    });

    await supabase
      .from("chat_sessions")
      .update({ last_operator_reply_at: new Date().toISOString() })
      .eq("id", activeSessionId);

    await loadMessages(activeSessionId);
    setSending(false);
  }

  return (
    <div className="grid h-[calc(100vh-140px)] grid-cols-12 gap-3">
      <div className="col-span-4 overflow-hidden rounded-xl border border-white/[0.08] bg-gray-900">
        <div className="border-b border-white/[0.08] px-4 py-3 text-sm font-semibold text-gray-200">
          Диалоги клиентов
        </div>
        <div className="h-full overflow-y-auto">
          {sessions.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => void openSession(s.id)}
              className={cn(
                "w-full border-b border-white/[0.06] px-4 py-3 text-left transition-colors hover:bg-white/[0.04]",
                activeSessionId === s.id && "bg-white/[0.06]"
              )}
            >
              <p className="truncate text-sm font-medium text-gray-100">
                {s.profileEmail ?? "Гость без аккаунта"}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {s.telegramUsername ? `@${s.telegramUsername}` : "Telegram: не указан"}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Заказ: {s.latestOrderId ?? "нет"}{s.latestOrderStatus ? ` (${s.latestOrderStatus})` : ""}
              </p>
            </button>
          ))}
          {sessions.length === 0 && (
            <div className="px-4 py-6 text-sm text-gray-500">Открытых диалогов пока нет</div>
          )}
        </div>
      </div>

      <div className="col-span-8 flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-gray-900">
        <div className="border-b border-white/[0.08] px-4 py-3">
          <p className="text-sm font-semibold text-gray-100">
            {activeSession?.profileEmail ?? "Выберите диалог"}
          </p>
          {activeSession && (
            <p className="mt-1 text-xs text-gray-400">
              session: {activeSession.id} | заказ: {activeSession.latestOrderId ?? "нет"}
            </p>
          )}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {loadingMessages && (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Loader2 size={14} className="animate-spin" />
              Загружаем сообщения...
            </div>
          )}

          {!loadingMessages && messages.length === 0 && (
            <p className="text-sm text-gray-500">В этом диалоге пока нет сообщений.</p>
          )}

          {messages.map((msg) => {
            const isOperator = msg.sender_type === "operator";
            return (
              <div key={msg.id} className={cn("flex", isOperator ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3 py-2 text-sm",
                    isOperator ? "bg-[#10a37f] text-white" : "bg-gray-100 text-gray-900"
                  )}
                >
                  <p>{msg.content}</p>
                  <p className={cn("mt-1 text-[10px]", isOperator ? "text-white/80" : "text-gray-400")}>
                    {msg.sender_type}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/[0.08] p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void sendReply();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={activeSessionId ? "Ответить клиенту..." : "Сначала выберите диалог"}
              disabled={!activeSessionId}
              className="flex-1 rounded-xl border border-white/[0.12] bg-gray-950 px-3 py-2 text-sm text-gray-100 outline-none focus:border-[#10a37f]"
            />
            <button
              type="submit"
              disabled={sending || !input.trim() || !activeSessionId}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#10a37f] text-white disabled:opacity-40"
            >
              {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

