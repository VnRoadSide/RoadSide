import { auth } from "@/auth";
import { NotificationView } from "@/components/Notification";
import { useApi } from "@/lib/hooks";
import { Notification, PagingResult } from "@/models";

export default async function Page() {
  const data = await getData();
  if (!data) return <NotificationView data={[]} total={0} />;
  return <NotificationView {...data} />;
}

async function getData() {
  const session = await auth();
  const { get } = useApi(session);
  const { data, error } = await get<PagingResult<Notification>>("/notification");
  
  if (error) {
    console.error("Error: ", error);
  }
  return data;
}
