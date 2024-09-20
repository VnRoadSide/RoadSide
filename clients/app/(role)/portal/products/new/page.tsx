import { useApi } from "@/lib/hooks";
import { AddProductView } from "./new";
import { Category } from "@/models";

export default async function Page() {
    const {categories} = await getData();
    return <AddProductView categories={[]} />;
}

async function getData() {
    const { get } = useApi();
  
    const { data: categories, error: categoryError } = await get<Category[]>(
      "/products/category?flatten=false"
    );
    if (categories) {
      console.error("Error: ", categoryError);
    }
  
    return {
        categories: categories ?? [],
    };
  }