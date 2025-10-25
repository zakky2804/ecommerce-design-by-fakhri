"use client";

import OrderItem from "@/components/OrderItem";
import { useDataStore } from "@/store/dataStore";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";

export default function Orders() {
  const { orders, removeOrder } = useDataStore();

  const handleRemoveOrder = (id: string): void => {
    removeOrder(id);
    toast.success("Product Removed.");
  };

  if (!orders.length) notFound();

  return (
    <section className="py-5">
      <div className="">
        <div className="text-center text-sm font-Outfit">Home / Orders</div>
        <h2 className="mb-12 text-3xl font-semibold text-center">My Orders</h2>
      </div>

      <div className="max-w-4xl mx-auto">
        {orders.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            onRemoveOrder={handleRemoveOrder}
          />
        ))}
      </div>
    </section>
  );
}
