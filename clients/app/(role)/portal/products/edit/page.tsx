// product/edit/[id]/page.tsx
import { useApi } from "@/lib/hooks";
import { ProductForm } from "@/components/ProductForm";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { Product } from "@/models";

export default async function EditProductPage({
  searchParams
}: {
  searchParams: { id: string | undefined };
}) {
  const session = await auth();
  const productId = searchParams.id; // Fetch product ID from URL

  if (!productId) {
    redirect("/portal/products");
  }

  const { product, categories, vouchers } = await getData(productId, session);

  if (!product || !categories || !vouchers) {
    return null; // Handle errors or empty states accordingly
  }

  return (
    <ProductForm
      categories={categories}
      vouchers={vouchers}
      session={session}
      initialProduct={product}
      isEdit={true} // Flag for edit mode
    />
  );
}

async function getData(id: string, session: Session | null) {
  const { get } = useApi(session);

  const { data: product, error: productError } = await get<Product>(`/detail/${id}`);
  const { data: categories, error: categoryError } = await get("/category?flatten=false");
  const { data: vouchers, error: voucherError } = await get("/voucher");

  return {
    product,
    categories: categories ?? [],
    vouchers: vouchers ?? [],
  };
}
