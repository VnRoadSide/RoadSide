import { environment } from "@/environment";
import { Marketing } from "./marketing";

export default async function Page() {
  const {marketing} = await getData();
  return <Marketing marketing={marketing} />;
}

async function getData() {
  const data = await fetch(`${environment.appUrl}/api/marketing`)
    .then((r) => r.json())
    .catch((err) => console.error(err));

  return {
    marketing: data ?? [],
  };
}
