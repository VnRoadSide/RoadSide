import { Product } from "./products";

export enum OrderStatus {
  Pending = 0,
  InStock = 1,
  OnTheWay = 2,
  Delivered = 3,
  Cancelled = 4,
  Refunded = 5
}

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
