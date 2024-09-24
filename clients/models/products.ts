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
  brand?: string;
  origin?: string;
  quantity: 0,
  shippingProvider: "",
  deliveryTime: "",
  shippingFee: 0,
  preOrder: false,
  returnPolicy: "",
  additionalNotes: "",
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
