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
  totalPrice: number;
  orderStatus?: OrderStatus
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
