"use client";

import { CircleUser, ShoppingCart } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Carts = dynamic(() => import("../Carts"), { ssr: false });
const MobileMenu = dynamic(() => import("./MobileMenu"), {
  ssr: false,
  loading: () => (
    <Image
      src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
      width={24}
      height={24}
      sizes="36x36"
      alt="Mobile menu toggle"
      priority={false}
      title="Mobile menu toggle"
      className="ml-[10px] sm:hidden"
    />
  ),
});
const Sidebar = dynamic(() => import("./Sidebar"), {
  ssr: false,
  loading: () => (
    <button
      className="rounded-full duration-200 hover:bg-secondary p-2"
      aria-label="Open shopping cart"
    >
      <ShoppingCart size={18} className="" />
    </button>
  ),
});

const LazyNavbarContainer = () => {
  return (
    <div className="flex items-center sm:gap-1 ">
      <Sidebar>
        <Carts />
      </Sidebar>
      <div className=" items-center gap-2 hidden sm:flex">
        <CircleUser size={18} />
        <span className="">Account</span>
      </div>
      <MobileMenu />
    </div>
  );
};

export default LazyNavbarContainer;
