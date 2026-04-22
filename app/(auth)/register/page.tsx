import type { Metadata } from "next";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = { title: "Регистрация" };

export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">Создать аккаунт</h1>
      <p className="text-sm text-gray-500 mb-8">
        Уже есть аккаунт?{" "}
        <a href="/login" className="text-[#10a37f] hover:underline">
          Войти
        </a>
      </p>
      <RegisterForm />
    </div>
  );
}
