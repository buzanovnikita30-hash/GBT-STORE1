import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <span className="text-sm font-semibold text-slate-300">
          Админ-панель (демо)
        </span>
        <Link
          href="/"
          className="text-sm text-slate-400 hover:text-white hover:underline"
        >
          На сайт
        </Link>
      </header>
      {children}
    </div>
  );
}
