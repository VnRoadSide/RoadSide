import { Product } from "@/models";
import { formatNumber } from "@/utils";
import {
  Card,
  Group,
  Badge,
  Button,
  Image,
  Text,
  Container,
  Space,
  Box,
  Stack,
} from "@mantine/core";
export function ProductCard({ product }: { product: Product }) {
  const saleoff = !product.discountedPrice
    ? 0
    : Math.round((1 - product.discountedPrice / product.baseUnitPrice) * 100);
  return (
    <Card withBorder radius="md" padding="xs" miw="12rem" shadow="none">
      <Card.Section>
        <Image
          src={product.imageUrl ?? "https://i.imgur.com/ZL52Q2D.png"}
          alt={product.name}
          height={120}
        />
      </Card.Section>

      <Card.Section px="sm" pt="sm">
        <Group gap="md" justify="space-between">
          <Text fw={500}>{product.name ?? "Title"}</Text>
          <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
            {product.unit ?? "Unit"}
          </Text>
        </Group>
        <Text fz="xs" c="dimmed">
          {product.description ?? "Description"}
        </Text>
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
                {product.baseUnitPrice}
              </Text>
            )}
          </Stack>
          {product.discountedPrice && (
            <Badge variant="outline">Giảm {saleoff}%</Badge>
          )}
        </Group>
      </Card.Section>

      <Button radius="xl" fullWidth>
        Mua
      </Button>
    </Card>
  );
}
