import { useApi } from "@/lib/hooks";
import { AddProductView } from "./new";
import { Category } from "@/models";
import { addProduct } from "@/lib/product";

export default async function Page() {
  const { categories } = await getData();
  if (!categories) {
    return null;
  }
  return <AddProductView categories={categories} />;
}

async function getData() {
  const { get } = useApi();

  const { data: categories, error: categoryError } = await get<Category[]>(
    "/category?flatten=false"
  );
  if (categories) {
    console.error("Error: ", categoryError);
  }
  console.log(categories);

  return {
    categories: categories ?? [],
  };
}
