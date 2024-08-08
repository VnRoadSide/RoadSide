"use client";

import {
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  Button,
  TabsPanel,
  Stack,
  Tabs,
  TabsList,
  TabsTab,
  Title,
  Group,
  Select,
} from "@mantine/core";

type Order = {
  product: string;
  total_order: string;
  status: string;
  countdown: string;
  shipping_unit: string;
  operation: string;
};

export function OrderView({orders}: {orders: Order[]}) {
  const rows = orders.map(({ product, total_order, status, countdown, shipping_unit, operation },index) => (
    <TableTr key={index}>
      <TableTd>{product}</TableTd>
      <TableTd>{total_order}</TableTd>
      <TableTd>{status}</TableTd>
      <TableTd>{countdown}</TableTd>
      <TableTd>{shipping_unit}</TableTd>
      <TableTd>
        <Button variant="outline">{operation}</Button>
      </TableTd>
    </TableTr>
  ));

  return(
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
          
        <TabsPanel value="all">
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
              {rows}
            </TableTbody>
          </Table>
        </TabsPanel>
      </Tabs>
    </Stack>
  );
}