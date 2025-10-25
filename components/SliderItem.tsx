import { Product } from "@/interfaces/interface";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

interface SliderItemProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const SliderItem = ({ product, addToCart }: SliderItemProps) => {
  return (
    <article className="keen-slider__slide min-w-full bg-secondary flex flex-col-reverse md:flex-row justify-between items-center py-10 px-8 max-w-96 gap-y-2 rounded-md">
      <div className="flex flex-col justify-center max-w-lg space-y-3 sm:space-y-5">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-title-text line-clamp-2">
          {product.title}
        </h2>

        <p className="line-clamp-2 text-base text-muted-foreground">
          {product.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 font-Outfit">
          <button
            onClick={() => {
              addToCart(product);
              toast.success("Product Added.");
            }}
            className="px-6 py-3 bg-primary rounded-md text-title-text font-medium hover:bg-hover-primary transition active:scale-95"
          >
            Add To Cart
          </button>

          <Link
            href={`/products/${product.id}`}
            aria-label={`View product details: ${product.title}`}
            className="px-6 py-3 border border-border rounded-md text-title-text font-medium hover:bg-hover-primary text-center link-btn"
          >
            View Product
          </Link>
        </div>
      </div>

      <div className="relative size-80 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority
          className="object-contain"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>
    </article>
  );
};

export default SliderItem;
