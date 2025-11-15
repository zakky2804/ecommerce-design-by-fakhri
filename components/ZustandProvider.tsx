"use client";

import { Product } from "@/interfaces/interface";
import { useDataStore } from "@/store/dataStore";
import { useEffect, useRef } from "react";

import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

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

  return (
    <>
      {children}
      <NextTopLoader
        color="#e85e2d" // warna (Tailwind blue-500)
        initialPosition={0.08} // posisi awal bar (8%)
        crawlSpeed={200} // kecepatan "merayap"
        height={3} // tinggi bar dalam px
        crawl={true} // animasi merayap saat loading
        showSpinner={false} // hilangkan spinner kecil
        easing="ease"
        speed={400}
        shadow="0 0 10px #3B82F6, 0 0 5px #3B82F6" // glow biru
      />
      <Toaster
        toastOptions={{
          style: {
            color: "white",
            fontFamily: "outfit",
          },
          position: "top-right",
          success: {
            style: {
              background: "oklch(62.7% 0.194 149.214) ",
            },
          },
          error: {
            style: {
              background: "oklch(57.7% 0.245 27.325)",
            },
          },
        }}
      />
    </>
  );
}
