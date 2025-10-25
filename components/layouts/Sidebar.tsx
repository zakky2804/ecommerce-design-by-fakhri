"use client";

import { useDataStore } from "@/store/dataStore";
import { ShoppingBag, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Sidebar = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { carts } = useDataStore();

  const totalPrice = Math.round(
    (carts.reduce((acc, item) => acc + item.quantity * item.price, 0) * 100) /
      100
  );

  useEffect(() => {
    if (!open) return; // ❌ kalau tidak open, jangan tambahkan listener
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // 🧼 Cleanup ketika dropdown ditutup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="rounded-full duration-200 hover:bg-secondary p-2"
        onClick={() => setIsOpen(true)}
        aria-label="Open shopping cart"
      >
        <ShoppingCart size={18} className="" />
      </button>

      <section
        className={`fixed top-0  right-0 h-screen w-full sm:w-[360px] bg-secondary pt-4 pb-2 flex flex-col overflow-hidden z-50 max-h-screen transition duration-200 ${
          isOpen
            ? " sm:translate-x-0 opacity-100"
            : "opacity-0  sm:translate-x-96 pointer-events-none"
        }`}
        ref={menuRef}
      >
        {/* Header (tidak ikut shrink / expand) */}
        <div className="flex justify-between border-b border-border px-4 mb-2">
          <h2 className="text-2xl mb-4 flex-shrink-0">My Carts</h2>
          <button
            className="rounded-full bg-secondary p-3 fixed top-4 right-4"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {carts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center h-full">
            <div className="bg-accent/30 rounded-full p-5 mb-4">
              <ShoppingBag size={48} className="text-primary" />
            </div>

            <h3 className="text-2xl font-semibold mb-2">Your Cart is Empty</h3>

            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              Looks like you haven&apos;t added anything to your cart yet.
              Let&apos;s get started!
            </p>

            <Link
              href={"/products"}
              className="bg-primary text-white rounded-md px-6 py-2 text-sm font-medium hover:bg-primary/90 link-btn duration-200"
              onClick={() => setIsOpen(false)}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {children}

            <div className="sm:mt-4 flex-shrink-0 bg-accent flex flex-col justify-between gap-y-6 px-4 py-4 rounded-t-2xl ">
              <p className="text-title-text"> Total : {totalPrice} </p>
              <Link
                href={"/orders/new"}
                className="px-6 py-3 w-full block text-center bg-primary rounded-md text-white"
                onClick={() => setIsOpen(false)}
              >
                Add To Order
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Sidebar;
