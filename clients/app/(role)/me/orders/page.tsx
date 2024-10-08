import { OrderView } from "./order";
import { useApi } from "@/lib/hooks";
import { Orders, OrderStatus, OrderStatusType } from "@/models";
import { auth } from "@/auth";
import { Session } from "next-auth";

export type Query = { status?: OrderStatusType , page?: number, pageSize?: number };

export default async function Page({
  searchParams
}: {
  searchParams: Query;
}) {  
  const session = await auth();
  const {orders} = await getData(searchParams, session);

  return <OrderView orders={orders} {...searchParams} />;
}

async function getData(query: Query, session: Session | null) {
  const { get } = useApi(session);
  const param = [
    query.page ? `page=${query.page}` : null,
    query.pageSize ? `pageSize=${query.pageSize}` : null,
    query.status && query.status !== "all" ? `status=${OrderStatus[query.status]}` : null
  ].filter(Boolean).join("&");
  console.log("param", query, param);

  const {data: orders, error: OrderError} = await get<Orders[]>(`/orders${param == "" ? "" : "?" + param}`);
  if (OrderError) {
    console.error("Error: ", OrderError);
  }

  return {
    orders: orders ?? [],
  };
}
