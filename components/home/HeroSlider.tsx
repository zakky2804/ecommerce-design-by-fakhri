"use client";

import { useEffect, useState } from "react";
import { useDataStore } from "@/store/dataStore";
import { Product } from "@/interfaces/interface";
import Slider from "../Slider";
import SliderItem from "../SliderItem";
import HeroSkeleton from "../skeletons/HeroSkeleton";

const HeroSlider = () => {
  const { products, addToCart } = useDataStore();
  const [sliderProduct, setSliderProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setSliderProduct(products.slice(0, 3));
      setLoading(false);
    }
  }, [products]);

  if (loading) {
    return <HeroSkeleton />;
  }

  return (
    <section className="py-5 mb-4">
      <Slider>
        {sliderProduct.map((slider) => (
          <SliderItem key={slider.id} product={slider} addToCart={addToCart} />
        ))}
      </Slider>
    </section>
  );
};

export default HeroSlider;
