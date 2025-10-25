"use client";

const ProductCardSkeleton = () => {
  return (
    <article className="animate-pulse">
      <div className="block p-2 bg-secondary rounded-md mb-4 relative w-full aspect-[1/1] overflow-hidden"></div>

      <div className="h-5 bg-accent/60 rounded w-3/4 mb-2 sm:mb-1"></div>

      <div className="space-y-1 mb-2 sm:mb-4">
        <div className="h-3 bg-accent/40 rounded w-full"></div>
        <div className="h-3 bg-accent/40 rounded w-5/6"></div>
      </div>

      <div className="h-4 bg-accent/50 rounded w-24 mb-2"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-2">
        <div className="h-4 sm:h-5 w-16 bg-accent/60 rounded"></div>
        <div className="h-9 w-full sm:w-28 bg-accent/60 rounded-full"></div>
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
