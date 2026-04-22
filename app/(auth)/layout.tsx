import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Минималистичная шапка */}
      <header className="flex h-14 items-center border-b border-black/[0.06] bg-white px-6">
        <Link
          href="/"
          className="font-heading text-sm font-semibold text-gray-900 hover:text-[#10a37f] transition-colors"
        >
          GBT STORE
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        {children}
      </main>
      <footer className="py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} GBT STORE
      </footer>
    </div>
  );
}
