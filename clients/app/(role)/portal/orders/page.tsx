import { environment } from "@/environment";
import { OrderView } from "./order";
import { useApi } from "@/lib/hooks";
import { OrderItem, Orders } from "@/models";
import { auth } from "@/auth";


export default async function Page() {
  const {orders} = await getData();
  return <OrderView orders={orders} />;
}

async function getData() {
  const session = await auth();
  const { get } = useApi(session);
  const {data: orders, error: OrderError} = await get<Orders[]>("/orders/portal?page=1&pageSize=10");
  console.log(orders)
  if (OrderError) {
    console.error("Error: ", OrderError);
  }

  return {
    orders: orders ?? [],
  };
}
