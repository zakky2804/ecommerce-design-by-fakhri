"use client";

import Rating from "@/components/ui/Rating";
import { useDataStore } from "@/store/dataStore";
import { Archive, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function PageName() {
  const { getProduct, addToCart } = useDataStore();
  const params = useParams<{ id: string }>();
  const id = params.id ?? "";
  const product = getProduct(id);

  const handleClick = (): void => {
    if (product) {
      if (addToCart(product)) {
        toast.success("Product Added.");
      } else {
        toast.error("stock out.");
      }
    }
  };

  if (!product) notFound();

  return (
    <div className="py-5">
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 p-6 ">
          <div className="p-8 bg-secondary rounded-md mb-2 lg:mx-0">
            <div className="relative w-full aspect-[1/1] overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </div>
          </div>

          <section className="md:px-12 pt-8 space-y-4">
            <div className="">
              <p className="text-primary text-sm"> {product.category} </p>
              <h2 className="text-3xl sm:text-4xl font-bold ">
                {product.title}
              </h2>
            </div>
            <p className="">
              <span className="text-2xl font-semibold mr-1 text-primary">
                ${product.price}
              </span>
              <span className="line-through ">
                ${Math.round(product.price + (10 * 100) / 100)}
              </span>
            </p>
            <div className="flex justify-between items-center">
              <Rating rating={product.rating.rate} />

              <div className="flex items-center gap-1">
                <Archive size={16} className="" />
                <span className="text-sm">Stock: {product.quantity} left</span>
              </div>
            </div>
            <p className=""> {product.description} </p>
            <button
              className="px-6 flex items-center gap-1 justify-center py-3 w-full rounded-md bg-primary cta-btn hover:bg-hover-primary disabled:cursor-not-allowed disabled:active:scale-100 disabled:bg-primary/80"
              disabled={product.quantity === 1}
              onClick={handleClick}
            >
              <ShoppingCart size={20} />
              Add To Cart
            </button>
          </section>
        </div>
      </>
    </div>
  );
}
