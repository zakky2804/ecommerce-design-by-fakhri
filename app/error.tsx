"use client";

import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="text-center space-y-4 -mt-20">
        <TriangleAlert size={100} className="mx-auto text-destructive" />
        <h1 className="text-4xl font-semibold">Something went wrong</h1>
        {/* {process.env.NODE_ENV === "development" && (
          <pre className="bg-muted p-3 rounded-md text-left text-sm text-muted-foreground overflow-auto max-w-[450px] mx-auto">
            {error?.stack}
          </pre>
        )} */}

        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={reset}
            className="inline-block px-5 py-3 cta-btn bg-primary rounded-md hover:bg-hover-primary transition link-btn"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="inline-block px-5 py-3 cta-btn border border-border rounded-md hover:bg-hover-primary transition link-btn"
          >
            Go to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
