import Link from "next/link";
import { OrderCard } from "@/components/cabinet/OrderCard";
import { MessageThread } from "@/components/cabinet/MessageThread";
import {
  cabinetMockOrder,
  cabinetUserName,
  messagesForOrder,
} from "@/lib/mockData";

export default function CabinetPage() {
  const orderId = "DEMO-001";
  const initialMessages = messagesForOrder(orderId).slice(0, 2);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold sm:text-3xl">
        Привет, {cabinetUserName}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Личный кабинет (демо-данные).
      </p>
      <div className="mt-10 space-y-8">
        <OrderCard
          product={cabinetMockOrder.product}
          status={cabinetMockOrder.status}
          validUntil={cabinetMockOrder.validUntil}
        />
        <MessageThread initialMessages={initialMessages} />
      </div>
      <p className="mt-10 text-center text-sm text-muted-foreground">
        <Link href="/" className="text-primary hover:underline">
          На главную
        </Link>
      </p>
    </div>
  );
}
