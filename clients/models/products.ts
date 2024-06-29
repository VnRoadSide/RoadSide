import { ReactNode, ElementType } from "react";
import { Vouchers } from "./orders";

export interface Product {
  image: string | undefined;
  newPrice: ReactNode;
  quantity: React.ComponentPropsWithoutRef<ElementType>;
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
  label: string;
  description?: string;
  icon?: string;
  link?: string;
  children?: Category[];
}

export interface Price {
  id: number;
  unitPrice: number;
  product: Product;
  startDate: Date | string;
  endDate: Date | string;
}
