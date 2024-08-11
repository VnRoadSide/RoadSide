import { Button, Container, Text } from '@mantine/core';
import Link from 'next/link';

export default function CheckoutIndexPage() {
  return (
    <Container style={{ textAlign: 'center', paddingTop: '50px' }}>
      <Text size="xl" w={500} mb="md">
        Không tìm thấy phiên, vui lòng quay lại giỏ hàng để tiếp tục.
      </Text>
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
  );
}