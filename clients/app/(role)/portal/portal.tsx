"use client"
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
  TabsList,
  TabsPanel,
  TabsTab,
  Title,
} from "@mantine/core";

export function PortalTable() {
  return (
    <Stack>
      <Title order={2}>Tất cả</Title>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTab value="all">Tất cả</TabsTab>
          <TabsTab value="pending">Chờ xác nhận</TabsTab>
          <TabsTab value="pickup">Chờ lấy hàng</TabsTab>
          <TabsTab value="shipping">Đang giao</TabsTab>
          <TabsTab value="delivered">Đã giao</TabsTab>
          <TabsTab value="cancelled">Đơn Huỷ</TabsTab>
          <TabsTab value="returned">Trả hàng/Hoàn tiền</TabsTab>
          <TabsTab value="failed">Giao không thành công</TabsTab>
        </TabsList>

        <TabsPanel value="all">
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
          {/* <Table mt="md">
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
              <TableTr></TableTr>
            </TableTbody>
          </Table> */}
        </TabsPanel>

        {/* Repeat Tabs.Panel for each tab with specific content if needed */}
      </Tabs>
    </Stack>
  );
}
