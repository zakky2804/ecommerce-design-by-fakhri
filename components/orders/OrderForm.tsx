"use client";

import { FormOrder, Order } from "@/interfaces/interface";
import { useDataStore } from "@/store/dataStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const OrderForm = ({
  isReadOnly = false,
  data,
}: {
  isReadOnly?: boolean;
  data?: Order;
}) => {
  const { addOrder } = useDataStore();
  const router = useRouter();

  const [formData, setFormData] = useState<FormOrder>({
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    fullName: data?.fullName || "",
    email: data?.email || "",
    phone: data?.phone || 0,
    country: data?.country || "",
    city: data?.city || "",
    state: data?.state || "",
    zibCode: data?.zibCode || "",
    method: data?.method || "COD",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOrder(formData);
    toast.success("Product Processed.");
    router.push("/orders");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg bg-secondary rounded-xl p-6 shadow-md space-y-4 font-Outfit "
    >
      <h2 className="text-2xl font-semibold mb-4">Order Information</h2>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          readOnly={isReadOnly}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          readOnly={isReadOnly}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone || ""}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          readOnly={isReadOnly}
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
          readOnly={isReadOnly}
          className="w-full rounded-md border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            readOnly={isReadOnly}
            className="rounded-md border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            readOnly={isReadOnly}
            className="rounded-md border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <input
          type="text"
          name="zibCode"
          placeholder="Zip Code"
          value={formData.zibCode}
          onChange={handleChange}
          required
          readOnly={isReadOnly}
          className="w-full rounded-md border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
        />

        <select
          name="method"
          value={formData.method}
          onChange={handleChange}
          className="w-full rounded-md border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          disabled={isReadOnly}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="REGULER">Reguler</option>
          <option value="EXPRESS">Express</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-primary text-white font-medium py-2 rounded-md hover:bg-primary/90 active:scale-95 transition"
        hidden={isReadOnly}
      >
        Place Order
      </button>
    </form>
  );
};

export default OrderForm;
