import { Vouchers } from "./orders";

export interface Product {
  id: number;
  name: string;
  imageUrl?: string;
  description?: string;
  baseUnitPrice: number;
  unit: string;
  dateCreated: Date | string;
  dateModified: Date | string;
  category: Category;
  vendor: string;
  vouchers: Vouchers[];
  sale?: number;
  rate?: number;
  discountedPrice?: number;
}

export interface Category {
  id?: number;
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
