import { auth } from "@/auth";
import { useApi } from "@/lib/hooks";
import { PagingResult, Vouchers } from "@/models";
import { VoucherView } from "./voucher";

export default async function Page() {
  const data = await getData();
  if (!data) return <VoucherView data={[]}/>;
  return <VoucherView data={data}/>;
}

async function getData() {
  const session = await auth();
  const { get } = useApi(session);
  const { data, error } = await get<Vouchers[]>(`/voucher`);
  
  if (error) {
    console.error("Error: ", error);
  }
  return data;
}
