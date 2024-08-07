import { Product } from "@/models";
import { useApi } from "./hooks";

export interface OrderItem {
  id: number;
  quantity: number;
  dateCreated: Date | string;
  product: Product;
  selected?: boolean;
}

export interface Order {
  id: string;
  items?: OrderItem[];
  totalPrice: number;
}

async function CreateCheckoutSession(order: Order) {
  const { post } = useApi();
  const { data } = await post("/orders", order);
}