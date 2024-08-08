"use client"
import { Orders } from "@/models/orders";
import {
  Autocomplete,
  Button,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Title,
} from "@mantine/core";

// type Order = {
//   product: string;
//   total_order: string;
//   status: string;
//   countdown: string;
//   shipping_unit: string;
//   operation: string;
// };

export function OrderView({orders}: {orders: Orders[]}) {
  const rows = orders.map((data,index) => (
    <TableTr>
      <TableTd>{data.id}</TableTd>
      <TableTd>{data.totalPrice}</TableTd>
      <TableTd>{data.id}</TableTd>
      <TableTd>{data.id}</TableTd>
      <TableTd>{data.id}</TableTd>
      <TableTd>
        <Button variant="outline">Xem chi tiết</Button>
      </TableTd>
    </TableTr>
  ));
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
        </TabsList>
        <Autocomplete mt={"md"} placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm "/>

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
