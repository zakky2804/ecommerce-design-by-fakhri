"use client";

import ListCarts from "@/components/orders/ListCarts";
import OrderForm from "@/components/orders/OrderForm";
import { useDataStore } from "@/store/dataStore";
import { notFound, useParams } from "next/navigation";

export default function OrderDetailId() {
  const params = useParams<{ id: string }>();
  const id = params.id ?? ""; // fallback jika undefined

  const { getOrder } = useDataStore();
  const orderData = id ? getOrder(id) : undefined;

  if (!orderData) notFound();

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-10 py-8 items-center">
      <OrderForm data={orderData} isReadOnly={true} />

      <ListCarts products={orderData.products} />
    </div>
  );
}
