import { Product } from "@/interfaces/interface";
import CartCard from "./CartCard";

const ListCarts = ({ products }: { products: Product[] }) => {
  const totalPrice = products.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <section className="p-4 rounded-md bg-secondary w-full sm:w-[360px] flex flex-col justify-between max-h-[500px]">
      <div className="flex-1 flex flex-col min-h-0">
        <h2 className="mb-2"> List Items </h2>
        <div className="flex-1 min-h-0 overflow-y-auto">
          {products.map((product) => (
            <CartCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="font-semibold flex justify-between border-t border-border pb-3 pt-4">
        <p className=""> Total :</p> <p className=""> ${totalPrice} </p>
      </div>
    </section>
  );
};

export default ListCarts;
