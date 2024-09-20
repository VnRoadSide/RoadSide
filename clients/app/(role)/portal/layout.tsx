import { RoleView } from "@/components/Role";
import { ReactNode } from "react";

const navigation = [
  {
    label: "Quản Lý Shop",
    href: "/portal",
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
  {
    label: "Kênh Marketing",
    href: "/portal/marketing",
  },
  {
    label: "Tài Chính",
    href: "/portal/finance",
  }
];

export default function PortalLayout({ children }: { children: ReactNode }) {
  return <RoleView urls={navigation}>{children}</RoleView>;
}
