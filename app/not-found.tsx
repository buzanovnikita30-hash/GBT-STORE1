import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">404</p>
      <h1 className="mt-2 font-heading text-2xl font-bold text-gray-900">Страница не найдена</h1>
      <p className="mt-3 max-w-sm text-sm text-gray-600">
        Проверьте адрес или вернитесь на главную.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-[#10a37f] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90"
      >
        На главную
      </Link>
    </div>
  );
}
