import { RoleView } from "@/components/Role";
import { ReactNode } from "react";

const navigation = [
  {
    label: "Thông tin tài khoản",
    href: "/me",
  },
  {
    label: "Thông báo của tôi",
    href: "/me/notification",
  },
  {
    label: "Quản lý đơn hàng",
    href: "/me/orders",
  },
  {
    label: "Quản lý đổi trả",
    href: "/me/returns",
  },
  {
    label: "Sổ địa chỉ",
    href: "/me/addresses",
  },
  {
    label: "Thông tin thanh toán",
    href: "/me/payment-info",
  },
  {
    label: "Theo dõi",
    href: "/me/follow",
  },
  {
    label: "Hỗ trợ khách hàng",
    href: "/me/support",
  },
];

export default function MeLayout({ children }: { children: ReactNode }) {
  return <RoleView urls={navigation}>{children}</RoleView>;
}
