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
  Image,
} from "@mantine/core";
import { Product } from "@/models";

export function ProductManagement({
  data,
  total,
}: {
  data: Product[];
  total: number;
}) {
  const rows = data.map((item, index) => (
    <TableTr key={index}>
      <TableTd>
        <Image src={item.imageUrl} alt="no image here" height={50} w={50} />
      </TableTd>
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
            <Button
              component="a"
              variant="outline"
              style={{ flex: 0.5 }}
              href="/portal/products/new"
            >
              Thêm
            </Button>
          </Group>

          {/* Products Table */}
          <Table mt="md">
            <TableThead>
              <TableTr>
                <TableTh></TableTh>
                <TableTh>Tên sản phẩm</TableTh>
                <TableTh>Đã bán</TableTh>
                <TableTh>Giá</TableTh>
                <TableTh>Kho hàng</TableTh>
                <TableTh>Mô tả</TableTh>
                <TableTh>Thao tác</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>{rows}</TableTbody>
          </Table>
        </TabsPanel>

        {/* Repeat Tabs.Panel for each tab with specific content if needed */}
      </Tabs>
    </>
  );
}
