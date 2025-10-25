import { ExternalLink } from "lucide-react";
import Image from "next/image";
import FeaturesImage1 from "@/assets/feature_image1.png";
import FeaturesImage2 from "@/assets/feature_image2.png";
import FeaturesImage3 from "@/assets/feature_image3.png";
import Link from "next/link";

const featuresData = [
  {
    id: 1,
    title: "Cool & Comfy Jacket",
    description:
      "Enjoy comfort and style every day. Perfect for both casual and active weather.",
    image: FeaturesImage1,
    link: "/products/15",
  },
  {
    id: 2,
    title: "Classic White T-Shirt",
    description:
      "Simple and comfortable design. Perfect for a casual look or paired with your favorite outfit.",
    image: FeaturesImage2,
    link: "/products/18",
  },
  {
    id: 3,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
    image: FeaturesImage3,
    link: "/products/13",
  },
];

const Features = () => {
  return (
    <section className="py-8">
      <h2 className="text-center text-3xl mb-8">Featured Products</h2>

      {/* flex */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:px-6 gap-y-6">
        {featuresData.map((feature) => (
          <div
            className="relative w-full sm:max-w-[295] md:max-w-[266.66px] group mx-auto"
            key={feature.id}
          >
            <div className="group relative w-full aspect-[1/1] sm:w-[295px] sm:h-[371px] rounded-md overflow-hidden">
              <Image src={feature.image} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
            </div>

            <div className="absolute bottom-0 px-6 py-4">
              <h3 className="text-white text-lg font-bold">{feature.title}</h3>
              <p className="mb-2 text-sm line-clamp-2">{feature.description}</p>
              <div className="">
                <Link
                  href={feature.link}
                  className="px-4 py-2 btn-primary inline-flex items-center gap-2 cta-btn link-btn "
                >
                  Buy Now <ExternalLink size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
