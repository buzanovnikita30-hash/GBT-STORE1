import type { Metadata } from "next";
import { MailCheck } from "lucide-react";

export const metadata: Metadata = { title: "Подтвердите email" };

export default function VerifyEmailPage() {
  return (
    <div className="w-full max-w-sm text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#10a37f]/10">
        <MailCheck size={26} className="text-[#10a37f]" />
      </div>
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-3">Проверьте почту</h1>
      <p className="text-sm text-gray-500 leading-relaxed mb-6">
        Мы отправили письмо с подтверждением. Нажмите на ссылку в письме, чтобы активировать аккаунт.
      </p>
      <p className="text-xs text-gray-400">
        Не нашли письмо? Проверьте папку «Спам». Если письмо не пришло в течение 5 минут —{" "}
        <a href="/register" className="text-[#10a37f] hover:underline">попробуйте снова</a>.
      </p>
    </div>
  );
}
