"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  rounded?: string;
}

export default function ImageWithSkeleton({
  src,
  alt,
  width,
  height,
  className = "",
  rounded = "rounded-lg",
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`relative overflow-hidden ${rounded}`}
      style={{ width, height }}
    >
      {/* Skeleton Loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-accent animate-pulse" />
      )}

      {/* Gambar */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} object-cover ${rounded} transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        priority={false}
      />
    </div>
  );
}
