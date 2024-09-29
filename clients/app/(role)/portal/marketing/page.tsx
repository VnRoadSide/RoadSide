import { environment } from "@/environment";
import { Marketing } from "./marketing";
import { fetchData } from "@/lib/fetch";

export default async function Page() {
  const {marketing} = await getData();
  return <Marketing marketing={marketing} />;
}

async function getData() {
  const data: any[] | null = await fetchData("marketing");

  return {
    marketing: data ?? [],
  };
}
