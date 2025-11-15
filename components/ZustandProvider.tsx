"use client";

import { Product } from "@/interfaces/interface";
import { useDataStore } from "@/store/dataStore";
import dynamic from "next/dynamic";
import { useEffect } from "react";

interface ZustandProviderProps {
  children: React.ReactNode;
  initialdata: Product[];
}

const NextTopLoader = dynamic(() => import("nextjs-toploader"), {
  ssr: false,
});

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

const ZustandProvider = ({ children, initialdata }: ZustandProviderProps) => {
  console.log(initialdata);

  const { setProduct, initial } = useDataStore();

  useEffect(() => {
    if (!initial) {
      setProduct(initialdata);
    }
  }, [initial, initialdata, setProduct]);

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
};

export default ZustandProvider;
