"use client";
import { Url } from "@/models/routing";
import { useUrl } from "@/utils/useUrl";
import { ReactNode, useEffect } from "react";

const navigation: Url[] = [
  {
    label: "Thông tin tài khoản",
    href: "/me",
  },
  {
    label: "Thông báo của tôi",
    href: "me/notification",
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
    href: "/customer-support",
  },
];

export default function MeLayout({ children }: { children: ReactNode }) {
  const { registerUrls } = useUrl();
  useEffect(() => {
    registerUrls({ "me": navigation });
  }, []);
  return <>{children}</>;
}
