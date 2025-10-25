"use client";

import { TextAlignEnd, X } from "lucide-react";
import NavItems from "./NavItems";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLUListElement>): void => {
    const target = e.target as HTMLElement;
    const element = target.closest("li"); // cari elemen <a> terdekat (bisa target sendiri atau parent)

    if (element) setIsOpen(false);
  };

  return (
    <>
      <button
        className="md:hidden rounded-full duration-200 hover:bg-secondary p-2"
        aria-label="Toggle for open menu"
        onClick={() => setIsOpen(true)}
      >
        <TextAlignEnd size={18} />
      </button>

      <div
        className={`md:hidden fixed inset-0 p-4 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-75  ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-0 pointer-events-none"
        }}`}
      >
        <ul
          className={`relative bg-secondary rounded-md h-80 flex flex-col items-center justify-center gap-8 transition duration-200 ${
            isOpen ? "scale-100" : "scale-75"
          }`}
          onClick={handleClick}
        >
          <button
            className="absolute top-3 right-3"
            onClick={() => setIsOpen(false)}
          >
            <X size={30} />
          </button>
          <NavItems />
        </ul>
      </div>
    </>
  );
};

export default MobileMenu;
