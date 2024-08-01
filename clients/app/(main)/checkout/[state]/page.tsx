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
  } from "@mantine/core";
  
  function CheckoutSection() {
    const products = [
      {
        name: "Orico USB Hub Nhôm Siêu Tốc Độ Cao 10Gbp...",
        type: "Usb-a + Loại C (10...)",
        price: 520000,
        quantity: 1,
        subtotal: 520000,
        shippingCost: 17000,
        discount: 11000,
        total: 526500,
      },
      {
          name: "Orico USB Hub Nhôm Siêu Tốc Độ Cao 10Gbp...",
          type: "Usb-a + Loại C (10...)",
          price: 520000,
          quantity: 1,
          subtotal: 520000,
          shippingCost: 17000,
          discount: 11000,
          total: 526500,
        },
    ];
  
    const rows = products.map((product, index) => (
      <Table.Tr key={index}>
        <Table.Td>
          <Text w={500}>{product.name}</Text>
          <Text size="xs" c="dimmed">
            Loại: {product.type}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text>₫{product.price.toLocaleString()}</Text>
        </Table.Td>
        <Table.Td>
          <Text>{product.quantity}</Text>
        </Table.Td>
        <Table.Td>
          <Text>₫{product.subtotal.toLocaleString()}</Text>
        </Table.Td>
      </Table.Tr>
    ));
  
    const totalCost = products.reduce(
      (total, product) => total + product.total,
      0
    );
    const totalShippingCost = products.reduce(
      (total, product) => total + product.shippingCost,
      0
    );
  
    const totalProducts = products.reduce(
      (total, product) => total + product.quantity,
      0
    );
  
    return (
      <Box>
        <Card shadow="sm" p="lg" radius="md">
          <Text size="sm" w={500}>
            Sản phẩm
          </Text>
          <Divider my="sm" />
          <Table>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          <Group>
          <Badge color="pink" variant="light">
            Giảm ₫11.000 - Voucher của Shop
          </Badge>
          
          <Button variant="subtle" size="xs">
            Chọn Voucher Khác
          </Button>
          </Group>
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
  
        <Card shadow="sm" p="lg" radius="md" mt="md">
          <Text size="lg" w={500}>
            Tổng số tiền ({totalProducts} sản phẩm): ₫{totalCost.toLocaleString()}
          </Text>
        </Card>
      </Box>
    );
  }
  
  export default function CheckoutPage() {
    const address = {
      name: "Trần Hà Tuấn Kiệt",
      phone: "(+84) 355749742",
      address: "Tầng 5, Tòa Nhà Pijico, Số 186, Điện Biên Phủ, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh",
  
    }
    return (
      <Box p="xl">
        <Card shadow="sm" p="lg" radius="md" mb="md">
          <Title order={4}>Địa Chỉ Nhận Hàng</Title>
          <Group justify="space-between">
            <Text> {address.name} {address.phone}</Text>
            <Text>
              {address.address}
            </Text>
            <Button variant="subtle" size="xs">
              Thay Đổi
            </Button>
          </Group>
        </Card>
        <CheckoutSection />
      </Box>
    );
  }
  