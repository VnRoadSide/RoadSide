import {
  Grid,
  Text,
  Title,
  Button,
  Group,
  Divider,
  Box,
  Paper,
  NavLink,
} from "@mantine/core";
import {
  IconPhone,
  IconMessageCircle,
  IconMail,
  IconCreditCard,
  IconTruck,
  IconUser,
  IconInfoCircle,
  IconSettings,
  IconChevronRight,
} from "@tabler/icons-react";
import ProfileSection from "@/components/ProfileSection";
import { navigation } from "./me";

function SupportCenter() {
  const supportOptions = [
    {
      icon: IconPhone,
      label: "Hotline",
      content: "1900-6035",
      detail: "1000 đ/phút, 8h-21h kể cả thứ 7, CN",
      action: "Call",
    },
    {
      icon: IconMessageCircle,
      label: "Gặp Trợ lý cá nhân",
      content: "Chat ngay",
      detail: "8h-21h kể cả thứ 7, CN",
      action: "Chat",
    },
    {
      icon: IconMail,
      label: "Gửi yêu cầu hỗ trợ",
      content: "Tạo đơn yêu cầu",
      detail: "Hoặc email đến hotro@tiki.vn",
      action: "Create",
    },
  ];

  const infoOptions = [
    {
      icon: IconCreditCard,
      label: "Đơn hàng và thanh toán",
      content: "Cách tra cứu đơn hàng, sử dụng mã giảm giá",
      link: "Xem chi tiết",
    },
    {
      icon: IconTruck,
      label: "Đơn hàng và vận chuyển",
      content: "Chính sách đổi trả, cách kích hoạt bảo hành",
      link: "Xem chi tiết",
    },
    {
      icon: IconUser,
      label: "Tài khoản của tôi",
      content: "Cách đăng ký tài khoản Tiki, chỉnh sửa thông tin cá nhân",
      link: "Xem chi tiết",
    },
    {
      icon: IconSettings,
      label: "Đổi trả, bảo hành và hồi hoàn",
      content: "Chính sách đổi trả, cách kích hoạt bảo hành",
      link: "Xem chi tiết",
    },
    {
      icon: IconInfoCircle,
      label: "Thông tin về Tiki",
      content:
        "Quy chế hoạt động và chính sách của sàn thương mại điện tử Tiki",
      link: "Xem chi tiết",
    },
  ];

  const Icon = ({ icon: IconComponent }: { icon: any }) => (
    <IconComponent size={48} stroke={1.5} />
  );

  return (
    <ProfileSection urls={navigation}>
      <Box p="lg">
        <Title order={2} pb="lg">
          Trung tâm hỗ trợ
        </Title>
        <Grid gutter="lg">
          {supportOptions.map((option, index) => (
            <Grid.Col key={index} span={4}>
              <Paper p="lg">
                <Group align="center">
                  <Icon icon={option.icon} />
                  <Button>{option.action}</Button>
                </Group>
                <Text fw={500} size="lg">
                  {option.label}
                </Text>
                <Text size="sm">{option.content}</Text>
                <Text size="xs" c="dimmed">
                  {option.detail}
                </Text>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>

        <Divider my="lg" label="Tra cứu thông tin" labelPosition="center" />

        <Grid gutter="lg">
          {infoOptions.map((option, index) => (
            <Grid.Col key={index} span={6}>
              <Box>
                <Group >
                  <Icon icon={option.icon} />
                  <NavLink
                    href={option.link}
                    label="Xem chi tiết"
                    rightSection={
                      <IconChevronRight
                        size="0.8rem"
                        stroke={1.5}
                        className="mantine-rotate-rtl"
                      />
                    }
                  />
                </Group>
                <Text w={500} size="lg" mt="md">
                  {option.label}
                </Text>
                <Text size="sm">{option.content}</Text>
              </Box>
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </ProfileSection>
  );
}

export default SupportCenter;
