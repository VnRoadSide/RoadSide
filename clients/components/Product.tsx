"use client";
import { OrderItem, Product } from "@/models";
import { formatNumber } from "@/lib/hooks";
import useCart from "@/lib/hooks/useCart";
import {
  Card,
  Group,
  Badge,
  Button,
  Image,
  Text,
  Stack,
  CardSection,
} from "@mantine/core";
import Link from "next/link";
export function ProductCard({ product }: { product: Product }) {
  const [{items, session}, setValue] = useCart();

  function onAddToCart() {
    const idx = items.findIndex((p) => p.product.id === product.id);
    if (idx !== -1) {
      const newValue = [...items];
      newValue[idx].quantity += 1;
      setValue({
        items: newValue,
        session
      });
    } else {
      
      setValue({
        items: [...items, { id: items.length, quantity: 1, product } as OrderItem],
        session
      });
    }
  }
  
  const saleoff = !product.discountedPrice
    ? 0
    : Math.round((1 - product.discountedPrice / product.baseUnitPrice) * 100);
  return (
    <Card withBorder radius="md" padding="xs" miw="12rem" shadow="none">
      <CardSection component={Link} href={`/product?id=${product.id}`}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          height={120}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </CardSection>

      <CardSection px="sm" pt="sm">
        <Group gap="md" justify="space-between">
          <Text fw={500}>{product.name ?? "Title"}</Text>
          <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
            {product.unit ?? "Unit"}
          </Text>
        </Group>
        <Group gap="md" justify="space-between">
        <Text fz="xs" c="dimmed">
          {product.description ?? "Description"}
        </Text>
        <Badge variant="outline">{product.vendor?.fullName}</Badge>
        </Group>
        <Group gap="md" justify="space-between" align="center">
          <Stack justify="center" h={"3em"} gap={"0"}>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }} component="span">
              {product.discountedPrice
                ? formatNumber(product.discountedPrice)
                : formatNumber(product.baseUnitPrice)}
            </Text>
            {product.discountedPrice && (
              <Text
                fz="sm"
                c="dimmed"
                fw={500}
                style={{ lineHeight: 1 }}
                td="line-through"
              >
                {formatNumber(product.baseUnitPrice)}
              </Text>
            )}
          </Stack>
          {product.discountedPrice && (
            <Badge variant="outline">Giảm {saleoff}%</Badge>
          )}
        </Group>
      </CardSection>

      <Button radius="xl" fullWidth onClick={onAddToCart}>
        Mua
      </Button>
    </Card>
  );
}
