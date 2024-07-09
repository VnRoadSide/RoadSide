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
  useComputedColorScheme,
  Button,
  Indicator,
} from "@mantine/core";
import { IconMoon, IconShoppingCart, IconSun } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { FuzzySearch } from "./Search";

export function NavBar() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [{ counter, isClient }, setValue] = useCart();

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
            <Anchor href="/faq" underline="never" p="sm">
              FAQ
            </Anchor>
            <Anchor href="/contact" underline="never" p="sm">
              Contact
            </Anchor>
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
