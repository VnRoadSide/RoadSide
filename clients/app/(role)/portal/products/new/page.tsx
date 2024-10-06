import { useApi } from "@/lib/hooks";
import { AddProductView } from "./new";
import { Category } from "@/models";
import { addProduct } from "@/lib/product";
import { auth } from "@/auth";

export default async function Page() {
  const { categories } = await getData();
  if (!categories) {
    return null;
  }
  return <AddProductView categories={categories} />;
}

async function getData() {
  const session = await auth();
  const { get } = useApi(session);

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
