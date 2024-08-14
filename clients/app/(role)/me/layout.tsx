import { RoleView } from "@/components/Role";
import { ReactNode } from "react";

const navigation = [
  {
    label: "Tài khoản của tôi",
    href: "/me",
  },
  {
    label: "Thông báo",
    href: "/me/notification",
  },
  {
    label: "Đơn mua",
    href: "/me/orders",
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
