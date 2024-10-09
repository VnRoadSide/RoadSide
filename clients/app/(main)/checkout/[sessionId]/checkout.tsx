"use client";
import { Order, OrderItem, proceedCheckout } from "@/lib/checkout";
import {
  Card,
  Table,
  Text,
  Button,
  TextInput,
  Badge,
  Divider,
  Box,
  Title,
  Group,
  TableTd,
  TableTr,
  TableTbody,
  Flex,
  rem,
  em,
} from "@mantine/core";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

function OrderPart({ order }: { order: Order }) {
  const rows = order.items.map((item, index) => {
    const price = item.product.discountedPrice ?? item.product.baseUnitPrice;
    const subtotal = item.quantity * price;
    return (
      <>
        <TableTr key={index}>
          <TableTd>
            <Group w={500}>
              <Text>{item.product.name}</Text>{" "}
              {item.product.discountedPrice && (
                <Badge color="pink" variant="light">
                  Giảm ₫
                  {(
                    item.product.baseUnitPrice - item.product.discountedPrice
                  ).toLocaleString()}{" "}
                  - Voucher của Shop
                </Badge>
              )}
            </Group>
            <Text size="xs" c="dimmed">
              Loại: {item.product.name}
            </Text>
          </TableTd>

          <TableTd>
            <Text>₫{price.toLocaleString()}</Text>
          </TableTd>
          <TableTd>
            <Text>{item.quantity}</Text>
          </TableTd>
          <TableTd>
            <Text>₫{subtotal.toLocaleString()}</Text>
          </TableTd>
          <TableTd>
            <Text>Hình thức thanh toán: COD</Text>
          </TableTd>
        </TableTr>
      </>
    );
  });
  return (
    <Table>
      <TableTbody>{rows}</TableTbody>
    </Table>
  );
}

function CheckoutSection({ order }: { order: Order }) {
  const totalShippingCost = 0;
  return (
    <Box>
      <Card shadow="sm" p="lg" radius="md">
        <Text size="sm" w={500}>
          Sản phẩm
        </Text>
        <Divider my="sm" />
        {order &&<OrderPart key={order.id} order={order} />}
      </Card>

      <Card shadow="sm" p="lg" radius="md" mt="md">
        <Text size="sm" w={500}>
          Vận chuyển
        </Text>
        <Divider my="sm" />
        <Text>Vận Chuyển Nhanh - ₫{totalShippingCost.toLocaleString()}</Text>
        <Text size="xs">Dự kiến nhận hàng trong 4 giờ kể từ lúc đặt hàng</Text>
      </Card>
    </Box>
  );
}

export function CheckoutView({
  session,
  order,
  checkoutSessionId,
}: {
  session: Session | null;
  order: Order;
  checkoutSessionId: string;
}) {
  const address = {
    name: "Alice Smith",
    phone: "(+84) 017012929",
    address:
      "32 đường số 2, Khu dân cư Kim Sơn, Tân Phong, Quận 7, Hồ Chí Minh",
  };
  const router = useRouter();

  const handleConfirm = async () => {
    const result = await proceedCheckout(checkoutSessionId);
    if (result?.success) {
      router.push("/checkout/success");
    } else {
      router.push("/checkout/fail");
    }
  };

  return (
    <Box p="xl">
      <Card shadow="sm" p="lg" radius="md" mb="md">
        <Title order={4}>Địa Chỉ Nhận Hàng</Title>
        <Group justify="space-between">
          <Text>
            {" "}
            {address.name} {address.phone}
          </Text>
          <Text>{address.address}</Text>
        </Group>
      </Card>

      <CheckoutSection order={order} />

      <Card shadow="sm" p="lg" radius="md" mt="md">
        <Group justify="space-between">
          <Text size="lg" w={500}>
            Tổng số tiền ({order?.items.length ?? 0} sản phẩm): ₫
            {(order.totalPrice ?? 0).toLocaleString()}
          </Text>
          <Button variant="outline" onClick={handleConfirm}>
            Đặt hàng
          </Button>
        </Group>
      </Card>
    </Box>
  );
}
