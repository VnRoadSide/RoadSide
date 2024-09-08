import { Product } from "@/models";
import ProductView from "./product";
import { useApi } from "@/lib/hooks";

async function getData(id: string): Promise<Product> {
    const { get } = useApi();
    const { data, error } = await get(`/detail/${id}`);
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
  return <ProductView product={product} />;
}
