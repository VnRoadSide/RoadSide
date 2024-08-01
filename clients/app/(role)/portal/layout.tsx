import { Url } from "@/models/routing";
import { useUrl } from "@/utils/useUrl";
import { ReactNode, useEffect } from "react";

const navigation: Url[] = [
    {
      label: "Quản Lý Shop",
      href: "/portal",
    },
    {
      label: "Thông báo của tôi",
      href: "portal/notification",
    },
    {
      label: "Quản Lý Đơn Hàng",
      href: "/portal/orders",
    },
    {
      label: "Quản Lý Sản Phẩm",
      href: "/portal/products",
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
  const { registerUrls } = useUrl();

  useEffect(() => {
    registerUrls(navigation);
  }, [registerUrls]);

  return <>{children}</>;
}
