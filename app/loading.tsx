"use client";

import { ShoppingBag } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background text-foreground gap-4">
      {/* Icon Utama */}
      <div className="animate-bounce">
        <ShoppingBag className="w-14 h-14 text-primary" strokeWidth={1.5} />
      </div>

      {/* Teks Loading */}
      <p className="text-base font-medium tracking-wide">
        Sedang memuat halaman...
      </p>

      {/* Skeleton garis loading */}
      <div className="mt-2 w-40 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full w-1/2 bg-primary animate-[loadingBar_1.2s_infinite]" />
      </div>
    </div>
  );
}
