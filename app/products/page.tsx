"use client";

import ProductCard from "@/components/cards/ProductCard";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";
import { useDataStore } from "@/store/dataStore";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function Products() {
  const { products, addToCart } = useDataStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const perPage = 10;

  const totalPages = useMemo(() => {
    return Math.ceil(products.length / perPage);
  }, [products.length]);

  const productData = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return products.slice(start, end);
  }, [products, currentPage]);

  useEffect(() => {
    if (productData.length !== 0) {
      setLoading(false);
    }
  }, [productData]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="py-5">
      <div className="">
        <div className="text-center text-sm font-Outfit">Home / Products</div>
        <h2 className="mb-12 text-3xl font-semibold text-center">
          Popular products
        </h2>
      </div>

      {/* LIST PRODUK */}
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
            {productData.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </>
        )}
      </div>

      <div className="text-center flex items-center justify-center gap-x-2 text-xs">
        <button
          className="border border-border rounded-full p-2 hover:bg-accent duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeft size={14} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`border border-border rounded-full size-8 hover:bg-accent duration-200 ${
              page === currentPage ? "bg-accent text-primary-foreground" : ""
            }`}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ))}

        {/* Tombol Next */}
        <button
          className="border border-border rounded-full p-2 hover:bg-accent duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}
