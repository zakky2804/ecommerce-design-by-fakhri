export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  rating: Rating;
  image: string;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface Order {
  id: string;
  fullName: string;
  email: string;
  phone: number;
  country: string;
  city: string;
  state: string;
  zibCode: string;
  products: Product[];
  total?: number;

  date?: string;
  status?: "Pending" | "Canceled" | "Complete";
  method?: "COD" | "REGULER" | "EXPRESS";
}

export interface FormOrder {
  id: string;
  fullName: string;
  email: string;
  phone: number;
  country: string;
  city: string;
  state: string;
  zibCode: string;
  method: "COD" | "REGULER" | "EXPRESS";
}
