import { OrderView } from "./order";
import { Orders} from "@/models";
import { useApi } from "@/lib/hooks";

export default async function Page() {
  const {orders} = await getData();
  return <OrderView orders={orders} />;
}

async function getData() {
  const { get } = useApi();
  const {data: orders, error: OrderError} = await get<Orders[]>("/orders?page=1&pageSize=10");

  if (OrderError) {
    console.error("Error: ", OrderError);
  }

  return {
    orders: orders ?? [],
  };
}
