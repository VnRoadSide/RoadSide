"use client";
import InfoVendor from "@/components/InfoVendor";
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
  Modal,
} from "@mantine/core";
import { User } from "@/lib/auth";
import { useRouter } from "next/navigation"; // Import useRouter to handle routing
import { useState } from "react";
import { changeOrderStatus } from "@/lib/checkout";

export function OrderView({
  orders,
  status = "all",
  page,
  pageSize,
}: {
  orders: Orders[];
  status?: OrderStatusType;
  page?: number;
  pageSize?: number;
}) {
  const router = useRouter();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatusType | null>(
    null
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  // Function to update the status in the query string
  const handleTabChange = (newStatus: string | null) => {
    if (newStatus === null) {
      router.push("/me/orders");
    } else {
      router.push(`/me/orders?status=${newStatus}`);
    }
  };
  const handleStatusChange = (orderId: string, newStatus: string | null) => {
    //convert to OrderStatusType first
    if (newStatus === null) {
      return;
    }

    setSelectedOrderId(orderId);
    setSelectedStatus(newStatus as OrderStatusType);
    setConfirmOpen(true); // Open confirmation dialog
  };

  // Confirm the status change
  const confirmStatusChange = async () => {
    // API call to update the status
    // Here you can use fetch or your existing API handler to change the order status
    if (selectedOrderId && selectedStatus) {
      try {
        // Example: await updateOrderStatus(selectedOrderId, selectedStatus);
        await changeOrderStatus(selectedOrderId, OrderStatus[selectedStatus]);
        setConfirmOpen(false); // Close the modal
        router.refresh(); // Refresh the page to reflect the new status
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
  };

  return (
    <Stack>
      <Title order={2}>Tất cả</Title>
      <Tabs value={status} onChange={handleTabChange}>
        {" "}
        {/** Update Tabs to handle routing */}
        <TabsList>
          <TabsTab value={OrderStatus[OrderStatus.all]}>Tất cả</TabsTab>
          <TabsTab value={OrderStatus[OrderStatus.pending]}>
            Chờ xác nhận
          </TabsTab>
          <TabsTab value={OrderStatus[OrderStatus.pickup]}>
            Chờ lấy hàng
          </TabsTab>
          <TabsTab value={OrderStatus[OrderStatus.shipping]}>Đang giao</TabsTab>
          <TabsTab value={OrderStatus[OrderStatus.delivered]}>Đã giao</TabsTab>
          <TabsTab value={OrderStatus[OrderStatus.cancelled]}>Đơn Huỷ</TabsTab>
          <TabsTab value={OrderStatus[OrderStatus.refunded]}>
            Trả hàng/Hoàn tiền
          </TabsTab>
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
                  <Title order={4}>Đơn hàng {data.id}</Title>
                  {data.orderStatus === 0 && (
                    <Button
                      component="a"
                      color="red"
                      variant="outline"
                      onClick={() => handleStatusChange(data.id, "cancelled")}
                    >
                      Huỷ đơn hàng
                    </Button>
                  )}
                  <OrderStatusBadge
                    orderStatus={data.orderStatus as OrderStatus}
                  />
                </Group>

                <Table align="center">
                  <TableThead>
                    <TableTr>
                      <TableTh></TableTh>
                      <TableTh>Sản Phẩm</TableTh>
                      <TableTh>Cửa hàng</TableTh>
                      <TableTh>Phiếu giảm giá</TableTh>
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
                          <InfoVendor user={data.product.vendor as User} />
                        </TableTd>
                        <TableTd __size="xl">
                          {data.product.vouchers.map((item, index) => (
                            <Badge key={index} color="pink" variant="light">
                              Giảm {item.discount}%
                            </Badge>
                          ))}
                        </TableTd>
                        <TableTd>
                          {data.product.baseUnitPrice.toLocaleString()}
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
        ) : (
          <p>Không có đơn hàng hiện ở trạng thái này.</p>
        )}
      </Tabs>
      {/* Confirmation modal for status change */}
      <Modal
        opened={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Xác nhận huỷ đơn hàng"
      >
        <p>Bạn có chắc chắn muốn huỷ đơn hàng này không?</p>
        <Button onClick={confirmStatusChange}>Xác nhận</Button>
      </Modal>
    </Stack>
  );
}
