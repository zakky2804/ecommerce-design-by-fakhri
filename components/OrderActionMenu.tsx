"use client";

import { useState, useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

interface OrderActionMenuProps {
  id: string;
  onRemoveOrder: (id: string) => void;
}

const OrderActionMenu = ({ id, onRemoveOrder }: OrderActionMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return; // ❌ kalau tidak open, jangan tambahkan listener

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // 🧼 Cleanup ketika dropdown ditutup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded-md hover:bg-secondary transition-colors"
      >
        <EllipsisVertical size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-popover border border-border rounded-md shadow-lg animate-in fade-in slide-in-from-top-2 bg-secondary">
          <Link
            href={`/orders/${id}`}
            className="block w-full text-left px-3 py-2 text-sm hover:bg-accent"
          >
            Detail
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              onRemoveOrder(id);
            }}
            className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-accent"
          >
            Canceled
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderActionMenu;
