import HeroSlider from "@/components/home/HeroSlider";
import { Suspense } from "react";
import PopulerProduct from "@/components/home/PopulerProduct";
import dynamic from "next/dynamic";

const Features = dynamic(() => import("@/components/home/Features"), {
  ssr: true,
});

const Brand = dynamic(() => import("@/components/home/Brand"), {
  ssr: true,
});

export default function Home() {
  return (
    <>
      <HeroSlider />
      <PopulerProduct />

      <Suspense fallback={<div>Loading products...</div>}>
        <Features />
      </Suspense>
      <Suspense fallback={<div>Loading brands...</div>}>
        <Brand />
      </Suspense>
    </>
  );
}
