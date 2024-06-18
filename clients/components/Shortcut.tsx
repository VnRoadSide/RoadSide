import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";

import {
  IconTruckDelivery,
  IconTags,
  IconGift,
  IconRosetteDiscount,
  IconAlarmMinus,
  IconBasket,
} from "@tabler/icons-react";

const mockdata = [
  { title: "Voucher giảm đến 500.000đ", icon: IconTags, color: "violet" },
  { title: "Miễn phí ship", icon: IconTruckDelivery, color: "indigo" },
  { title: "Mã giảm giá", icon: IconGift, color: "green" },
  { title: "Rau củ giảm tới 50%", icon: IconRosetteDiscount, color: "teal" },
  { title: "Đặt trước", icon: IconAlarmMinus, color: "cyan" },
  { title: "Giỏ quà biếu tặng", icon: IconBasket, color: "pink" },
];

export function Shortcut() {
  const theme = useMantineTheme();

  const items = mockdata.map((item) => (
    <UnstyledButton
      key={item.title}
      className="flex flex-col items-center justify-center text-center rounded-lg cursor-pointer gap-2.5 mt-2.5"
    >
      <item.icon color={theme.colors[item.color][6]} size="2.2rem" />
      <Text size="sm" mt={5} mb={2.5}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card>
      <SimpleGrid ml={10} mr={10} mt={10} mb={10} cols={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
        {items}
      </SimpleGrid>
    </Card>
  );
}
