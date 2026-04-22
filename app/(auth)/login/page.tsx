import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Вход" };

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">Вход в кабинет</h1>
      <p className="text-sm text-gray-500 mb-8">
        Нет аккаунта?{" "}
        <a href="/register" className="text-[#10a37f] hover:underline">
          Зарегистрироваться
        </a>
      </p>
      <LoginForm />
    </div>
  );
}
