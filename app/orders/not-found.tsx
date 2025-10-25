import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function NotFoundOrder() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="text-center space-y-4 -mt-20">
        <ShoppingCart size={100} className="mx-auto" />
        <h1 className="text-4xl"> No Orders Yet </h1>
        <p className="max-w-[450px]">
          Looks like you haven&apos;t placed any orders. Explore our collections
          and find something you love.
        </p>

        <Link
          href={"/products"}
          className="inline-block px-5 py-3 cta-btn bg-primary rounded-md hover:bg-hover-primary mr-2 link-btn"
        >
          Start Shopping
        </Link>
      </section>
    </div>
  );
}
