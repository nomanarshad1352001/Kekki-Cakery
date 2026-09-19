import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout — Secure Card & PayNow Payment",
  description:
    "Secure checkout with card or PayNow. Choose islandwide delivery or free self-collection, pick your cake day and let Kekki handle the rest.",
};

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
