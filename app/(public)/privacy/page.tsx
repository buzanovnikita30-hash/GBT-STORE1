import type { Metadata } from "next";
import { LandingFooter } from "@/components/layout/LandingFooter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "�������� ������������������",
  description: "�������� ������������������ ������� Sub��",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex h-14 items-center border-b border-black/[0.06] px-6">
        <Link href="/" className="font-heading text-sm font-semibold text-gray-900 hover:text-[#10a37f]">
          Sub��
        </Link>
      </header>
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12">
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-8">
          �������� ������������������
        </h1>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
          <section>
            <h2 className="font-heading text-xl font-semibold text-gray-900">1. ����� ���������</h2>
            <p>
              ��������� �������� ������������������ ���������, ��� Sub�� (����� � �������) ��������, ����������
              � �������� ������������ ������ ������������� ��� ������������� ����� � �����.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-gray-900">2. ����� ������ �� ��������</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Email-����� (��� ����������� � �����)</li>
              <li>Telegram ID � username (��� ����������� ����� Telegram)</li>
              <li>Email �������� ChatGPT (��� ��������� ��������)</li>
              <li>������ �� ������ (�������������� ��������� ���������, �� �������� ����)</li>
              <li>������������� ������ � ���������� (������.�������, ��� ����� ��������)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-gray-900">3. ��� �� ���������� ������</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>��� ���������� ������� � ��������� ��������</li>
              <li>��� ����� �� �������� ������� � ���������</li>
              <li>��� ��������� �������� �������</li>
              <li>��� �������� ������ ����������� � ��������� �������</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-gray-900">4. �������� ������</h2>
            <p>
              ������ �������� � ���������� ���� ������ Supabase. �� ��������� ���������� � �������� (HTTPS)
              � � ��������� �����. ������ � ������ ������ ���������.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-gray-900">5. ���� � ���������</h2>
            <p>
              �� ���������� ������.������� ��� ��������� ������ � ������ ������ ��������, ������� �� ������
              ���� ��� �������� � ������� ��� ������ ��������� �����. ����������� ���� ���������� ��� ������
              ����� � �� ������� ��������.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-gray-900">6. ���� �����</h2>
            <p>
              �� ������ ����� �� ������, ����������� ��� �������� ����� ������. ��� ����� �������� ��
              contact@subrf.ru ��� � Telegram @subs_support.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-gray-900">7. ��������</h2>
            <p>
              �� �������� ��������� ������������ ������: <a href="mailto:contact@subrf.ru" className="text-[#10a37f] hover:underline">contact@subrf.ru</a>
            </p>
          </section>

          <p className="text-sm text-gray-400">��������� ����������: ������ 2026</p>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
