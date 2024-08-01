import { Title, Button, Container, Text } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";

export default function CheckoutSuccess({total}: {total: number}) {
    return <Container py="xl">
    <Container>
      <IconCircleCheck size={100} color="green" />
      <Title>Thanh toán thành công</Title>
      <Title>{total.toLocaleString()} đ</Title>
      <Text fw={500} fz="lg" mb={5}>
        Đơn hàng của bạn đang được xử lý
      </Text>
      <Text fz="sm" c="dimmed">
        Để không bỏ lỡ các khuyến mãi sắp tới, hãy bật thông báo cũng như nhấn
        yêu thích của những cửa hàng mà bạn thích!
      </Text>
      <Button
        variant="gradient"
        size="xl"
        m="xl"
        component={Link}
        href={"/"}
      >
        Quay lại trang chủ
      </Button>
    </Container>
  </Container>;
}