import ProfileSection from "@/components/ProfileSection";
import { Url } from "@/models/routing";
import { dayList, monthList, yearList } from "@/utils";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextInput,
  Text,
  Group,
  Title,
  Space,
} from "@mantine/core";
import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";

export const navigation: Url[] = [
  {
    label: "Thông tin tài khoản",
    href: "/me",
  },
  {
    label: "Thông báo của tôi",
    href: "/notification",
  },
  {
    label: "Quản lý đơn hàng",
    href: "/me/orders",
  },
  {
    label: "Quản lý đổi trả",
    href: "/me/returns",
  },
  {
    label: "Sổ địa chỉ",
    href: "/me/addresses",
  },
  {
    label: "Thông tin thanh toán",
    href: "/me/payment-info",
  },
  {
    label: "Sản phẩm theo dõi",
    href: "/me/follow",
  },
  {
    label: "Chia sẻ có lời",
    href: "/referral",
  },
  {
    label: "Mã giảm giá",
    href: "/discount-codes",
  },
  {
    label: "Hỗ trợ khách hàng",
    href: "/customer-support",
  },
];

export default function Me() {
  return (
    <ProfileSection urls={navigation}>
      <Stack p="md">
        <Grid>
          <Grid.Col span={6}>
            <Stack gap="sm">
              <Title order={3}>Thông tin cá nhân</Title>
              <Group wrap="nowrap">
                <Avatar color="cyan" src="/logo.png" alt="no image here" />

                <TextInput
                  label="Họ & Tên"
                  placeholder="Tuấn Kiệt Trần"
                  defaultValue="Tuấn Kiệt Trần"
                  required
                />
              </Group>

              <Group align="end" wrap="nowrap">
                <Select
                  label="Ngày sinh"
                  placeholder="Ngày"
                  defaultValue="19"
                  data={dayList().map((day) => ({ value: day, label: day }))}
                />
                <Select
                  label=""
                  placeholder="Tháng"
                  defaultValue="12"
                  data={monthList().map((month) => ({
                    value: month,
                    label: month,
                  }))}
                />
                <Select
                  label=""
                  placeholder="Năm"
                  defaultValue="2002"
                  data={yearList().map((year) => ({
                    value: year,
                    label: year,
                  }))}
                />
              </Group>
              <RadioGroup label="Giới tính" defaultValue="Nam">
                <Group mt="xs">
                  <Radio value="Nam" label="Nam" />
                  <Radio value="Nữ" label="Nữ" />
                  <Radio value="Khác" label="Khác" />
                </Group>
              </RadioGroup>
              <TextInput
                label="Số điện thoại"
                placeholder="0123456789"
                required
              />
              <TextInput
                label="Email"
                placeholder="tranvana@gmail.com"
                // required
              />

              <Button color="blue">Lưu thay đổi</Button>
            </Stack>
          </Grid.Col>

          <Grid.Col span={6}>
            <Stack>
              <Title order={3}>Bảo mật</Title>
              <Group justify="space-between">
                <Text>Đổi mật khẩu</Text>
                <Button variant="outline">Thay đổi</Button>
              </Group>

              <Group justify="space-between">
                <Text>Thiết lập mã PIN</Text>
                <Button variant="outline">Thiết lập</Button>
              </Group>

              <Group justify="space-between">
                <Text>Yêu cầu xóa tài khoản</Text>
                <Button color="red" variant="outline">
                  Yêu cầu
                </Button>
              </Group>
            </Stack>
            <Space h="xl" />
            <Stack>
              <Title order={3}>Liên kết mạng xã hội</Title>

              <Group align="center" justify="space-between">
                <Group>
                  <IconBrandFacebook size={24} color="#3b5998" />
                  <Text>Facebook</Text>
                </Group>
                <Button color="blue" variant="light">
                  Đã liên kết
                </Button>
              </Group>

              <Group align="center" justify="space-between">
                <Group>
                  <IconBrandGoogle size={24} color="#DB4437" />
                  <Text>Google</Text>
                </Group>

                <Button color="blue" variant="light">
                  Đã liên kết
                </Button>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </ProfileSection>
  );
}
