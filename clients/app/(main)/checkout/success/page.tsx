import { environment } from "@/environment";
import { Title, Button, Container, Text, Stack } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";

export default async function CheckoutSuccess() {
  const { total } = await getData();
  return (
    <Stack align="stretch" justify="center" py="lg">
      <Container>
        <IconCircleCheck size={100} color="green" />
      </Container>
      <Container>
        <Title>Thanh toán thành công</Title>
      </Container>
      <Container>
        <Title>{total.toLocaleString()} đ</Title>
      </Container>
      <Container>
        <Text fw={500} fz="lg">
          Đơn hàng của bạn đang được xử lý
        </Text>
      </Container>
      <Container>
        <Text fz="sm" c="dimmed">
          Để không bỏ lỡ các khuyến mãi sắp tới, hãy bật thông báo cũng như nhấn
          yêu thích của những cửa hàng mà bạn thích!
        </Text>
      </Container>
      <Container>
        <Button variant="gradient" size="xl" component={Link} href={"/"}>
          Quay lại trang chủ
        </Button>
      </Container>
    </Stack>
  );
}
async function getData() {
  const total = await fetch(`${environment.appUrl}/api/checkout/success`)
    .then((r) => r.json())
    .catch((err) => console.error(err));

  return total;
}
