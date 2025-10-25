"use client";

import { Star } from "lucide-react";

interface RatingProps {
  rating: number; // contoh: 3 -> artinya 3 bintang akan berwarna
}

const Rating = ({ rating }: RatingProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="mb-1 flex items-center gap-2">
      <p className="text-xs"> {rating} </p>
      <div className="flex items-center gap-1">
        {stars.map((star) => (
          <Star
            key={star}
            size={12}
            className={
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-400"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Rating;
