"use client";
import { PortalTable } from "../portal";
import {
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  Button,
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
  const rows = orders.map(({ product, total_order, status, countdown, shipping_unit, operation }) => (
    <TableTr>
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

  return (
    <div>
      <PortalTable />
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
    </div>
  );
}