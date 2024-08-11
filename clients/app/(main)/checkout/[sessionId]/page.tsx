import { auth } from "@/auth";
import { CheckoutView } from "./checkout";
import { Order } from "@/lib/checkout";
import { useApi } from "@/lib/hooks";
import { redirect } from "next/navigation";

async function getData(sessionId: string) {
  const { get } = useApi();
  const { data, error } = await get<Order[]>(`/orders/checkout/${sessionId}/get`);
  console.log(sessionId, error, data);
  if (!data) {
    redirect(`/checkout`) // Navigate to the new post page
  }
  return data
}

export default async function CheckoutPage({ params }: { params: { sessionId: string } }) {
  const session = await auth();
  const orders = await getData(params.sessionId);
  return (
    <CheckoutView session={session} orders={orders} />
  );
}
