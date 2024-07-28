import React from "react";
import {
  Tabs,
  Button,
  Select,
  Group,
  Table,
  Title,
  Space,
  Container,
  TextInput,
} from "@mantine/core";
import ProfileSection from "@/components/ProfileSection";
import { sections } from ".";
import { environment } from "@/environment";
import { GetServerSideProps } from "next";

export default function ProductManagement() {
  return (
    <ProfileSection urls={sections}>
      <Title order={2}>Sản phẩm</Title>
      <Space h="md" />
      <Tabs defaultValue="all">
        <Tabs.List>
          <Tabs.Tab value="all">Tất cả</Tabs.Tab>
          <Tabs.Tab value="active">Đang hoạt động</Tabs.Tab>
          <Tabs.Tab value="violations">Vi phạm</Tabs.Tab>
          <Tabs.Tab value="pending">Chờ duyệt bởi Shopee</Tabs.Tab>
          <Tabs.Tab value="unpublished">Chưa được đăng</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="all">
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
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Tên sản phẩm</Table.Th>
                <Table.Th>Doanh số</Table.Th>
                <Table.Th>Giá</Table.Th>
                <Table.Th>Kho hàng</Table.Th>
                <Table.Th>Chất Lượng Nội Dung</Table.Th>
                <Table.Th>Thao tác</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td colSpan={6}>0 Sản phẩm</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Tabs.Panel>

        {/* Repeat Tabs.Panel for each tab with specific content if needed */}
      </Tabs>
    </ProfileSection>
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
