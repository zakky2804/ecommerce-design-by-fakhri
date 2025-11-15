import type { Metadata } from "next";
import { Outfit, Merriweather } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import ZustandProvider from "@/components/ZustandProvider";

const geistSans = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
});

const baseUrl = process.env.BASE_URL;
export const metadata: Metadata = {
  title: "Example — Discover the Best Products | Modern E-Commerce",
  description:
    "Shop trending fashion, popular products, and accessories at Example. Fast, secure, and easy online shopping experience.",
  keywords: [
    "online shopping",
    "e-commerce",
    "fashion",
    "popular products",
    "online store",
    "jacket",
    "t-shirt",
    "accessories",
    "gadgets",
  ],
  authors: [{ name: "Example Store", url: baseUrl }],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "E-commerce",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await fetch("https://fakestoreapi.com/products");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ZustandProvider>
          <div className="xl:max-w-[1366px] mx-auto ">
            <Navbar />
            <main className="px-4 md:px-0 md:max-w-2xl lg:max-w-3xl xl:max-w-6xl xl:px-6 mx-auto">
              {children}
            </main>
            <Footer />
          </div>
        </ZustandProvider>
      </body>
    </html>
  );
}
