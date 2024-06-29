
import { Group, Image, Tabs, Paper } from "@mantine/core";
import { FuzzySearch } from "./Search";
import { useRouter } from "next/router";
import Link from "next/link";

export function HeaderMegaMenu() {
  const { push, asPath } = useRouter();
  const hideNavbar = asPath.startsWith("/shop") || asPath.startsWith("/admin");

  const tabValue = asPath.split("/")[1];

  if (hideNavbar) {
    return null;    
  }
  return (
    <Paper shadow="sm" variant="gradient">
      <Group
        component="nav"
        justify="space-between"
        h="100%"
        px="sm"
        pt={10}
      >
        <Group gap={4}>
          <Link href="/" >
            <Image src={"header_logo2.jpg"} alt="logo" h={50} />
          </Link>
          <FuzzySearch/>
        </Group>

        <Group gap={4} align="center" >
          <Tabs value={tabValue} onChange={(value) => push(`/${value}`)}>
            <Tabs.List h={60}>
              {/* <Tabs.Tab value="vendors" h={60}>Cửa hàng</Tabs.Tab> */}
              {/* <Tabs.Tab value="voucher" >Mã giảm giá</Tabs.Tab> */}
              <Tabs.Tab value="faq" >FAQ</Tabs.Tab>
              <Tabs.Tab value="contact">Liên hệ</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Group>
      </Group>
    </Paper>
  );
}
