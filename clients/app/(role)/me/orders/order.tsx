"use client";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import { getCurrentPrice } from "@/lib/utils";
import { Orders, OrderStatus, OrderStatusType } from "@/models/orders";
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
import { useRouter } from "next/navigation"; // Import useRouter to handle routing

export function OrderView({ orders, status = "all", page, pageSize }: { orders: Orders[], status?: OrderStatusType, page?: number, pageSize?: number }) {
  const router = useRouter();

  // Function to update the status in the query string
  const handleTabChange = (newStatus: string | null) => {
    if (newStatus === null) {
      router.push("/me/orders");
    } else {
      router.push(`/me/orders?status=${newStatus}`);
    }
  };
  return (
    <Stack>
      <Title order={2}>Tất cả</Title>
      <Tabs value={status} onChange={handleTabChange}> {/** Update Tabs to handle routing */}
        <TabsList>
          <TabsTab value={OrderStatus[OrderStatus.all]}>Tất cả</TabsTab>
          <TabsTab value={OrderStatus[OrderStatus.pending]}>Chờ xác nhận</TabsTab>
          <TabsTab value={OrderStatus[OrderStatus.pickup]}>Chờ lấy hàng</TabsTab>
          <TabsTab value={OrderStatus[OrderStatus.shipping]}>Đang giao</TabsTab>
          <TabsTab value={OrderStatus[OrderStatus.delivered]}>Đã giao</TabsTab>
          <TabsTab value={OrderStatus[OrderStatus.cancelled]}>Đơn Huỷ</TabsTab>
          <TabsTab value={OrderStatus[OrderStatus.refunded]}>Trả hàng/Hoàn tiền</TabsTab>
        </TabsList>
        <Autocomplete
          mt={"md"}
          mb={"md"}
          placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm "
        />
        {/* Show orders filtered by current tab */}
        {orders.length > 0 ? (
        <TabsPanel value={status}>
          {orders.map((data, index) => (
            <Card key={index} shadow="sm" padding="lg" mb="md">
              <Group justify="space-between">
                <Title order={4}>Mã đơn hàng {data.id}</Title>
                  <OrderStatusBadge orderStatus={data.orderStatus as OrderStatus}/>
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
                        {getCurrentPrice(data.product).toLocaleString()}
                      </TableTd>
                      <TableTd>{data.quantity}</TableTd>
                      <TableTd>
                        {(
                          getCurrentPrice(data.product) * data.quantity
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
            </Card>)
          )}

        </TabsPanel>
      ) : (
        <p>Không có đơn hàng hiện ở trạng thái này.</p>
      )}
    </Tabs>
  </Stack>
);
}
