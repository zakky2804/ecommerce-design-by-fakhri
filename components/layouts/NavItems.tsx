"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/orders", label: "Orders" },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li
            key={link.href}
            className={`duration-200 hover:text-title-text ${
              isActive ? "text-title-text font-semibold" : "text-foreground/95"
            }`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        );
      })}
    </>
  );
};

export default NavItems;
