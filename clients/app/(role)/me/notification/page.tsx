import { NotificationView } from "@/components/Notification";
import { environment } from "@/environment";
import { useApi } from "@/lib/hooks";
import { PagingResult } from "@/models";

export default async function Page() {
  const data = await getData();
  return <NotificationView {...data} />;
}

async function getData() {
  const { get } = useApi();
  const { data, error } = await get<PagingResult<Notification>>("/notification");
  const notification = await fetch(`${environment.appUrl}/api/notification`)
    .then((r) => r.json())
    .catch((err) => console.error(err));

  return {
    ...notification,
  };
}
