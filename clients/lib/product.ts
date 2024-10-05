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
export async function deleteProduct(id: string | undefined) {
  console.log("id", id);
  const { delete: del } = useApi();

  if (!id) {
    console.log("no id");
    return;
  }
  const { data, error } = await del(`/portal/products?id=${id}`);
  console.log(error);
  return data;
}
