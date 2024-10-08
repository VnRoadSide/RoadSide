
import { User } from "@/lib/auth";
import { Product } from "./products";

export enum OrderStatus {
  pending = 0,
  pickup,
  shipping,
  delivered,
  cancelled,
  refunded,
  all
}

export type OrderStatusType = keyof typeof OrderStatus;

export interface OrderItem {
  id: number;
  quantity: number;
  dateCreated: Date | string;
  product: Product;
  selected?: boolean;
  orderStatus: OrderStatus
}

export interface Orders {
  id: string;
  items: OrderItem[];
  user: User;
  totalPrice: number;
  orderStatus?: OrderStatus
  createdBy: string;
}

export interface Vouchers {
  id: string;
  code: string;
  description: string;
  discount: number;
  startDate: string;
  endDate: string;
  active: boolean;
  usageLimit: number;
}
