"use client";
import { signOut } from "next-auth/react"
import useCart from "@/lib/hooks/useCart";
import {
  Group,
  Image,
  Paper,
  Text,
  Anchor,
  Container,
  ActionIcon,
  useMantineColorScheme,
  Indicator,
  Menu,
  MenuTarget,
  MenuDropdown,
  MenuItem,
} from "@mantine/core";
import {
  IconMoon,
  IconShoppingCart,
  IconSun,
  IconUserCircle,
} from "@tabler/icons-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCounter } from "@mantine/hooks";

export default function NavBar({
  session,
}: {
  session?: Session | null;
}) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [{ counter, isClient }] = useCart();
  const [isPortal, setIsPortal] = useState(false);
  const pathname = usePathname() ?? "";
  useEffect(() => {
    // if /portal in url by using nextjs router
    setIsPortal(pathname.includes("/portal"));
  });

  return (
    <Paper shadow="sm" variant="gradient">
      <Container fluid>
        <Group component="nav" justify="space-between" h="60" px="sm">
          <Group gap={4}>
            <Anchor href="/" underline="never">
              <Group gap={4} align="end">
                <Image src={"/asset/logo.png"} alt="logo" h={35} fetchPriority="high" />
                <Text variant="gradient" fw={900} size="1.8rem">
                  {"RoadSide"}
                </Text>
              </Group>
            </Anchor>
            {/* <FuzzySearch/> */}
          </Group>

          <Group gap={0} align="center">
            {!isPortal && (
              <ActionIcon
                variant="transparent"
                size="xl"
                p="xs"
                aria-label="Cart"
                component={Link}
                href="/cart"
              >
                <Indicator inline label={counter}>
                  <IconShoppingCart stroke={1.5} />
                </Indicator>
              </ActionIcon>
            )}
            {!!session ? (
              <Menu shadow="md" width={200}>
                <MenuTarget>
                  <ActionIcon
                    variant="transparent"
                    size="xl"
                    p="xs"
                    aria-label="Me"
                  >
                    <Indicator inline label={counter}>
                      <IconUserCircle stroke={1.5} />
                    </Indicator>
                  </ActionIcon>
                </MenuTarget>
                <MenuDropdown>
                  <MenuItem component={Link} href="/me">
                    Tài khoản của tôi
                  </MenuItem>
                  <MenuItem component={Link} href="/portal">
                    Kênh người bán
                  </MenuItem>
                  <MenuItem component={Link} href="/me/orders">
                    Đơn mua
                  </MenuItem>
                  <MenuItem component={Link} href="/logout">
                    Đăng xuất
                  </MenuItem>
                </MenuDropdown>
              </Menu>
            ) : (
              <ActionIcon
                variant="transparent"
                c="dimmed"
                size="xl"
                p="xs"
                aria-label="Me"
                component={Link}
                href="/login"
              >
                <IconUserCircle stroke={1.5} />
              </ActionIcon>
            )}

            {isClient && (
              <ActionIcon
                onClick={() =>
                  setColorScheme(colorScheme === "light" ? "dark" : "light")
                }
                variant="transparent"
                size="xl"
                aria-label="Toggle color scheme"
              >
                {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
              </ActionIcon>
            )}
          </Group>
        </Group>
      </Container>
    </Paper>
  );
}
