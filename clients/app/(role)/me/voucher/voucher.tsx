import { Vouchers } from "@/models";
import { Text, Flex, Skeleton, Title, Card } from "@mantine/core";

export function VoucherView({ data }: { data: Vouchers[] }) {
    return (
        <Skeleton visible={data.length === 0}>
            <Title>Phiếu giảm giá </Title>
            <Card p={"lg"}>
            {data.map((voucher, index) => (
            <Card withBorder shadow="sm" p="lg" radius="md" key={index} mb="lg">
              <Flex direction="column" gap={4}>
                <Flex justify="space-between">
                  <Text fw={700} c="#009f7f">
                    {voucher.code}
                  </Text>
                  <Flex align="center" gap={4}>
                    <Text fw={500}>Giảm {voucher.discount}%</Text>
                    <Text size="sm"> - Tối đa đ{voucher.usageLimit}k </Text>
                  </Flex>
                </Flex>
                <Flex direction="column">
                  <Text size="sm">{voucher.description}</Text>
                  <Text c="red" size="sm">
                    Hạn: {new Date(voucher.startDate).toLocaleDateString("en-GB")} -{" "}
                    {new Date(voucher.endDate).toLocaleDateString("en-GB")}
                  </Text>
                </Flex>
              </Flex>
              </Card>
            ))}
            </Card>
          
        </Skeleton>
      );
    };