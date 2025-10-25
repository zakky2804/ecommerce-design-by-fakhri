import { FormOrder, Order, Product } from "@/interfaces/interface";
import { create } from "zustand";

interface UseDataStore {
  initial: boolean;
  products: Product[];
  setProduct: (p: Product[]) => void;
  getProduct: (id: string) => Product | undefined;

  addToCart: (product: Product) => boolean;
  carts: Product[];
  plusProductInCart: (id: number) => boolean;
  reduceProductInCart: (id: number) => void;
  removeProductInCart: (id: number) => void;

  orders: Order[];
  addOrder: (order: FormOrder) => void;
  removeOrder: (id: string) => void;
  getOrder: (id: string) => Order | undefined;
}

export const useDataStore = create<UseDataStore>((set, get) => ({
  initial: false,
  products: [],
  getProduct: (id) => {
    const product = get().products.find((product) => product.id === Number(id));
    return product;
  },
  setProduct: (p) => {
    set({ products: p });
    set({ initial: true });
  },
  carts: [],
  plusProductInCart: (id) => {
    const product = get().products.find((product) => product.id === id);

    if (product && product.quantity !== 0) {
      const productEdit = (cart: Product) => {
        const products = get().products.map((p) =>
          p.id !== Number(id) ? p : { ...p, quantity: p.quantity - 1 }
        );

        set({ products: products });
        return { ...cart, quantity: cart.quantity + 1 };
      };

      const carts = get().carts.map((cart) =>
        cart.id === id ? productEdit(cart) : cart
      );

      set({ carts: carts });
      return true;
    }

    return false;
  },
  reduceProductInCart: (id) => {
    const productEdit = (cart: Product) => {
      const product = get().products.map((p) =>
        p.id !== Number(id) ? p : { ...p, quantity: p.quantity + 1 }
      );
      set({ products: product });
      return { ...cart, quantity: cart.quantity - 1 };
    };

    const prevCarts = get().carts.map((cart) =>
      cart.id === id && cart.quantity !== 1 ? productEdit(cart) : cart
    );

    set({ carts: prevCarts });
  },
  removeProductInCart: (id) => {
    const checkCartId = (cart: Product) => {
      if (cart.id === id) {
        const products = get().products.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + cart.quantity }
            : product
        );

        set({ products });
        return false;
      }

      return true;
    };

    const prevCarts = get().carts.filter((cart) => checkCartId(cart));
    set({ carts: prevCarts });
  },
  addToCart: (product) => {
    const cartInput = get().carts.find((cart) => cart.id === product.id);
    const prevCarts = get().carts;

    const checkproduct = get().products.find(
      (p) => p.id === Number(product.id)
    );

    if (checkproduct && checkproduct.quantity !== 0) {
      const productEdit = get().products.map((p) =>
        p.id !== Number(product.id) ? p : { ...p, quantity: p.quantity - 1 }
      );
      set({ products: productEdit });

      if (cartInput) {
        const newCarts = prevCarts.map((cart) =>
          cart.id === cartInput.id
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart
        );
        set({ carts: newCarts });
      } else {
        set({ carts: [...prevCarts, { ...product, quantity: 1 }] });
      }

      return true;
    }

    return false;
  },

  orders: [],
  addOrder: (order) => {
    const prevOrders = get().orders;
    const total = Math.round(
      (get().products.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      ) *
        100) /
        100
    );

    set({
      orders: [
        ...prevOrders,
        {
          ...order,
          status: "Pending",
          date: Date.now().toString(),
          products: get().carts,
          total,
        },
      ],
    });
    set({ carts: [] });
  },
  getOrder: (id) => {
    const order = get().orders.find((order) => order.id === id);
    return order;
  },
  removeOrder: (id) => {
    const prevCarts = get().orders.filter((cart) => cart.id !== id);

    set({ orders: prevCarts });
  },
}));
