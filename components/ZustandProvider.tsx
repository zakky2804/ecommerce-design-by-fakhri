"use client";

import { Product } from "@/interfaces/interface";
import { useDataStore } from "@/store/dataStore";
import { useEffect, useRef } from "react";

export default function ZustandProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setProduct, initial } = useDataStore();
  const fetchAttempted = useRef(false);

  useEffect(() => {
    // Fetch only once when component mounts
    if (!fetchAttempted.current && !initial) {
      fetchAttempted.current = true;

      console.log("🔵 Fetching products from client...");

      fetch("https://fakestoreapi.com/products")
        .then((res) => {
          console.log("🔵 Fetch status:", res.status);

          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }

          return res.json();
        })
        .then((results: Product[]) => {
          // Map products dengan quantity: 10
          const products = results.map((item) => ({
            ...item,
            quantity: 10,
          }));

          console.log("✅ Products loaded:", products.length);
          setProduct(products); // ← Ini akan set initial = true
        })
        .catch((error) => {
          console.error("❌ Fetch failed:", error);
          // Set empty array to stop loading
          setProduct([]);
        });
    }
  }, [initial, setProduct]);

  return <>{children}</>;
}
