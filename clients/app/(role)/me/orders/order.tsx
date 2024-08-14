"use client";
import { Orders } from "@/models/orders";
import {
  Autocomplete,
  Card,
  Paper,
  Stack,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Title,
  Image,
  Group,
  Text,
  TableTr,
  Table,
  TableTbody,
  TableTh,
  TableTd,
  TableThead,
  Button,
  Badge,
} from "@mantine/core";

export function OrderView({ orders }: { orders: Orders[] }) {
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
        <Autocomplete
          mt={"md"}
          mb={"md"}
          placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm "
        />
        <TabsPanel value="all">
          {orders.map((data, index) => (
            <Card key={index} shadow="sm" padding="lg" mb="md">
              <Group justify="space-between">
                <Title order={4}>Đơn hàng {index + 1}</Title>
                <Badge>Chờ xác nhận</Badge>
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
                {data.items.map((data, index) => (
                  <TableTbody key={index}>
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
                          data.product.baseUnitPrice * data.quantity
                        ).toLocaleString()}
                      </TableTd>
                    </TableTr>
                  </TableTbody>
                ))}
                <TableTbody>
                  <TableTr>
                    <TableTd></TableTd>
                    <TableTd></TableTd>
                    <TableTd></TableTd>
                    <TableTd>
                      <Title order={4}>Thành tiền:</Title>
                    </TableTd>
                    <TableTd>
                      <Title order={4}>
                        {data.totalPrice.toLocaleString()}
                      </Title>
                    </TableTd>
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
