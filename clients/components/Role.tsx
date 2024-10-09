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
  Button,
  Flex,
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
  actionButton = null, // Accept actionButton as an optional prop
}: {
  children: ReactNode;
  urls?: Url[];
  actionButton?: ReactNode; // Action button placeholder prop
}) {
  const buildBreadcrumb = (pathname: string) => {
    const breadcrumb: { label: string; href: string }[] = [
      { label: "Trang chủ", href: "/" },
    ];
    let currentPath = "";

    // Iterate over the navigation and build the breadcrumb chain
    urls.forEach((item) => {
      if (pathname.startsWith(item.href)) {
        currentPath = item.href; // Update current path to match breadcrumb chain
        breadcrumb.push({ label: item.label, href: currentPath });
      }
    });

    return breadcrumb;
  };

  const pathname = usePathname();
  const nav: Url[] = buildBreadcrumb(pathname);

  return (
    <Stack p="lg">
      <Flex justify="space-between" align="center" >
        {/* Breadcrumb navigation */}
        <Breadcrumbs>
          {nav.map((item, index) => (
            <Anchor href={item.href} key={index}>
              {item.label}
            </Anchor>
          ))}
        </Breadcrumbs>

        {/* Placeholder for action buttons */}
        {actionButton && (
          <Group align="center">
            {actionButton}
          </Group>
        )}
      </Flex>

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

        {/* Apply scrolling to children content */}
        <Paper
          radius="md"
          pt="xs"
          shadow="lg"
          style={{
            width: "100%",
            maxHeight: "calc(100vh - 150px)", // Set max height for the content area
            overflowY: "auto", // Apply vertical scrolling
            scrollbarWidth: "none", // Hide scrollbar in Firefox
            msOverflowStyle: "none", // Hide scrollbar in Internet Explorer/Edge
          }}
        >
          {children}
        </Paper>
      </Group>
    </Stack>
  );
}
