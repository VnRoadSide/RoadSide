import { NotificationView } from "@/components/Notification";
import { useApi } from "@/lib/hooks";
import { Notification, PagingResult } from "@/models";

export default async function Page() {
  const data = await getData();
  if (!data) return <NotificationView data={[]} total={0} />;
  return <NotificationView {...data} />;
}

async function getData() {
  const { get } = useApi();
  const { data, error } = await get<PagingResult<Notification>>("/notification");
  
  console.log(data);
  if (error) {
    console.error("Error: ", error);
  }
  return data;
}
