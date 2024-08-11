"use client";
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
  NavLink,
} from "@mantine/core";
import { Product } from "@/models";

export function ProductManagement({products}: {products: Product[]}) {
    const rows = products.map(( item, index) => (
        <TableTr key={index}>
          <TableTd>{item.name}</TableTd>
          <TableTd>{item.sale}</TableTd>
          <TableTd>{item.baseUnitPrice}</TableTd>
          <TableTd>100</TableTd>
          <TableTd>{item.description}</TableTd>
          <TableTd>
            <Button variant="outline">Xem chi tiết</Button>
          </TableTd>
        </TableTr>
      ));
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
            <Button component="a" variant="outline" style={{ flex: 0.5 }} href="/portal/products/new">
              Thêm
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
              {rows}
            </TableTbody>
          </Table>
        </TabsPanel>

        {/* Repeat Tabs.Panel for each tab with specific content if needed */}
      </Tabs>
      </>
  );
}

