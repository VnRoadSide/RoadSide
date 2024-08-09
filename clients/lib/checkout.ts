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

export async function CreateCheckoutSession(items: OrderItem[]) {
  const { post } = useApi();
  const { data } = await post<string>("/checkout", items);
  return data;
}

export async function GetCheckoutSession(sessionId: string) {
  const { get } = useApi();
  const { data } = await get<Order[]>(`/checkout/${sessionId}`);
  return data;
}