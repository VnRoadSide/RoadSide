// product/new/page.tsx
import { useApi } from "@/lib/hooks";
import { ProductForm } from "@/components/ProductForm";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { Category, Vouchers } from "@/models";

export default async function Page() {
  const session = await auth();
  const { categories, vouchers } = await getData(session);

  if (!categories || !vouchers) {
    return null; // Handle errors or empty states accordingly
  }

  return (
    <ProductForm
      categories={categories}
      vouchers={vouchers}
      session={session}
    />
  );
}

async function getData(session: Session | null) {
  const { get } = useApi(session);

  const { data: categories, error: categoryError } = await get<Category[]>("/category?flatten=false");
  const { data: vouchers, error: voucherError } = await get<Vouchers[]>("/voucher");

  return {
    categories: categories ?? [],
    vouchers: vouchers ?? [],
  };
}
