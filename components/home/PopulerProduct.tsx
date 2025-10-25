"use client";

import { useEffect, useState } from "react";
import { useDataStore } from "@/store/dataStore";
import ProductCard from "../cards/ProductCard";
import { Product } from "@/interfaces/interface";
import Link from "next/link";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";

const PopulerProduct = () => {
  const { products, addToCart } = useDataStore();
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setInitialProducts(products.slice(0, 10));
      setLoading(false);
    }
  }, [products]);

  return (
    <section className="py-5">
      <h2 className="mb-4 text-2xl">Popular products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 gap-5 mb-14">
        {loading ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : (
          <>
            {initialProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </>
        )}
      </div>
      <div className="text-center w-full">
        <Link
          href={"/products"}
          aria-label={`View More Products`}
          className="mx-auto  px-8 py-2 rounded-md border border-border text-title-text/80 hover:bg-secondary duration-200"
        >
          More Products
        </Link>
      </div>
    </section>
  );
};

export default PopulerProduct;
