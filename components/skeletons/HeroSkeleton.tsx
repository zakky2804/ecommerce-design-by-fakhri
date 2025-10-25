"use client";

export default function HeroSkeleton() {
  return (
    <section className="mt-5 mb-16 w-full bg-secondary rounded-md pt-8 pb-10 sm:py-10 px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-8 animate-pulse">
      {/* Bagian Teks */}
      <div className="flex-1 w-full space-y-3 sm:space-y-4">
        {/* Judul */}
        <div className="h-8 sm:h-10 bg-accent/60 rounded-lg w-3/4"></div>
        <div className="h-8 sm:h-10 bg-accent/60 rounded-lg w-2/4"></div>

        {/* Deskripsi */}
        <div className="mt-4 sm:mt-9 space-y-2">
          <div className="h-4 bg-accent/40 rounded w-4/6"></div>
          <div className="h-4 bg-accent/40 rounded w-4/6"></div>
        </div>

        {/* Tombol */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="h-12 w-full sm:w-32 bg-accent/70 rounded-lg"></div>
          <div className="h-12 w-full sm:w-32 bg-accent/40 rounded-lg"></div>
        </div>
      </div>

      {/* Bagian Gambar */}
      <div className="flex-shrink-0 w-60 h-80 bg-accent/60 rounded-xl  sm:mt-0"></div>
    </section>
  );
}
