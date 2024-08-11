"use client";
import { Category } from "@/models";
import {
  Stack,
  Card,
  Title,
  Text,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
  Button,
  Group,
  TextInput,
  MultiSelect,
  Select,
} from "@mantine/core";

export function AddProductView({ categories }: { categories: Category[] }) {
  return (
    <Stack>
      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTab value="basic">Thông tin cơ bản</TabsTab>
          <TabsTab value="sale">Thông tin bán hàng</TabsTab>
          <TabsTab value="shipping">Vận chuyển</TabsTab>
          <TabsTab value="other">Thông tin khác</TabsTab>
        </TabsList>
        <TabsPanel value="basic">
          <Card>
            <Title order={2}>Thông tin cơ bản</Title>
            <Group mt="md" mb="md">
                <Text>Hình ảnh sản phẩm</Text>
                <TextInput></TextInput>
            </Group>
            <Group mt="md" mb="md">
                <Text>Tên sản phẩm</Text>
                <TextInput></TextInput>
            </Group>
            <Group>
                <Text>Chọn danh mục</Text>
                <Select
                data={categories.map((category) => category.name)}
                searchable
                />
            </Group>
            <Group mt="md" mb="md">
                <Text>Mô tả sản phẩm</Text>
                <TextInput></TextInput>
            </Group>
          </Card>

        </TabsPanel>
      </Tabs>
    </Stack>
  );
}
