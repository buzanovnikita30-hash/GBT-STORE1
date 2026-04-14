"use client";

import { useMemo, useState } from "react";
import { OrderDrawer } from "@/components/admin/OrderDrawer";
import { OrdersTable } from "@/components/admin/OrdersTable";
import type { MockOrder, OrderStatus } from "@/lib/mockData";
import { mockOrders } from "@/lib/mockData";
import { cn } from "@/lib/utils";

type Tab = "all" | "new" | "progress" | "done" | "issues";

const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "new", label: "Новые" },
  { id: "progress", label: "В работе" },
  { id: "done", label: "Завершённые" },
  { id: "issues", label: "Проблемы" },
];

function filterOrders(orders: MockOrder[], tab: Tab): MockOrder[] {
  switch (tab) {
    case "new":
      return orders.filter((o) =>
        ["Создан", "Ожидаются данные"].includes(o.status)
      );
    case "progress":
      return orders.filter((o) =>
        ["Данные получены", "В работе"].includes(o.status)
      );
    case "done":
      return orders.filter((o) => o.status === "Активирован");
    case "issues":
      return orders.filter((o) =>
        ["Проблема", "Требует уточнения"].includes(o.status)
      );
    default:
      return orders;
  }
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [rows, setRows] = useState<MockOrder[]>(mockOrders);
  const [selected, setSelected] = useState<MockOrder | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => filterOrders(rows, tab), [rows, tab]);

  function openOrder(o: MockOrder) {
    setSelected(o);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  function onStatusChange(id: string, status: OrderStatus) {
    setRows((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-lg font-semibold text-slate-200">Заказы</h1>
      <p className="mt-1 text-xs text-slate-500">
        Таблица и панель заказа — без анимаций, демо-данные.
      </p>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded px-3 py-1.5 text-sm",
              tab === t.id
                ? "bg-slate-700 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <OrdersTable orders={filtered} onRowClick={openOrder} />
      </div>

      <OrderDrawer
        order={selected}
        open={drawerOpen && selected !== null}
        onClose={closeDrawer}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}
