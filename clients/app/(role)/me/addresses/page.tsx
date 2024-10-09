
import { Card, Text, Button, Group, Divider, Box, Badge } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export default function AddressBook() {
  const addresses = [
    {
      name: "Alice Smith",
      isDefault: true,
      address:
      "32 đường số 2, Khu dân cư Kim Sơn, Tân Phong, Quận 7, Hồ Chí Minh",
      phone: "0917012919",
    },
    {
      name: "Alice Smith",
      isDefault: false,
      address:
      "T1-07.01, Chung cư Calla Garden, KDC 13C, Xã Phong Phú, Huyện Bình Chánh, Hồ Chí Minh",
      phone: "0917012919",
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
