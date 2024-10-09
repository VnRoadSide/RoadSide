import { RoleView } from "@/components/Role";
import { Button } from "@mantine/core";
import { ReactNode } from "react";

const navigation = [
  {
    label: "Quản Lý Đơn hàng",
    href: "/portal/orders",
  },
  {
    label: "Thông báo của tôi",
    href: "/portal/notification",
  },
  {
    label: "Quản Lý Sản Phẩm",
    href: "/portal/products",
  },
  {
    label: "Thêm Sản Phẩm",
    href: "/portal/products/new",
  },
];

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <RoleView
      urls={navigation}
      
    >
      {children}
    </RoleView>
  );
}
