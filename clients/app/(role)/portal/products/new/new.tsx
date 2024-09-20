"use client";
import CategoryPicker from "@/components/CategoryPicker";
import { Category } from "@/models";
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
import { IconDownload, IconX, IconPhotoPlus } from "@tabler/icons-react";
import { useRef, useState } from "react";

export function AddProductView({ categories }: { categories: Category[] }) {
  const openRef = useRef<() => void>(null);
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
          <Text>Tên sản phẩm</Text>
          <TextInput placeholder="Nhập tên sản phẩm" />

          <CategoryPicker categories={categories} onSelect={() => {}} />
          <Text>Mô tả sản phẩm</Text>
          <TextInput placeholder="Nhập mô tả của sản phẩm" />
        </SimpleGrid>
      </Card>
      <Card>
        <Title order={2}>Thông tin bán hàng</Title>
        <SimpleGrid cols={2} spacing="md" mt="md">
          <TextInput
            label="Thương hiệu"
            placeholder="Vui lòng nhập"
            withAsterisk
          />
          <TextInput label="Xuất xứ" placeholder="Vui lòng nhập" withAsterisk />
          <TextInput
            label="Thành phần"
            placeholder="Vui lòng nhập"
            withAsterisk
          />
          <TextInput
            label="Đơn vị bán"
            placeholder="kg / hộp / 100g"
            withAsterisk
          />
          <NumberInput
            label="Đơn giá (đồng)"
            placeholder="100000"
            min={0}
            step={1000}
            withAsterisk
          />
          <NumberInput
            label="Số lượng"
            placeholder="Vui lòng nhập số nguyên"
            min={1}
            withAsterisk
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
              { value: "ghn", label: "Giao Hàng Nhanh (GHN)" },
              { value: "ghtk", label: "Giao Hàng Tiết Kiệm (GHTK)" },
              { value: "viettel", label: "Viettel Post" },
            ]}
            searchable
            withAsterisk
          />

          <TextInput
            label="Thời gian giao hàng (ngày)"
            placeholder="Nhập số ngày dự kiến"
            withAsterisk
          />

          <NumberInput
            label="Phí vận chuyển (đồng)"
            placeholder="Nhập phí vận chuyển"
            min={0}
            step={5000}
            withAsterisk
          />

          <TextInput
            label="Lưu ý về vận chuyển"
            placeholder="Nhập các lưu ý (nếu có)"
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
          >
            <Group mt="xs">
              <Radio value="yes" label="Có" />
              <Radio value="no" label="Không" />
            </Group>
          </Radio.Group>

          <TextInput
            label="Chính sách đổi trả"
            placeholder="Mô tả chính sách đổi trả"
          />

          <TextInput label="Lưu ý thêm" placeholder="Nhập lưu ý nếu có" />
        </SimpleGrid>
      </Card>
    </Stack>
  );
}
