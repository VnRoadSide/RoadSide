import { auth } from "@/auth";
import { ProductManagement } from "./product";
import { useApi } from "@/lib/hooks";
import { PagingResult, Product } from "@/models";
import { Session } from "next-auth";

export default async function Page() {
  const session = await auth();
  const data = await getData(session);
  return <ProductManagement {...data} session={session} />;
}

async function getData(session: Session | null) {
  const { get } = useApi(session);

  const { data, error } = await get<PagingResult<Product>>(
    "/portal/products"
  );
  if (!data) {
    return {
      data: [],
      total: 0,
    }
  }

  return data;
}
