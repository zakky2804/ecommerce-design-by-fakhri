import ZustandProvider from "@/components/ZustandProvider";
import { Product } from "@/interfaces/interface";

const FetchWrapper = async ({ children }: React.PropsWithChildren) => {
  const res = await fetch("https://fakestoreapi.com/products", {
    // next: { revalidate: 2_592_000 },
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  const results: Product[] = await res.json();
  const data = results.map((item) => ({ ...item, quantity: 10 }));

  return <ZustandProvider initialdata={data}>{children}</ZustandProvider>;
};

export default FetchWrapper;
