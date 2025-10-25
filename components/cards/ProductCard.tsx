import { Product } from "@/interfaces/interface";
import Image from "next/image";
import Rating from "../ui/Rating";
import toast from "react-hot-toast";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  return (
    <article className="">
      <Link
        href={`/products/${product.id}`}
        aria-label={`View product: ${product.title}`}
        className="block p-2 bg-secondary rounded-md mb-2"
      >
        <div className="relative w-full aspect-[1/1] overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        </div>
      </Link>

      <h3 className="line-clamp-1 mb-1"> {product.title} </h3>
      <p className="line-clamp-2 text-xs mb-2 sm:mb-4">{product.description}</p>
      <Rating rating={product.rating.rate} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-2">
        <p className="text-sm"> $ {product.price} </p>
        <button
          className="px-4 py-2 border border-border rounded-full cta-btn text-sm hover:bg-primary  duration-200"
          onClick={() => {
            addToCart(product);
            toast.success("Product Added.");
          }}
        >
          Add To Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
