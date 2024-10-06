import { auth } from "@/auth";
import { CheckoutView } from "./checkout";
import { Order } from "@/lib/checkout";
import { useApi } from "@/lib/hooks";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

async function getData(sessionId: string, session: Session | null) {
  const { get } = useApi(session);
  const { data, error } = await get<Order>(`/orders/checkout/${sessionId}`);
  console.log(sessionId, error, data);
  if (!data) {
    redirect(`/checkout`) // Navigate to the new post page
  }
  return data
}

export default async function CheckoutPage({ params }: { params: { sessionId: string } }) {
  const session = await auth();
  const order = await getData(params.sessionId, session);
  return (
    <CheckoutView session={session} order={order} checkoutSessionId={params.sessionId} />
  );
}
