// components/FetchWrapper.tsx
import ZustandProvider from "@/components/ZustandProvider";
import { Product } from "@/interfaces/interface";

const FetchWrapper = async ({ children }: React.PropsWithChildren) => {
  let data: Product[] = []; // ← Tambah ini

  try {
    // ← Tambah try
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 2592000 },
      signal: AbortSignal.timeout(10000),
    });

    if (res.ok) {
      // ← Ubah dari throw error jadi check res.ok
      const results: Product[] = await res.json();
      data = results.map((item) => ({ ...item, quantity: 10 }));
    } else {
      console.error("Failed to fetch products:", res.status); // ← Log error
    }
  } catch (error) {
    // ← Tambah catch
    console.error("Fetch error:", error); // ← Log error
  }

  return <ZustandProvider initialdata={data}>{children}</ZustandProvider>;
};

export default FetchWrapper;
