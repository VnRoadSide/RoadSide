"use client";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import { OrderItem} from "@/models";
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
  Badge,
  Card,
  Image
} from "@mantine/core";

export function OrderView({orders}: {orders: OrderItem[]}) {
  var total = 0;
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
          
          <TabsPanel value="all" pt="md">
            {orders.map((data, index) => (
              <Card key={index} shadow="sm" padding="lg" mb="md">
                <Group justify="space-between">
                  <Title order={4}>Đơn hàng {index + 1}</Title>
                  <OrderStatusBadge orderStatus={data.orderStatus} />
                </Group>
                <Table>
                  <TableThead>
                    <TableTr>
                      <TableTh></TableTh>
                      <TableTh>Sản Phẩm</TableTh>
                      <TableTh>Đơn Giá</TableTh>
                      <TableTh>Số Lượng</TableTh>
                      <TableTh>Số Tiền</TableTh>
                    </TableTr>
                  </TableThead>
                    <TableTbody>
                      <TableTr>
                        <TableTd>
                          <Image
                            src={data.product.imageUrl}
                            alt="no image here"
                            height={50}
                            w={50}
                          />
                        </TableTd>
                        <TableTd>{data.product.name}</TableTd>
                        <TableTd>
                          {data.product.baseUnitPrice.toLocaleString()}
                        </TableTd>
                        <TableTd>{data.quantity}</TableTd>
                        <TableTd>
                          {(
                            (data.product?.baseUnitPrice ?? 0) * data.quantity
                          ).toLocaleString()}
                        </TableTd>
                      </TableTr>
                    </TableTbody>
                  <TableTbody>
                    <TableTr>
                      <TableTd></TableTd>
                      <TableTd></TableTd>
                      <TableTd></TableTd>
                      {/* <TableTd>
                        <Title order={4}>Thành tiền:</Title>
                      </TableTd>
                      <TableTd>
                        <Title order={4}>
                          
                        </Title>
                      </TableTd> */}
                    </TableTr>
                  </TableTbody>
                </Table>
              </Card>
            ))}
        </TabsPanel>
      </Tabs>
    </Stack>
  );
}