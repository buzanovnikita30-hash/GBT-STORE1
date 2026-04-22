"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function ChatWidget() {
  const pathname = usePathname();

  if (pathname === "/support") return null;

  return (
    <a href="/support" aria-label="Открыть поддержку">
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#10a37f] shadow-lg shadow-[#10a37f]/30"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#10a37f]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <MessageCircle size={24} color="white" className="relative z-10" />
      </motion.div>
    </a>
  );
}


