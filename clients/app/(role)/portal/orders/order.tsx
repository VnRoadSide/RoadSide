"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for client-side routing
import {
  Autocomplete,
  Card,
  Stack,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Title,
  Image,
  Group,
  TableTr,
  Table,
  TableTbody,
  TableTh,
  TableTd,
  TableThead,
  Badge,
  Select,
  Modal,
  Button,
} from "@mantine/core";
import { Orders, OrderStatus, OrderStatusType } from "@/models/orders";
import { getCurrentPrice } from "@/lib/utils";

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

  // State to manage the selected order for status change and confirmation modal
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatusType | null>(
    null
  );
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Function to update the status in the query string (for tabs)
  const handleTabChange = (newStatus: string | null) => {
    if (newStatus === null) {
      router.push("/portal/orders");
    } else {
      router.push(`/portal/orders?status=${newStatus}`);
    }
  };

  // Open confirmation modal when a status is selected
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
        console.log(
          `Order ${selectedOrderId} updated to status ${selectedStatus}`
        );
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
                  {/* Color-coded status badge */}
                  <Group>
                    <Select
                      placeholder="Thay đổi trạng thái"
                      value={OrderStatus[data.orderStatus!] as unknown as string} // Map current status to the enum
                      onChange={(newStatus: string | null) =>
                        handleStatusChange(data.id, newStatus)
                      }
                      data={[
                        { value: "pending", label: "Chờ xác nhận" },
                        { value: "pickup", label: "Chờ lấy hàng" },
                        { value: "shipping", label: "Đang giao" },
                        { value: "delivered", label: "Đã giao" },
                        { value: "cancelled", label: "Đơn Huỷ" },
                        { value: "refunded", label: "Trả hàng/Hoàn tiền" },
                      ]}
                    />
                    <Badge color={getStatusColor(OrderStatus[data.orderStatus!] as OrderStatusType)}>{OrderStatus[data.orderStatus!]}</Badge>
                  </Group>
                </Group>

                {/* Product table */}
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
                  {data.items.map((item, index) => (
                    <TableTbody key={index}>
                      <TableTr>
                        <TableTd>
                          <Image
                            src={item.product.imageUrl}
                            alt="no image here"
                            height={50}
                            w={50}
                          />
                        </TableTd>
                        <TableTd>{item.product.name}</TableTd>
                        <TableTd>
                          {getCurrentPrice(item.product).toLocaleString()}
                        </TableTd>
                        <TableTd>{item.quantity}</TableTd>
                        <TableTd>
                          {(
                            getCurrentPrice(item.product) * item.quantity
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
        ) : (
          <p>Không có đơn hàng hiện ở trạng thái này.</p>
        )}
      </Tabs>

      {/* Confirmation modal for status change */}
      <Modal
        opened={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Xác nhận thay đổi trạng thái"
      >
        <p>Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng này không?</p>
        <Button onClick={confirmStatusChange}>Xác nhận</Button>
      </Modal>
    </Stack>
  );
}

// Utility function to get color based on status
function getStatusColor(status: OrderStatusType) {
  switch (status) {
    case "delivered":
      return "green";
    case "cancelled":
      return "red";
    case "shipping":
      return "blue";
    case "pickup":
      return "yellow";
    default:
      return "gray";
  }
}
