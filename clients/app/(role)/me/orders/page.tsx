import { OrderView } from "./order";
import { Orders } from "@/models";
import { useApi } from "@/lib/hooks";
import { auth } from "@/auth";

export default async function Page() {
  const { orders } = await getData();
  return <OrderView orders={orders} />;
}

async function getData() {
  const session = await auth();
  const { get } = useApi(session);
  const { data: orders, error: OrderError } = await get<Orders[]>(
    "/orders?page=1&pageSize=100"
  );

  if (OrderError) {
    console.error("Error: ", OrderError);
  }

  return {
    orders: orders ?? [],
  };
}
