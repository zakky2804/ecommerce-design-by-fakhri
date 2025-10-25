import { SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFoundOrder() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="text-center space-y-4 -mt-20">
        <SearchX size={100} className="mx-auto" />
        <h1 className="text-4xl"> Order Not Found </h1>
        <p>Sorry, we couldn&apos;tt find the Order you&apos;tre looking for.</p>
        <div className="">
          <Link
            href={"/"}
            className="inline-block px-5 py-3 cta-btn bg-primary rounded-md hover:bg-hover-primary mr-2"
          >
            Go to Home
          </Link>
          <Link
            href={"/products"}
            className="inline-block px-5 py-3 cta-btn border border-border rounded-md hover:bg-hover-primary link-btn"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  );
}
