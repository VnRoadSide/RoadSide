import useCart from "@/utils/useCart";
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
} from "@mantine/core";
import {
  IconMoon,
  IconShoppingCart,
  IconSun,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { FuzzySearch } from "./Search";

export function NavBar() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [{ counter, isClient }, setValue] = useCart();
  const [isPortal, setIsPortal] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // if /portal in url by using nextjs router
    if (typeof window !== "undefined") {
      setIsPortal(router.asPath.includes("/portal"));
    }
  });

  return (
    <Paper shadow="sm" variant="gradient">
      <Container fluid>
        <Group component="nav" justify="space-between" h="60" px="sm">
          <Group gap={4}>
            <Anchor href="/" underline="never">
              <Group gap={4} align="end">
                <Image src={"logo.png"} alt="logo" h={35} />
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
            <Menu shadow="md" width={200}>
              <Menu.Target>
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
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item component={Link} href="/me">
                  Thông tin tài khoản
                </Menu.Item>
                <Menu.Item component={Link} href="/portal">
                  Kênh người bán
                </Menu.Item>
                <Menu.Item component={Link} href="/me/notification">
                  Thông báo
                </Menu.Item>
                <Menu.Item component={Link} href="/logout">
                  Đăng xuất
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

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
