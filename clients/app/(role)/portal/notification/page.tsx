
import { environment } from "@/environment";
import { NotificationView } from "../../_components";

export default async function NotificationPage() {
  const data = await getData();
  return <NotificationView {...data} />
}

async function getData() {
  const notification = await fetch(
    `${environment.appUrl}/api/notification`
  )
    .then((r) => r.json())
    .catch((err) => console.error(err));

  return {
      ...notification
  };
};
