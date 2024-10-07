"use client";
import CategoryPicker from "@/components/CategoryPicker";
import { uploadMedia } from "@/lib/media";
import { addProduct } from "@/lib/product";
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

type ProductViewProps = {
  categories: Category[];
  vouchers: Vouchers[];
  session: Session | null;
};

export function AddProductView({ categories, vouchers, session }: ProductViewProps) {
  const openRef = useRef<() => void>(null);
  const form = useForm<Product>({
    mode: "controlled",
    initialValues: {
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

  const onSubmit = (values: Product) => {
    addProduct(values, session);
  };

  const handleUpload = async (acceptedFiles: File[]) => {
    const url = await uploadMedia(acceptedFiles[0], session);
    console.log(url);
    if (url) {
      setFiles(acceptedFiles);
      form.setFieldValue("imageUrl", url);
    }
  };

  return (
    <Stack>
      <form onSubmit={form.onSubmit(onSubmit)}>
        {/* Thông tin cơ bản */}
        <Card>
          <Title order={2}>Thông tin cơ bản</Title>
          <SimpleGrid cols={2} mt="md" spacing="md">
            <Text>Hình ảnh sản phẩm</Text>
            <Card radius="md" shadow="md" withBorder>
              <Dropzone
                openRef={openRef}
                onDrop={handleUpload}
                onReject={(rejectedFiles) =>
                  console.log("rejected files", rejectedFiles)
                }
                radius="md"
                accept={[MIME_TYPES.jpeg]}
                maxSize={30 * 1024 ** 2}
              >
                <div style={{ pointerEvents: "none" }}>
                  <Group>
                    <Dropzone.Accept>
                      <IconDownload
                        style={{ width: rem(50), height: rem(50) }}
                        stroke={1.5}
                      />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX
                        style={{ width: rem(50), height: rem(50) }}
                        stroke={1.5}
                      />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      {files.length > 0 ? (
                        <Group mt="sm">{previews}</Group>
                      ) : (
                        <IconPhotoPlus
                          style={{ width: rem(50), height: rem(50) }}
                          stroke={1.5}
                        />
                      )}
                    </Dropzone.Idle>
                  </Group>

                  <Text w={700} size="lg" mt="xl">
                    <Dropzone.Accept>Kéo thả tệp tại đây</Dropzone.Accept>
                    <Dropzone.Reject>
                      Tệp phải là .jpeg và nhỏ hơn 30MB
                    </Dropzone.Reject>
                    {files.length > 0 ? (
                      <Dropzone.Idle>Thay đổi hình ảnh</Dropzone.Idle>
                    ) : (
                      <Dropzone.Idle>Thêm hình ảnh</Dropzone.Idle>
                    )}
                  </Text>
                  <Text size="sm" mt="xs" c="dimmed">
                    Kéo thả tệp tại đây để tải lên. Lưu ý chỉ chấp nhận tệp có
                    đuôi <i>.jpeg</i> kích thước dưới 30MB.
                  </Text>
                </div>
              </Dropzone>

              <Button
                size="md"
                radius="xl"
                mt={"sm"}
                onClick={() => openRef.current?.()}
              >
                Chọn tệp
              </Button>
            </Card>

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

        {/* Thông tin bán hàng */}
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
              searchable
              withAsterisk
              onChange={(v) => form.setFieldValue("vouchers", vouchers.filter((voucher) => v.includes(voucher.id)))}
              />
          </SimpleGrid>
        </Card>

        <Group mt="md">
          <Button type="submit">Thêm sản phẩm</Button>
        </Group>
      </form>
    </Stack>
  );
}
