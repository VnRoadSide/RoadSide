"use client"; // This must be a client-side component

import CategoryPicker from "@/components/CategoryPicker";
import { uploadMedia } from "@/lib/media";
import { addOrUpdateProduct } from "@/lib/product"; // Conditionally handle add/update
import { validator } from "@/lib/validator";
import { Availability, Category, Product, Vouchers } from "@/models";
import {
  Stack,
  Card,
  Title,
  Text,
  Button,
  Group,
  TextInput,
  rem,
  SimpleGrid,
  NumberInput,
  Image,
  MultiSelect,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { IconDownload, IconX, IconPhotoPlus } from "@tabler/icons-react";
import { Session } from "next-auth";
import { useRef, useState } from "react";
import MediaPicker from "./MediaPicker";

type ProductFormProps = {
  categories: Category[];
  vouchers: Vouchers[];
  session: Session | null;
  initialProduct?: Product; // Optional for editing, not needed for adding new products
  isEdit?: boolean; // Flag to determine whether the form is for editing
};

export function ProductForm({
  categories,
  vouchers,
  session,
  initialProduct,
  isEdit = false,
}: ProductFormProps) {
  console.log("initialProduct", initialProduct);
  const openRef = useRef<() => void>(null);
  const form = useForm<Product>({
    mode: "controlled",
    initialValues: initialProduct || {
      name: "",
      description: "",
      baseUnitPrice: 0,
      unit: "",
      category: null,
      vendor: null,
      vouchers: [],
      availability: Availability.InStock,
      InstockQuantity: 0,
      imageUrl: "",
    },
    validate: {
      name: validator.name,
      description: validator.description,
      unit: validator.unit,
      baseUnitPrice: validator.baseUnitPrice,
      InstockQuantity: validator.quantity,
    },
  });

  const [files, setFiles] = useState<File[]>([]);
  const previews = files.map((file, index) => (
    <Image
      key={index}
      src={URL.createObjectURL(file)}
      alt={file.name}
      width={100}
      height={100}
      fit="cover"
    />
  ));

  const handleSubmit = async (values: Product) => {
    if (isEdit && initialProduct) {
      await addOrUpdateProduct({ ...values, id: initialProduct.id }, session);
    } 
    await addOrUpdateProduct(values, session); // Add new product
  };

  const handleUpload = async (acceptedFiles: File[]) => {
    const url = await uploadMedia(acceptedFiles[0], session);
    if (url) {
      setFiles(acceptedFiles);
      form.setFieldValue("imageUrl", url);
    }
  };

  return (
    <Stack>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Card>
          <Title order={2}>Thông tin cơ bản</Title>
          <SimpleGrid cols={2} mt="md" spacing="md">
            <Text>Hình ảnh sản phẩm</Text>
            <MediaPicker
              session={session}
              initialFileUrl={form.values.imageUrl} // Pass the initial URL if editing a product
              onUpload={(url) => form.setFieldValue("imageUrl", url)} // Update form with the uploaded URL
            />

            <TextInput
              label="Tên sản phẩm"
              placeholder="Nhập tên sản phẩm"
              withAsterisk
              {...form.getInputProps("name")}
            />
            <CategoryPicker
              label="Danh mục"
              placeholder="Chọn danh mục"
              withAsterisk
              initialValue={form.values.category}
              categories={categories}
              onSelect={(category) => form.setFieldValue("category", category)}
            />
            <TextInput
              label="Mô tả sản phẩm"
              placeholder="Nhập mô tả của sản phẩm"
              withAsterisk
              {...form.getInputProps("description")}
            />
          </SimpleGrid>
        </Card>

        <Card>
          <Title order={2}>Thông tin bán hàng</Title>
          <SimpleGrid cols={2} spacing="md" mt="md">
            <TextInput
              label="Đơn vị bán"
              placeholder="kg / hộp / 100g"
              withAsterisk
              {...form.getInputProps("unit")}
            />
            <NumberInput
              label="Đơn giá (đồng)"
              placeholder="100000"
              min={0}
              step={1000}
              withAsterisk
              {...form.getInputProps("baseUnitPrice")}
            />
            <NumberInput
              label="Số lượng"
              placeholder="Vui lòng nhập số nguyên"
              min={1}
              withAsterisk
              {...form.getInputProps("InstockQuantity")}
            />
            <MultiSelect
              label="Mã giảm giá"
              hidePickedOptions
              data={vouchers.map((voucher) => ({
                value: voucher.id,
                label: voucher.code,
              }))}
              value={form.values.vouchers.map((voucher) => voucher.id)}
              searchable
              withAsterisk
              onChange={(v) =>
                form.setFieldValue(
                  "vouchers",
                  vouchers.filter((voucher) => v.includes(voucher.id))
                )
              }
            />
          </SimpleGrid>
        </Card>

        <Group mt="md">
          <Button type="submit">
            {isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
          </Button>
        </Group>
      </form>
    </Stack>
  );
}
