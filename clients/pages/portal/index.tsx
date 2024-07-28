import ProfileSection from "@/components/ProfileSection";
import { Url } from "@/models/routing";
import { dayList, monthList, yearList } from "@/utils";
import {
  Stack,
  Grid,
  Title,
  Group,
  Avatar,
  TextInput,
  Select,
  RadioGroup,
  Radio,
  Button,
  Space,
  Table,
  Tabs,
} from "@mantine/core";
import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";

// Define your navigation href
export const sections: Url[] = [
  {
    label: "Quản Lý Shop",
    href: "/portal",
  },
  {
    label: "Thông báo của tôi",
    href: "portal/notification",
  },
  {
    label: "Quản Lý Đơn Hàng",
    href: "/portal/orders",
  },
  {
    label: "Quản Lý Sản Phẩm",
    href: "/portal/products",
  },
  {
    label: "Kênh Marketing",
    href: "/portal/marketing",
  },
  {
    label: "Tài Chính",
    href: "/portal/finance",
  }
];

export default function Portal() {
  return (
    <ProfileSection urls={sections}>
      <Stack>
        <Title order={2}>Tất cả</Title>
        <Tabs defaultValue="all">
          <Tabs.List>
            <Tabs.Tab value="all">Tất cả</Tabs.Tab>
            <Tabs.Tab value="pending">Chờ xác nhận</Tabs.Tab>
            <Tabs.Tab value="pickup">Chờ lấy hàng</Tabs.Tab>
            <Tabs.Tab value="shipping">Đang giao</Tabs.Tab>
            <Tabs.Tab value="delivered">Đã giao</Tabs.Tab>
            <Tabs.Tab value="cancelled">Đơn Huỷ</Tabs.Tab>
            <Tabs.Tab value="returned">Trả hàng/Hoàn tiền</Tabs.Tab>
            <Tabs.Tab value="failed">Giao không thành công</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all">
            {/* Filter Section */}
            <Group
              pt="md"
              gap="md"
              align="end"
              grow
              preventGrowOverflow={false}
              wrap="nowrap"
            >
              <Select
                label="Mã đơn hàng"
                placeholder="Nhập Mã đơn hàng"
                data={["Mã đơn 1", "Mã đơn 2"]}
              />
              <Select
                label="Đơn vị vận chuyển"
                placeholder="Tất cả ĐVVC"
                data={["ĐVVC 1", "ĐVVC 2"]}
              />
              <Button variant="outline">Áp dụng</Button>
              <Button variant="outline">Đặt lại</Button>
              <Button variant="outline">Xuất</Button>
              <Button variant="outline">Lịch sử Xuất Báo cáo</Button>
            </Group>

            {/* Orders Table */}
            <Table mt="md">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Sản phẩm</Table.Th>
                  <Table.Th>Tổng Đơn hàng</Table.Th>
                  <Table.Th>Trạng thái</Table.Th>
                  <Table.Th>Đếm ngược</Table.Th>
                  <Table.Th>Đơn vị vận chuyển</Table.Th>
                  <Table.Th>Thao tác</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr></Table.Tr>
              </Table.Tbody>
            </Table>
          </Tabs.Panel>

          {/* Repeat Tabs.Panel for each tab with specific content if needed */}
        </Tabs>
      </Stack>
    </ProfileSection>
  );
}
