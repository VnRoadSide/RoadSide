import { environment } from "@/environment";
import { OrderView } from "./order";

export default async function Page() {
  const {orders} = await getData();
  return <OrderView orders={orders} />;
}

async function getData() {
  const data = await fetch(`${environment.appUrl}/api/orders`)
    .then((r) => r.json())
    .catch((err) => console.error(err));

  return {
    orders: data ?? [],
  };
}
