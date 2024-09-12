import { Product } from "@/models";
import ProductView from "./product";
import { useApi } from "@/lib/hooks";

async function getData(id: string) {
    const { get } = useApi();
    const { data, error } = await get<Product>(`/detail/${id}`);
    console.log(data)
    return data;
}

export default async function ProductPage({
  searchParams,
}: {
  searchParams: { id: string | undefined };
}) {
  const { id } = searchParams;
  if (!id) {
    return null;
  }
  const product = await getData(id);
  if (!product) {
    return null;
  }
  return <ProductView product={product} />;
}
