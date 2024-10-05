import { environment } from "@/environment";
import { OrderView } from "./order";
import { useApi } from "@/lib/hooks";
import { OrderItem, Orders } from "@/models";


export default async function Page() {
  const {orders} = await getData();
  return <OrderView orders={orders} />;
}

async function getData() {
  const { get } = useApi();
  const {data: orders, error: OrderError} = await get<Orders[]>("/orders/portal?page=1&pageSize=10");
  console.log(orders)
  if (OrderError) {
    console.error("Error: ", OrderError);
  }

  return {
    orders: orders ?? [],
  };
}
