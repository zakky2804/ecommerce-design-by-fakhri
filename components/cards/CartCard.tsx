"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Product } from "@/interfaces/interface";
import toast from "react-hot-toast";

interface CartCardProps {
  product: Product;
  plusProductInCart: (id: number) => boolean;
  reduceProductInCart: (id: number) => void;
  removeProductInCart: (id: number) => void;
}

const CartCard = ({
  product,
  plusProductInCart,
  reduceProductInCart,
  removeProductInCart,
}: CartCardProps) => {
  const handleClickButtonClick = (id: number): void => {
    if (!plusProductInCart(id)) toast.error("Stock out.");
  };

  return (
    <div className="flex items-start gap-4 p-3 border-b border-border rounded-xl bg-secondary/90 shadow-sm relative hover:shadow-md transition">
      {/* Gambar Produk */}
      <div className="p-2 bg-accent rounded-md mb-2">
        <div className="relative size-16 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        </div>
      </div>

      {/* Konten */}
      <div className="flex flex-col justify-between flex-1 min-w-0 ">
        {/* Judul & Harga */}
        <div className="pr-8 mb-2">
          <h3 className="text-sm font-semibold line-clamp-2 text-foreground">
            {product.title}
          </h3>
          <p className="font-bold text-sm text-primary mt-0.5">
            ${Math.round((product.price * product.quantity * 100) / 100)}
          </p>
        </div>

        {/* Quantity Control */}
        <div className="flex items-center">
          <button
            className="p-1 hover:bg-muted transition bg-accent rounded-full disabled:cursor-not-allowed disabled:bg-accent/90"
            aria-label="Kurangi"
            onClick={() => reduceProductInCart(product.id)}
            disabled={product.quantity === 1}
          >
            <Minus size={14} />
          </button>
          <span className="px-2 text-sm font-medium select-none">
            {product.quantity}
          </span>
          <button
            className="p-1 hover:bg-muted transition bg-accent rounded-full"
            aria-label="Tambah"
            onClick={() => handleClickButtonClick(product.id)}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Tombol Hapus */}
      <button
        className="p-2 text-muted-foreground hover:text-red-500 transition rounded-full absolute bottom-2 right-2  text-title-text/90"
        aria-label="Hapus"
        onClick={() => {
          removeProductInCart(product.id);
          toast.success("Product Removed.");
        }}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default CartCard;
