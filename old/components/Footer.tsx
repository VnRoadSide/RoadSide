import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconSend,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Flex,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const data = [
  {
    title: "Khám phá",
    links: [
      { label: "Cửa hàng", link: "/shops" },
      { label: "Phiếu giảm giá", link: "/shops" },
      { label: "Flash sale", link: "/shops" },
      { label: "Tác giả", link: "/shops" },
    ],
  },
  {
    title: "Dịch vụ khách hàng",
    links: [
      { label: "Câu hỏi thường gặp & Trợ giúp", link: "#" },
      { label: "Chính sách hoàn tiền", link: "#" },
      { label: "Quy trình giải quyết khiếu nại", link: "#" },
      { label: "Chính sách vận chuyển", link: "#" },
    ],
  },
  {
    title: "Thông tin của chúng tôi",
    links: [
      { label: "Chính sách bảo mật", link: "#" },
      { label: "Điều khoản và điều kiện", link: "#" },
      { label: "Liên hệ chúng tôi", link: "#" },
    ],
  },
];

export const Footer = () => {
  const router = useRouter();
  const hideNavbar =
    router.pathname.startsWith("/shop") || router.pathname.startsWith("/admin");

  if (hideNavbar) {
    return null;
  }

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text key={index} component="a" href={link.link}>
        {link.label}
      </Text>
    ));

    return (
      <Stack key={group.title}>
        <Title order={4}>{group.title}</Title>
        {links}
      </Stack>
    );
  });

  return (
    <footer>
      <Paper shadow="xs" withBorder>
        <Group mx={50} my={30}>
          <Flex direction="column" align="center" gap="md">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
            <span className="font-bold">
              Trường Đại học Bách Khoa ĐHQG - HCM
            </span>
            <Flex gap="small" align="center">
              <Text component="a">demeter_ec@gmail.com</Text>
              <Text component="a">+84 1234 56789</Text>
            </Flex>
          </Flex>
          <Flex gap="xl" >{groups}</Flex>
        </Group>
        <Group mx={50} my={30}>
          <Text size="sm">
            © 2024 demeter.com. All rights reserved.
          </Text>
          <Group gap={0}>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandTwitter size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandYoutube size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandInstagram size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandFacebook size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconSend size={18} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Paper>
    </footer>
  );
};
