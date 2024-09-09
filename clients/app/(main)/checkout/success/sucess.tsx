"use client";
import useCart from "@/lib/hooks/useCart";
import { Title, Button, Container, Text, Stack } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutSuccess() {
  const router = useRouter();
  const [{ items, session }, setValue] = useCart();


  return (
    <Stack align="stretch" justify="center" py="lg">
      <Container>
        <IconCircleCheck size={100} color="green" />
      </Container>
      <Container>
        <Title>Đặt hàng thành công</Title>
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
