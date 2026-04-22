"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ChevronDown, CheckCircle2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Откройте chat.openai.com в браузере",
  "Нажмите F12 (или правой кнопкой → «Просмотр кода»)",
  "Перейдите во вкладку Application (или Storage)",
  "Слева найдите Cookies → https://chat.openai.com",
  "Найдите строку __Secure-next-auth.session-token",
  "Скопируйте значение из колонки Value",
  "Отправьте его нам в чат",
];

const FACTS = [
  {
    title: "Мы не получаем доступ к аккаунту",
    body: "Токен используется только для одного действия — подключения подписки. Ваши чаты, данные и переписка остаются полностью приватными.",
  },
  {
    title: "Используется временный токен",
    body: "Токен действителен ограниченное время и только для активации подписки. После активации он становится бесполезным.",
  },
  {
    title: "Можно завершить все сессии после активации",
    body: "После подключения подписки зайдите в Настройки ChatGPT → Безопасность → Завершить все сессии — для полного спокойствия.",
  },
];

interface Props {
  compact?: boolean;
  onSendToken?: () => void;
  className?: string;
}

export function TokenSafetyBlock({ compact = false, onSendToken, className }: Props) {
  const [isOpen, setIsOpen] = useState(!compact);

  return (
    <div className={cn("rounded-2xl border border-black/[0.08] bg-white", className)}>
      {/* Заголовок */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4"
      >
        <div className="flex items-center gap-2.5">
          <Lock size={16} className="shrink-0 text-[#10a37f]" />
          <span className="text-sm font-semibold text-gray-800">Почему это безопасно?</span>
        </div>
        <ChevronDown
          size={16}
          className={cn("shrink-0 text-gray-400 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-black/[0.06] px-5 pb-5 pt-4 space-y-5">
              {/* Что такое токен */}
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-800">Токен</span> — это временный ключ доступа, который
                позволяет нам подключить подписку к вашему аккаунту. Это{" "}
                <span className="font-semibold">НЕ ваш пароль</span> и{" "}
                <span className="font-semibold">НЕ доступ к вашей переписке.</span>
              </p>

              {/* 3 факта */}
              <div className="grid gap-3 sm:grid-cols-3">
                {FACTS.map((fact) => (
                  <div
                    key={fact.title}
                    className="rounded-xl border border-black/[0.06] bg-gray-50 p-3"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Lock size={13} className="text-[#10a37f]" />
                      <span className="text-xs font-semibold text-gray-800">{fact.title}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{fact.body}</p>
                  </div>
                ))}
              </div>

              {/* Пошаговая инструкция */}
              <div>
                <p className="mb-3 text-sm font-semibold text-gray-800">
                  Как получить токен — пошагово:
                </p>
                <ol className="space-y-2">
                  {STEPS.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10a37f]/10 text-[10px] font-bold text-[#10a37f]">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-600">{step}</span>
                    </li>
                  ))}
                </ol>

                {process.env.NEXT_PUBLIC_TOKEN_INSTRUCTION_VIDEO_URL && (
                  <a
                    href={process.env.NEXT_PUBLIC_TOKEN_INSTRUCTION_VIDEO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#10a37f] hover:underline"
                  >
                    <ExternalLink size={13} />
                    Посмотреть видео-инструкцию
                  </a>
                )}
              </div>

              {/* Пометка + кнопка */}
              <p className="rounded-xl bg-amber-50 border border-amber-200/60 px-4 py-3 text-xs text-amber-700 leading-relaxed">
                После активации рекомендуем: Настройки ChatGPT → Безопасность → Завершить все сессии.
                Это дополнительная мера предосторожности, хотя токен и так становится недействительным после использования.
              </p>

              {onSendToken && (
                <button
                  type="button"
                  onClick={onSendToken}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10a37f] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <CheckCircle2 size={15} />
                  Понял, отправить токен
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
