import { User } from "@/lib/auth";
import { Vouchers } from "./orders";

export interface Product {
  id?: string;
  name: string;
  imageUrl?: string;
  description?: string;
  baseUnitPrice: number;
  unit: string;
  dateCreated?: Date | string;
  dateModified?: Date | string;
  category: Category | null;
  vendor: User | null;
  vouchers: Vouchers[];
  sale?: number;
  rate?: number;
  discountedPrice?: number;
  availability: Availability;
  InstockQuantity: number;
}

export enum Availability {
  InStock,
  LowStock,
  OutOfStock,
  PreOrder,
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  url?: string;
  categories?: Category[];
}

export interface Price {
  id: number;
  unitPrice: number;
  product: Product;
  startDate: Date | string;
  endDate: Date | string;
}
