import Image from "next/image";
import BrandImage1 from "@/assets/jbl_soundbox_image.png";
import BrandImage2 from "@/assets/md_controller_image.png";
import Link from "next/link";

const Brand = () => {
  return (
    <section className="my-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center bg-[var(--secondary)] rounded-md xl:pl-10 pb-4 px-0 md:max-h-[302px]">
      <Image
        src={BrandImage1}
        alt=""
        className="hidden xl:block "
        width={224}
        height={262}
      />
      {/* content */}
      <div className="text-center max-w-[343px] space-y-2 order-1 md:order-2 mx-auto">
        <h2 className="text-3xl font-semibold tracking-wide">
          Level Up Your <br /> Gaming Experience
        </h2>
        <p className="">
          From immersive sound to precise controls—everything you need to win
        </p>
        <Link
          href={"/products/14"}
          className="inline-block px-12 py-[10px] rounded btn-primary cta-btn text-lg hover:bg-hover-primary link-btn"
        >
          Buy now
        </Link>
      </div>
      <Image
        src={BrandImage2}
        alt=""
        className="w-full md:w-fit ml-auto md:order-3"
        width={320}
        height={302}
      />
    </section>
  );
};

export default Brand;
