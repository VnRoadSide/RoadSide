import {
  Button,
  Group,
  Select,
  Stack,
  Table,
  TableTbody,
  TableTh,
  TableThead,
  TableTr,
  Tabs,
  Title,
} from "@mantine/core";

export default function Page() {
  return (
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
            <TableThead>
              <TableTr>
                <TableTh>Sản phẩm</TableTh>
                <TableTh>Tổng Đơn hàng</TableTh>
                <TableTh>Trạng thái</TableTh>
                <TableTh>Đếm ngược</TableTh>
                <TableTh>Đơn vị vận chuyển</TableTh>
                <TableTh>Thao tác</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              <Table.Tr></Table.Tr>
            </TableTbody>
          </Table>
        </Tabs.Panel>

        {/* Repeat Tabs.Panel for each tab with specific content if needed */}
      </Tabs>
    </Stack>
  );
}
