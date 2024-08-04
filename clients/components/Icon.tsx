import dynamic from "next/dynamic";

export function DynamicIcon({ icon }: { icon?: string }) {
  if (!icon) return null;

  const Icon = dynamic(
    () => import(`@tabler/icons-react/dist/esm/icons/${icon}.mjs`),
    {
      loading: () => <p>Loading...</p>,
    }
  );

  return <Icon />;
}
