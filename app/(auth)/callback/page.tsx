import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { CallbackContent } from "./CallbackContent";

export default function CallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-3 text-center">
            <Loader2 size={28} className="animate-spin text-[#10a37f]" />
            <p className="text-sm text-gray-500">Завершаем вход...</p>
          </div>
        }
      >
        <CallbackContent />
      </Suspense>
    </div>
  );
}
