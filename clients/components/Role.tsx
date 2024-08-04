"use client";
import { Url } from "@/models/routing";
import {
  Anchor,
  Breadcrumbs,
  Group,
  NavLink,
  Paper,
  Stack,
  rem,
} from "@mantine/core";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function NavigationSection({ urls }: { urls: Url[] }) {
  return (
    <Stack gap={0}>
      {urls.map((url, index) => (
        <NavLink key={index} href={url.href} label={url.label} />
      ))}
    </Stack>
  );
}

export function RoleView({
  children,
  urls = [],
}: {
  children: ReactNode;
  urls?: Url[];
}) {
  const pathname = usePathname();
  const nav: Url[] = [
    { label: "Trang chủ", href: "/" },
    ...urls.filter((item) => item.href === pathname),
  ];
  return (
    <Stack p="xl">
      <Breadcrumbs>
        {nav.map((item, index) => (
          <Anchor href={item.href} key={index}>
            {item.label}
          </Anchor>
        ))}
      </Breadcrumbs>
      <Group wrap="nowrap" align="start">
        <Paper
          radius="md"
          p="xs"
          w="15rem"
          shadow="lg"
          style={{ position: "sticky", top: rem(100), left: 0 }}
        >
          <NavigationSection urls={urls} />
        </Paper>
        <Paper radius="md" p="xs" shadow="lg" style={{ width: "100%" }}>
          {children}
        </Paper>
      </Group>
    </Stack>
  );
}
