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
    label: "Voucher hiện có",
    href: "/me/voucher",
  },
];

export default function MeLayout({ children }: { children: ReactNode }) {
  return <RoleView urls={navigation}>{children}</RoleView>;
}
