
import { Card, Text, Button, Group, Divider, Box, Badge } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export default function AddressBook() {
  const addresses = [
    {
      name: "TUẤN KIỆT TRẦN",
      isDefault: true,
      address:
        "B9.18, Chung cư Saigon Intela, KDC 13E, Đô thị mới Nam Thành Phố, Ấp 5, Xã Phong Phú, Huyện Bình Chánh, Hồ Chí Minh",
      phone: "0355749742",
    },
    {
      name: "TRẦN HÀ TUẤN KIỆT",
      isDefault: false,
      address:
        "5/1B Duyên Hải, khu phố Hưng Thanh, Thị trấn Cần Thanh, Huyện Cần Giờ, Hồ Chí Minh",
      phone: "0355749742",
    },
  ];

  return (
      <Box>
        <Text size="lg" w={500} mb="md">
          Số địa chỉ
        </Text>
        {addresses.map((address, index) => (
          <Card key={index} shadow="sm" padding="lg" mb="md">
            <Group mb="md">
              <Text size="md" w={500}>
                {address.name}
              </Text>
              {address.isDefault && (
                <Badge color="green" ml="md">
                  Địa chỉ mặc định
                </Badge>
              )}
              <Button
                variant="subtle"
                color="blue"
                leftSection={<IconPencil size={18} />}
              >
                Chỉnh sửa
              </Button>
            </Group>
            <Text size="sm">Địa chỉ: {address.address}</Text>
            <Text size="sm">Điện thoại: {address.phone}</Text>
            {!address.isDefault && (
              <Group mt="md">
                <Button
                  variant="subtle"
                  color="red"
                  rightSection={<IconTrash size={18} />}
                >
                  Xóa
                </Button>
              </Group>
            )}
            <Divider my="sm" />
          </Card>
        ))}
        <Button variant="outline" size="lg">
          + Thêm địa chỉ mới
        </Button>
      </Box>
  );
}
