"use server"
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
  items: OrderItem[];
  totalPrice: number;
}

export async function createCheckoutSession(items: OrderItem[]) {
  const { post } = useApi();
  const { data, error } = await post<string>("/orders/checkout", items);
  console.log(data, error)
  return data;
}

export async function getCheckoutSession(sessionId: string) {
  const { get } = useApi();
  const { data } = await get<Order[]>(`/orders/checkout/${sessionId}`);
  return data;
} 

export async function proceedCheckout(sessionId: string) {
  const { post } = useApi();
  const { data } = await post<{success: boolean}>(`/orders/${sessionId}`);
  return data
}