"use client";
import CategoryPicker from "@/components/CategoryPicker";
import { addProduct } from "@/lib/product";
import { validator } from "@/lib/validator";
import { Category, Product } from "@/models";
import {
  Stack,
  Card,
  Title,
  Text,
  Button,
  Group,
  TextInput,
  Select,
  rem,
  SimpleGrid,
  NumberInput,
  Radio,
  Image,
  Checkbox,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { IconDownload, IconX, IconPhotoPlus } from "@tabler/icons-react";
import { useRef, useState } from "react";

type ProductViewProps = {
  categories: Category[];
};

export function AddProductView({ categories }: ProductViewProps) {
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
      brand: "",
      origin: "",
      quantity: 0,
      shippingProvider: "",
      deliveryTime: "",
      shippingFee: 0,
      shippingNote: "",
      preOrder: false,
      returnPolicy: "",
      additionalNotes: "",
      temperatureControlRequired: false,
      storageTemperature: 0,
      packagingRequirements: "",
    },
    validate: {
      name: validator.name,
      description: validator.description,
      brand: validator.brand,
      origin: validator.origin,
      unit: validator.unit,
      baseUnitPrice: validator.baseUnitPrice,
      quantity: validator.quantity,
      shippingProvider: validator.shippingProvider,
      deliveryTime: validator.deliveryTime,
      shippingFee: validator.shippingFee,
      shippingNote: validator.shippingNote,
      temperatureControlRequired: validator.temperatureControlRequired,
      storageTemperature: (value, values) =>
        values.temperatureControlRequired && value == null
          ? "Vui lòng nhập nhiệt độ bảo quản"
          : null,
      packagingRequirements: validator.packagingRequirements,
      returnPolicy: validator.returnPolicy,
      additionalNotes: validator.additionalNotes,
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
    addProduct(values);
  };

  return (
    <Stack>
      <form onSubmit={form.onSubmit(onSubmit)}>
        {/* Thông tin cơ bản */}
        <Card>
          <Title order={2}>Thông tin cơ bản</Title>
          <SimpleGrid cols={2}>
            <Text>Hình ảnh sản phẩm</Text>
            <Card radius="md" shadow="md" withBorder>
              <Dropzone
                openRef={openRef}
                onDrop={(acceptedFiles) => {
                  setFiles(acceptedFiles);
                  console.log("accepted files", acceptedFiles);
                }}
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
              label="Thương hiệu"
              placeholder="Vui lòng nhập"
              withAsterisk
              {...form.getInputProps("brand")}
            />
            <TextInput
              label="Xuất xứ"
              placeholder="Vui lòng nhập"
              withAsterisk
              {...form.getInputProps("origin")}
            />
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
              {...form.getInputProps("quantity")}
            />
          </SimpleGrid>
        </Card>

        {/* Vận chuyển */}
        <Card>
          <Title order={2}>Vận chuyển</Title>
          <SimpleGrid cols={2} spacing="md" mt="md">
            <Select
              label="Chọn đơn vị vận chuyển"
              placeholder="Chọn đơn vị"
              data={[
                { value: "viettel_fresh", label: "Viettel Post Fresh" },
                {
                  value: "vietnam_post_agri",
                  label: "Vietnam Post Agriculture",
                },
                {
                  value: "local_coop",
                  label: "Đơn vị vận chuyển hợp tác xã địa phương",
                },
              ]}
              searchable
              withAsterisk
              {...form.getInputProps("shippingProvider")}
            />

            <Checkbox
              label="Yêu cầu kiểm soát nhiệt độ"
              description="Sản phẩm có yêu cầu vận chuyển trong điều kiện nhiệt độ kiểm soát?"
              {...form.getInputProps('temperatureControlRequired', { type: 'checkbox' })}
            />
            {form.values.temperatureControlRequired && (
              <NumberInput
                label="Nhiệt độ bảo quản (°C)"
                placeholder="Nhập nhiệt độ bảo quản"
                min={-20}
                max={10}
                step={0.5}
                withAsterisk
                {...form.getInputProps("storageTemperature")}
              />
            )}

            <TextInput
              label="Yêu cầu đóng gói"
              placeholder="Nhập các yêu cầu đóng gói (nếu có)"
              {...form.getInputProps("packagingRequirements")}
            />

            <NumberInput
              label="Thời gian giao hàng (giờ)"
              placeholder="Nhập số giờ dự kiến"
              min={1}
              withAsterisk
              {...form.getInputProps("deliveryTime")}
            />

            <NumberInput
              label="Phí vận chuyển (đồng)"
              placeholder="Nhập phí vận chuyển"
              min={0}
              step={5000}
              withAsterisk
              {...form.getInputProps("shippingFee")}
            />

            <TextInput
              label="Lưu ý về vận chuyển"
              placeholder="Nhập các lưu ý (nếu có)"
              {...form.getInputProps("shippingNote")}
            />
          </SimpleGrid>
        </Card>

        {/* Thông tin khác */}
        <Card>
          <Title order={2}>Thông tin khác</Title>
          <SimpleGrid cols={2} spacing="md" mt="md">
            <Checkbox
              label="Hàng đặt trước"
              description="Sản phẩm này có sẵn để đặt trước?"
              {...form.getInputProps('preOrder', { type: 'checkbox' })}
            />

            <TextInput
              label="Chính sách đổi trả"
              placeholder="Mô tả chính sách đổi trả"
              {...form.getInputProps("returnPolicy")}
            />

            <TextInput
              label="Lưu ý thêm"
              placeholder="Nhập lưu ý nếu có"
              {...form.getInputProps("additionalNotes")}
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
