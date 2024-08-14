import { Button, Container, Stack, Title } from "@mantine/core";
import Link from "next/link";

export default function CheckoutIndexPage() {
  return (
    <Stack align="stretch" justify="center" gap="xs">
      <Container>
        <Title order={3}>
          Không tìm thấy phiên, vui lòng quay lại giỏ hàng để tiếp tục.
        </Title>
      </Container>
      <Container>
        <Button
          component={Link}
          href="/cart"
          variant="outline"
          size="md"
          mt="lg"
        >
          Quay lại giỏ hàng
        </Button>
      </Container>
    </Stack>
  );
}
