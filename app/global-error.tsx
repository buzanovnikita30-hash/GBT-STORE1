"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 520, margin: "0 auto" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>Критическая ошибка</h1>
        <p style={{ marginTop: 12, color: "#4b5563", fontSize: 14, lineHeight: 1.5 }}>
          Закройте все процессы Next.js, удалите папку <code>.next</code> в корне проекта и выполните{" "}
          <code>npm run dev:clean</code>. Проверьте, что в <code>.env.local</code> у{" "}
          <code>NEXT_PUBLIC_APP_URL</code> указан полный адрес с протоколом, например{" "}
          <code>http://localhost:3000</code>.
        </p>
        <p style={{ marginTop: 8, fontSize: 12, color: "#9ca3af" }}>{error.message}</p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            marginTop: 20,
            padding: "10px 20px",
            borderRadius: 12,
            border: "none",
            background: "#10a37f",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Повторить
        </button>
      </body>
    </html>
  );
}
