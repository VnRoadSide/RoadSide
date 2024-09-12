import { OrderStatus } from "@/models";
import { Badge } from "@mantine/core";

const orderStatusDict = {
  [OrderStatus.Pending]: {value: "Chờ xác nhận", color: "orange"},
  [OrderStatus.InStock]: {value: "Chờ lấy hàng", color: "yellow"},
  [OrderStatus.OnTheWay]: {value: "Đang giao", color: "blue"},
  [OrderStatus.Delivered]: {value: "Đã giao", color: "green"},
  [OrderStatus.Cancelled]: {value: "Đơn huỷ", color: "dimmed"},
  [OrderStatus.Refunded]: {value: "Trả hàng", color: "red"}
}

export default function OrderStatusBadge({ orderStatus }: { orderStatus: OrderStatus }) {
  return <Badge color={orderStatusDict[orderStatus].color}>{orderStatusDict[orderStatus].value}</Badge>
}