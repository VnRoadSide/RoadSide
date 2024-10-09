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
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { deleteProduct } from "@/lib/product";
import { Session } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import ProductStatusBadge from "@/components/ProductStatusBadge";
import ProductStatusBadge1 from "@/components/ProductStatusBadge";

function ProductRow({
  item,
  key,
  onDelete,
}: {
  item: Product;
  key: number;
  onDelete: () => void;
}) {
  const router = useRouter();
  return (
    <TableTr key={key}>
      <TableTd>
        <Image src={item.imageUrl} alt="no image here" height={50} w={50} />
      </TableTd>
      <TableTd>{item.name}</TableTd>
      <TableTd>{item.unit}</TableTd>
      <TableTd>{item.baseUnitPrice}</TableTd>
      <TableTd>{item.description}</TableTd>
      <TableTd>
        <ProductStatusBadge1 productStatus={item.availability} />
      </TableTd>
      <TableTd>
        <Button variant="outline" color="blue" onClick={() => router.push(`/portal/products/edit?id=${item.id}`)}>
          {" "}
          <IconEdit /> Chỉnh sửa{" "}
        </Button>
      </TableTd>
      <TableTd>
        <Button variant="outline" color="red" onClick={onDelete}>
          {" "}
          <IconTrash /> Xoá{" "}
        </Button>
      </TableTd>
    </TableTr>
  );
}

export function ProductManagement({
  data,
  total,
  session
}: {
  data: Product[];
  total: number;
  session: Session | null
}) {
  const handleDelete = (key: number) => {
    data.splice(key, 1);
  };
  return (
    <>
      <Title order={2}>Sản phẩm</Title>
      <Space h="md" />
          {/* Products Table */}
          <Table mt="md">
            <TableThead>
              <TableTr>
                <TableTh></TableTh>
                <TableTh>Tên sản phẩm</TableTh>
                <TableTh>Đơn vị</TableTh>
                <TableTh>Giá</TableTh>
                <TableTh>Mô tả</TableTh>
                <TableTh>Trạng thái</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {data.map((item, index) => (
                <ProductRow
                  key={index}
                  item={item}
                  onDelete={() => handleDelete(index)}
                />
              ))}
            </TableTbody>
          </Table>
    </>
  );
}
