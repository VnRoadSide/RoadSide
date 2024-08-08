import { ProductManagement } from "./product";
import { useApi } from "@/lib/hooks";
import { Product } from "@/models";

export default async function Page() {
  const {products} = await getData();
  return <ProductManagement products={products}/>;
}

async function getData() {
  const { get } = useApi();

  const { data: products, error: productError } = await get<Product[]>(
    "/products"
  );
  if (productError) {
    console.error("Error: ", productError);
  }

  return {
      products: products ?? [],
  };
}
