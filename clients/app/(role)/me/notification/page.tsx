import { NotificationView } from "@/components/Notification";
import { environment } from "@/environment";

export default async function Page() {
  const data = await getData();
  return <NotificationView {...data} />;
}

async function getData() {
  const notification = await fetch(`${environment.appUrl}/api/notification`)
    .then((r) => r.json())
    .catch((err) => console.error(err));

  return {
    ...notification,
  };
}
