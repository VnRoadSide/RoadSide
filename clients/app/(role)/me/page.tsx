import { metadata } from "@/app/(auth)/login/page";
import { auth } from "@/auth";
import { dayList, monthList, useApi, yearList } from "@/lib/hooks";
import {
  Avatar,
  Button,
  Grid,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextInput,
  Text,
  Group,
  Title,
  Space,
  GridCol,
  Card,
  Badge,
  Divider,
  Box,
  NavLink,
  Paper,
} from "@mantine/core";
import { IconPhone, IconMail } from "@tabler/icons-react";

async function GetData() {
  const session = await auth();
  const { get } = useApi(session);
  const { data, error } = await get("/auth/me");
  return data;
}

function SupportCenter() {
  const supportOptions = [
    {
      icon: IconPhone,
      label: "Hotline",
      content: "1900-1005",
      detail: "1000 đ/phút, 8h-21h kể cả thứ 7, CN",
      action: "Call",
    },
    {
      icon: IconMail,
      label: "Gửi yêu cầu hỗ trợ",
      content: "customer_service@roadside.vn",
      detail: "Hãy gửi email để được hỗ trợ.",
      action: "Create",
    },
  ];

  const Icon = ({ icon: IconComponent }: { icon: any }) => (
    <IconComponent size={48} stroke={1.5} color="green" />
  );

  return (
      <Stack>
        <Title order={3}>
          Trung tâm hỗ trợ
        </Title>
        <Grid>
          {supportOptions.map((option, index) => (
            <GridCol key={index} span={6}>
              <Card shadow="sm" padding="lg" mb="md" withBorder>
                <Group align="center">
                  <Icon icon={option.icon} />
                </Group>
                <Text fw={500} size="lg">
                  {option.label}
                </Text>
                <Text size="sm">{option.content}</Text>
                <Text size="xs" c="dimmed">
                  {option.detail}
                </Text>
              </Card>
            </GridCol>
          ))}
        </Grid>
      </Stack>
  );
}

export default async function Me() {
  const meData = await GetData();
  return (
    <Stack p="md">
      <Grid>
        <GridCol span={6}>
          <Stack gap="sm">
            <Title order={3}>Thông tin cá nhân</Title>
            <Group wrap="nowrap">
              <Avatar color="cyan" src="/logo.png" alt="no image here" />

              <TextInput
                label="Họ & Tên"
                placeholder="Nguyen Van A"
                defaultValue={meData?.name}
                required
              />
            </Group>

            <Group align="end" wrap="nowrap">
              <Select
                label="Ngày sinh"
                placeholder="Ngày"
                defaultValue="05"
                data={dayList().map((day) => ({ value: day, label: day }))}
              />
              <Select
                label=""
                placeholder="Tháng"
                defaultValue="10"
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
            <RadioGroup label="Giới tính" defaultValue="Nữ">
              <Group mt="xs">
                <Radio value="Nam" label="Nam" />
                <Radio value="Nữ" label="Nữ" />
                <Radio value="Khác" label="Khác" />
              </Group>
            </RadioGroup>
            <TextInput
              label="Số điện thoại"
              placeholder="+84123456789"
              defaultValue={meData?.phoneNumber}
              required
            />
            <TextInput
              label="Email"
              placeholder="nguyenvana@gmail.com"
              defaultValue={meData?.email}
              // required
            />

            <Button color="blue">Lưu thay đổi</Button>
          </Stack>
        </GridCol>

        <GridCol span={6}>
          <Stack>
            <Title order={3}>Thông tin đặt hàng</Title>
            <Card shadow="sm" padding="lg" mb="md" withBorder>
                <Text fw={700} size="md" w={500}>
                  {meData.name}
                </Text>
            <Text size="md">Địa chỉ: {meData.address.addressLines + ", " + meData.address.locality + ", " + meData.address.region + ", " + meData.address.country}</Text>
            <Text size="md">Điện thoại: {meData.phoneNumber}</Text>
          </Card>
          </Stack>
          <Stack>
            <SupportCenter/>
          </Stack>
          
        </GridCol>
      </Grid>
    </Stack>
  );
}
