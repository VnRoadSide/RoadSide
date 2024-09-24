import { Product } from "@/models";
import { useApi } from "./hooks";

export async function addProduct(product: Product) {
  const { post } = useApi();
  const { data, error } = await post<Product>("/products", product);
  return data;
}