import { Button, Container, Title, Text, Stack } from "@mantine/core";
import { IconCircleX } from "@tabler/icons-react";
import Link from "next/link";

export default function CheckoutFail() {
  return (
    <Stack align="stretch" justify="center" py="lg">
        <Container>
          <IconCircleX size={100} color="red" />
        </Container>

        <Container>
          <Title>Thanh toán thất bại</Title>
        </Container>

        <Container>
          <Text size="lg" fw="500" >
            Đơn hàng của bạn chưa được hoàn tất thanh toán
          </Text>
        </Container>

        <Container>
          <Button
            variant="gradient"
            size="xl"
            component={Link}
            href={"/checkout"}
          >
            Thử thanh toán lại
          </Button>
        </Container>
    </Stack>
  );
}
