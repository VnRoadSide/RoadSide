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
} from "@mantine/core";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

function OrderPart({ order }: { order: Order }) {
  const rows = order.items.map((item, index) => {
    const price = item.product.discountedPrice ?? item.product.baseUnitPrice;
    const subtotal = item.quantity * price;
    return (
      <TableTr key={index}>
        <TableTd>
          <Text w={500}>{item.product.name}</Text>
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
      </TableTr>
    );
  });
  return (
    <>
      <Table>
        <TableTbody>{rows}</TableTbody>
      </Table>
      {rows.length > 0 && (
        <Group>
          <Badge color="pink" variant="light">
            Giảm ₫11.000 - Voucher của Shop
          </Badge>

          <Button variant="subtle" size="xs">
            Chọn Voucher Khác
          </Button>
        </Group>
      )}
    </>
  );
}

function CheckoutSection({ orders }: { orders: Order[] }) {
  const totalShippingCost = 0;
  return (
    <Box>
      <Card shadow="sm" p="lg" radius="md">
        <Text size="sm" w={500}>
          Sản phẩm
        </Text>
        <Divider my="sm" />
        {orders.map((order) => (
          <OrderPart key={order.id} order={order} />
        ))}
      </Card>

      <Card shadow="sm" p="lg" radius="md" mt="md">
        <Text size="sm" w={500}>
          Vận chuyển
        </Text>
        <Divider my="sm" />
        <Text>Vận Chuyển Nhanh - ₫{totalShippingCost.toLocaleString()}</Text>
        <Text size="xs">Dự kiến nhận hàng từ 26 Tháng 7 - 31 Tháng 7</Text>
      </Card>

      <Card shadow="sm" p="lg" radius="md" mt="md">
        <TextInput label="Lời nhắn:" placeholder="Lưu ý cho Người bán..." />
      </Card>
    </Box>
  );
}

export function CheckoutView({
  session,
  orders,
  checkoutSessionId
}: {
  session: Session | null;
  orders: Order[];
  checkoutSessionId: string
}) {
  const address = {
    name: "Trần Hà Tuấn Kiệt",
    phone: "(+84) 355749742",
    address:
      "Tầng 5, Tòa Nhà Pijico, Số 186, Điện Biên Phủ, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh",
  };
  const router = useRouter();

  const totalCost = orders.reduce(
    (total, order) => total + order.totalPrice,
    0
  );

  const totalProducts = orders.reduce(
    (total, order) =>
      total + order.items.reduce((total, item) => total + item.quantity, 0),
    0
  );


  const handleConfirm = async () => {
    console.log("handleConfirm");
    const result = await proceedCheckout(checkoutSessionId);
    console.log("result", result);
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
          <Button variant="subtle" size="xs">
            Thay Đổi
          </Button>
        </Group>
      </Card>

      <CheckoutSection orders={orders} />

      <Card shadow="sm" p="lg" radius="md" mt="md">
        <Group justify="space-between">
          <Text size="lg" w={500}>
            Tổng số tiền ({totalProducts} sản phẩm): ₫
            {totalCost.toLocaleString()}
          </Text>
          <Button variant="outline" onClick={handleConfirm}>Thanh toán</Button>
        </Group>
      </Card>
    </Box>
  );
}
