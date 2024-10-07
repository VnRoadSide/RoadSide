
import { Product } from "@/models";
import { useApi } from "./hooks";
import { auth } from "@/auth";
import { Session } from "next-auth";

export async function addProduct(product: Product, session: Session | null) {
  const { post } = useApi(session);
  const { data, error } = await post<Product>("/products", product);
  return data;
}
export async function deleteProduct(id: string | undefined) {
  const session = await auth();
  const { delete: del } = useApi(session);

  if (!id) {
    console.log("no id");
    return;
  }
  const { data, error } = await del(`/portal/products?id=${id}`);
  console.log(error);
  return data;
}
