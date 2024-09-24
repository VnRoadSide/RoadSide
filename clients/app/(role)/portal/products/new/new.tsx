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
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { IconDownload, IconX, IconPhotoPlus } from "@tabler/icons-react";
import { useRef, useState } from "react";

type ProductViewProps = {
  categories: Category[],
}

export function AddProductView({ categories }: ProductViewProps) {
  const openRef = useRef<() => void>(null);
  const form = useForm<Product>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      baseUnitPrice: 0,
      unit: "",
      category: null,
      vendor: null,
      vouchers: [],
      brand: "",
      quantity: 0,
      shippingProvider: "",
      deliveryTime: "",
      shippingFee: 0,
      preOrder: false,
      returnPolicy: "",
      additionalNotes: "",
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
      preOrder: validator.preOrder,
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

  return (
    <Stack>
      <form onSubmit={form.onSubmit((values) => addProduct(values))}>
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
                  <Group justify="center">
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
                        <Group mt="sm" gap="sm">
                          {previews}
                        </Group>
                      ) : (
                        <IconPhotoPlus
                          style={{ width: rem(50), height: rem(50) }}
                          stroke={1.5}
                        />
                      )}
                    </Dropzone.Idle>
                  </Group>

                  <Text ta="center" fw={700} fz="lg" mt="xl">
                    <Dropzone.Accept>Drop files here</Dropzone.Accept>
                    <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                    {files.length > 0 ? (
                      <Dropzone.Idle>Thay đổi hình ảnh</Dropzone.Idle>
                    ) : (
                      <Dropzone.Idle>Thêm hình ảnh</Dropzone.Idle>
                    )}
                  </Text>
                  <Text ta="center" fz="sm" mt="xs" c="dimmed">
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
              {...form.getInputProps('name')} 
            />

            <CategoryPicker categories={categories} onSelect={() => {}} />
            
            <TextInput 
              label="Mô tả sản phẩm"
              placeholder="Nhập mô tả của sản phẩm" 
              withAsterisk
              {...form.getInputProps('description')} 
            />
          </SimpleGrid>
        </Card>
        
        <Card>
          <Title order={2}>Thông tin bán hàng</Title>
          <SimpleGrid cols={2} spacing="md" mt="md">
            <TextInput
              label="Thương hiệu"
              placeholder="Vui lòng nhập"
              withAsterisk
              {...form.getInputProps('brand')}
            />
            <TextInput 
              label="Xuất xứ" 
              placeholder="Vui lòng nhập" 
              withAsterisk 
              {...form.getInputProps('origin')}
            />
            <TextInput
              label="Đơn vị bán"
              placeholder="kg / hộp / 100g"
              withAsterisk
              {...form.getInputProps('unit')}
            />
            <NumberInput
              label="Đơn giá (đồng)"
              placeholder="100000"
              min={0}
              step={1000}
              withAsterisk
              {...form.getInputProps('baseUnitPrice')}
            />
            <NumberInput
              label="Số lượng"
              placeholder="Vui lòng nhập số nguyên"
              min={1}
              withAsterisk
              {...form.getInputProps('quantity')}
            />
          </SimpleGrid>
        </Card>
        
        <Card>
          <Title order={2}>Vận chuyển</Title>
          <SimpleGrid cols={2} spacing="md" mt="md">
            <Select
              label="Chọn đơn vị vận chuyển"
              placeholder="Chọn đơn vị"
              data={[
                { value: "viettel", label: "Viettel Post" },
                { value: "vietnamPost", label: "Vietnam Post" },
              ]}
              searchable
              withAsterisk
              {...form.getInputProps('shippingProvider')}
            />

            <TextInput
              label="Thời gian giao hàng (ngày)"
              placeholder="Nhập số ngày dự kiến"
              withAsterisk
              {...form.getInputProps('deliveryTime')}
            />

            <NumberInput
              label="Phí vận chuyển (đồng)"
              placeholder="Nhập phí vận chuyển"
              min={0}
              step={5000}
              withAsterisk
              {...form.getInputProps('shippingFee')}
            />

            <TextInput
              label="Lưu ý về vận chuyển"
              placeholder="Nhập các lưu ý (nếu có)"
              {...form.getInputProps('shippingNote')}
            />
          </SimpleGrid>
        </Card>

        <Card>
          <Title order={2}>Thông tin khác</Title>
          <SimpleGrid cols={2} spacing="md" mt="md">
            <Radio.Group
              label="Hàng đặt trước"
              description="Sản phẩm này có sẵn để đặt trước?"
              withAsterisk
              {...form.getInputProps('preOrder')}
            >
              <Group mt="xs">
                <Radio value="yes" label="Có" />
                <Radio value="no" label="Không" />
              </Group>
            </Radio.Group>

            <TextInput
              label="Chính sách đổi trả"
              placeholder="Mô tả chính sách đổi trả"
              {...form.getInputProps('returnPolicy')}
            />

            <TextInput 
              label="Lưu ý thêm" 
              placeholder="Nhập lưu ý nếu có" 
              {...form.getInputProps('additionalNotes')}
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
