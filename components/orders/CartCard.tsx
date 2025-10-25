"use client";

import { Product } from "@/interfaces/interface";
import Image from "next/image";

const CartCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex items-start gap-4 p-3 border-b border-border rounded-xl bg-secondary/90 shadow-sm relative hover:shadow-md transition">
      <div className="p-2 bg-accent rounded-md mb-2">
        <div className="relative size-16 overflow-hidden">
          <Image
            src={product.image}
            alt={""}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0 ">
        <div className="pr-8 mb-2">
          <h3 className="text-sm font-semibold line-clamp-2 text-foreground">
            {product.title}
          </h3>
          <p className="font-bold text-sm text-primary mt-0.5">
            ${product.price * product.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
