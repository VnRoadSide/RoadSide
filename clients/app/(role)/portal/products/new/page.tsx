import { useApi } from "@/lib/hooks";
import { AddProductView } from "./new";
import { Category, Vouchers } from "@/models";
import { auth } from "@/auth";
import { Session } from "next-auth";

export default async function Page() {
  const session = await auth();
  const { categories, vouchers } = await getData(session);
  if (!categories) {
    return null;
  }
  return <AddProductView categories={categories} vouchers={vouchers} session={session} />;
}

async function getData(session: Session | null) {
  const { get } = useApi(session);

  const { data: categories, error: categoryError } = await get<Category[]>(
    "/category?flatten=false"
  );
  
  const { data: vouchers, error: voucherError } = await get<Vouchers[]>(
    "/voucher"
  )

  return {
    categories: categories ?? [],
    vouchers: vouchers ?? [],
  };
}
