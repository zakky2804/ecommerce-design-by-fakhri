"use client";

// import Link from "next/link";
import CartCard from "./cards/CartCard";
import { useDataStore } from "@/store/dataStore";

const Carts = () => {
  const { carts, plusProductInCart, reduceProductInCart, removeProductInCart } =
    useDataStore();

  return (
    <>
      {/* list cart */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className="flex flex-col gap-2 px-1">
          {carts.map((product) => (
            <CartCard
              product={product}
              plusProductInCart={plusProductInCart}
              reduceProductInCart={reduceProductInCart}
              removeProductInCart={removeProductInCart}
              key={product.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Carts;
