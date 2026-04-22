import type { Metadata } from "next";
import { CheckoutFlow } from "./CheckoutFlow";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "���������� ������" };

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
