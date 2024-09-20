import { ProductManagement } from "./product";
import { useApi } from "@/lib/hooks";
import { PagingResult, Product } from "@/models";

export default async function Page() {
  const data = await getData();
  return <ProductManagement {...data} />;
}

async function getData() {
  const { get } = useApi();

  const { data, error } = await get<PagingResult<Product>>(
    "/portal/products"
  );
  if (error) {
    return {
      data: [],
      total: 0,
    }
  }

  return data!;
}
