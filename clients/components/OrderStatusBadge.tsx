import { OrderStatus } from "@/models";
import { Badge } from "@mantine/core";

const orderStatusDict: Record<OrderStatus, { value: string; color: string }> = {
  [OrderStatus.pending]: {value: "Chờ xác nhận", color: "orange"},
  [OrderStatus.pickup]: {value: "Chờ lấy hàng", color: "yellow"},
  [OrderStatus.shipping]: {value: "Đang giao", color: "blue"},
  [OrderStatus.delivered]: {value: "Đã giao", color: "green"},
  [OrderStatus.cancelled]: {value: "Đơn huỷ", color: "gray"},
  [OrderStatus.refunded]: {value: "Trả hàng", color: "red"},
  [OrderStatus.all]: {value: "Tất cả", color: ""},
}


export default function OrderStatusBadge({ orderStatus }: { orderStatus: OrderStatus }) {
  return <Badge color={orderStatusDict[orderStatus].color}>{orderStatusDict[orderStatus].value}</Badge>
}