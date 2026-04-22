"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { QuickReplyButtons } from "@/components/ui/QuickReplyButtons";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

interface Props {
  sessionId: string;
  userId: string;
}

const QUICK_REPLY_MESSAGES: Record<string, string> = {
  "send-token": "Хочу отправить токен",
  "get-token": "Как получить токен?",
  "how-long": "Когда активируют подписку?",
  "is-safe": "Это безопасно?",
  "other": "Другой вопрос",
};

export function OperatorChat({ sessionId, userId }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    // Загружаем историю
    supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setMessages(data as ChatMessage[]);
      });

    // Realtime подписка на новые сообщения
    const channel = supabase
      .channel(`chat-${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as ChatMessage]);
          // Прокрутка вниз
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || isSending) return;
    setShowQuickReplies(false);
    setInput("");
    setIsSending(true);

    const supabase = createClient();
    await supabase.from("chat_messages").insert({
      session_id: sessionId,
      sender_id: userId,
      sender_type: "client",
      content: text,
    });

    // Обновляем first_message_at если ещё нет
    await supabase
      .from("chat_sessions")
      .update({ first_message_at: new Date().toISOString() })
      .eq("id", sessionId)
      .is("first_message_at", null);

    setIsSending(false);
  }

  const senderColor = (type: string) => {
    if (type === "client") return "bg-[#10a37f] text-white";
    if (type === "ai") return "bg-blue-100 text-blue-800";
    if (type === "auto") return "bg-gray-100 text-gray-600 italic";
    return "bg-gray-100 text-gray-800";
  };

  const senderLabel = (type: string) => {
    if (type === "operator") return "Оператор";
    if (type === "ai") return "AI помощник";
    if (type === "auto") return "Авто-ответ";
    return null;
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg) => {
          const isOwnMessage = msg.sender_type === "client";
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex", isOwnMessage ? "justify-end" : "justify-start")}
            >
              <div className="max-w-[80%]">
                {!isOwnMessage && senderLabel(msg.sender_type) && (
                  <p className="mb-1 text-[10px] font-semibold text-gray-400">
                    {senderLabel(msg.sender_type)}
                    {msg.is_auto_reply && " (авто)"}
                  </p>
                )}
                <div className={cn("rounded-2xl px-4 py-2.5 text-sm leading-relaxed", senderColor(msg.sender_type))}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {showQuickReplies && messages.length <= 1 && (
        <div className="border-t border-black/[0.06] px-4 py-3">
          <QuickReplyButtons
            onSelect={(id) => sendMessage(QUICK_REPLY_MESSAGES[id] ?? id)}
          />
        </div>
      )}

      <div className="border-t border-black/[0.06] p-3">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Напишите оператору..."
            className="flex-1 rounded-xl border border-black/[0.1] px-3 py-2 text-sm outline-none focus:border-[#10a37f] focus:ring-2 focus:ring-[#10a37f]/20"
          />
          <button
            type="submit"
            disabled={isSending || !input.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#10a37f] text-white disabled:opacity-40"
          >
            {isSending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          </button>
        </form>
      </div>
    </div>
  );
}
