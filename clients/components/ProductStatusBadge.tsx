import { Availability } from "@/models";
import { Badge } from "@mantine/core";

const productStatusDict: Record<Availability, { value: string; color: string }> = {
    [Availability.InStock]: {value: "Còn hàng", color: ""},
    [Availability.LowStock]: {value: "Sắp hết", color: "purple"},
    [Availability.OutOfStock]: {value: "Hết hàng", color: "red"},
    [Availability.PreOrder]: {value: "Đặt trước", color: "blue"},
}


export default function ProductStatusBadge1({ productStatus }: { productStatus: Availability }) {
    return <Badge size="lg" color={productStatusDict[productStatus].color}>{productStatusDict[productStatus].value}</Badge>
}
export function ProductStatusBadge2({ productStatus }: { productStatus: Availability }) {
  if(productStatus !== Availability.InStock)
    return <Badge size="lg" pos="absolute" color={productStatusDict[productStatus].color}>{productStatusDict[productStatus].value}</Badge>
}