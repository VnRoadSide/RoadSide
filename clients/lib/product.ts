import { Product } from "@/models";
import { useApi } from "./hooks";

export function getCurrentPrice(product: Product) {
  return product.discountedPrice ?? product.baseUnitPrice;
}

export async function addProduct(product: Product) {
  const { post } = useApi();
  const { data, error } = await post<Product>("/products", product);
  return data;
}
