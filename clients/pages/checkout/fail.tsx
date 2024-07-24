import { Button, Container, Title, Text } from "@mantine/core";
import { IconCircleX } from "@tabler/icons-react";
import Link from "next/link";

export default function CheckoutFail() {
  return (
    <Container py="xl">
      <Container >
        <IconCircleX size={100} color="red" />
        <Title>Thanh toán thất bại</Title>
        <Text fw={500} fz="lg" mb={5}>
          Đơn hàng của bạn chưa được hoàn tất thanh toán
        </Text>
        <Button
          variant="gradient"
          size="xl"
          m="xl"
          component={Link}
          href={"/checkout"}
        >
          Thử thanh toán lại
        </Button>
      </Container>
    </Container>
  );
}
