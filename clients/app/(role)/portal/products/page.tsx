import React from "react";
import {
  Tabs,
  Button,
  Group,
  Table,
  Title,
  Space,
  TextInput,
  TabsList,
  TabsTab,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  TabsPanel,
} from "@mantine/core";

export default function ProductManagement() {
  return (
    <>
      <Title order={2}>Sản phẩm</Title>
      <Space h="md" />
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTab value="all">Tất cả</TabsTab>
          <TabsTab value="active">Đang hoạt động</TabsTab>
          <TabsTab value="violations">Vi phạm</TabsTab>
          <TabsTab value="pending">Chờ duyệt bởi Shopee</TabsTab>
          <TabsTab value="unpublished">Chưa được đăng</TabsTab>
        </TabsList>

        <TabsPanel value="all">
          {/* Filter Section */}
          <Group pt="md" gap="md" align="end">
            <TextInput
              placeholder="Tìm Tên sản phẩm, SKU sản phẩm, SKU phân loại, Mã sản phẩm"
              style={{ flex: 2 }}
            />
            <TextInput
              placeholder="Tìm kiếm theo ngành hàng"
              style={{ flex: 2 }}
            />
            <Button variant="outline" style={{ flex: 0.5 }}>
              Áp dụng
            </Button>
            <Button variant="outline" style={{ flex: 0.5 }}>
              Nhập Lại
            </Button>
          </Group>

          {/* Products Table */}
          <Table mt="md">
            <TableThead>
              <TableTr>
                <TableTh>Tên sản phẩm</TableTh>
                <TableTh>Doanh số</TableTh>
                <TableTh>Giá</TableTh>
                <TableTh>Kho hàng</TableTh>
                <TableTh>Chất Lượng Nội Dung</TableTh>
                <TableTh>Thao tác</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              <TableTr>
                <TableTd colSpan={6}>0 Sản phẩm</TableTd>
              </TableTr>
            </TableTbody>
          </Table>
        </TabsPanel>

        {/* Repeat Tabs.Panel for each tab with specific content if needed */}
      </Tabs>
      </>
  );
}

// type ProductProps = {
//   products: any[];
// };

// export const getServerSideProps: GetServerSideProps<
//   ProductProps
// > = async () => {



//   return {
//     props: {
//       ...notification,
//     },
//   };
// };
