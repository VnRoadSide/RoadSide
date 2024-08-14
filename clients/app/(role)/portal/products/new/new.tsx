"use client";
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
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconDownload, IconX, IconPhotoPlus } from "@tabler/icons-react";
import { useRef } from "react";

export function AddProductView({ categories }: { categories: Category[] }) {
  const openRef = useRef<() => void>(null);
  return (
    <Stack>
      <Card>
        <Title order={2}>Thông tin cơ bản</Title>
        <SimpleGrid cols={2}>
          <Text>Hình ảnh sản phẩm</Text>
          <Card radius="md" shadow="md" withBorder>
            <Dropzone
              openRef={openRef}
              onDrop={() => {}}
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
                    <IconPhotoPlus
                      style={{ width: rem(50), height: rem(50) }}
                      stroke={1.5}
                    />
                  </Dropzone.Idle>
                </Group>

                <Text ta="center" fw={700} fz="lg" mt="xl">
                  <Dropzone.Accept>Drop files here</Dropzone.Accept>
                  <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                  <Dropzone.Idle>Thêm hình ảnh</Dropzone.Idle>
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

          <Text>Chọn danh mục</Text>
          <Select
            placeholder="Chọn danh mục"
            data={categories.map((category) => category.name)}
            searchable
          />
          <Text>Mô tả sản phẩm</Text>
          <TextInput placeholder="Nhập mô tả của sản phẩm" />
        </SimpleGrid>
      </Card>
      <Card>
        <Title order={2}>Thông tin bán hàng</Title>
        <SimpleGrid cols={2}>
          <Group>
            <Text> Thương hiệu</Text>
            <TextInput placeholder="Vui lòng nhập" />
          </Group>
          <Group>
            <Text> Xuất xứ</Text>
            <TextInput placeholder="Vui lòng nhập" />
          </Group>
          <Group>
            <Text> Thành phần </Text>
            <TextInput placeholder="Vui lòng nhập" />
          </Group>
          <Group>
            <Text> Đơn vị bán </Text>
            <TextInput placeholder="kg / hộp / 100g" />
          </Group>
          <Group>
            <Text> Đơn giá (đồng)</Text>
            <NumberInput placeholder="100000" />
          </Group>
          <Group>
            <Text> Số lượng</Text>
            <NumberInput placeholder="Vui lòng nhập số nguyên" />
          </Group>
        </SimpleGrid>
      </Card>
      <Card>
        <Title order={2}>Vận chuyển</Title>
      </Card>
      <Card>
        <Title order={2}>Thông tin khác</Title>
        <Group>
          <Text>Hang dat truoc</Text>
          <Radio.Group
            name="favoriteFramework"
            label="Select your favorite framework/library"
            description="This is anonymous"
            withAsterisk
          >
            <Group mt="xs">
              <Radio value="react" label="React" />
              <Radio value="svelte" label="Svelte" />
              <Radio value="ng" label="Angular" />
              <Radio value="vue" label="Vue" />
            </Group>
          </Radio.Group>
        </Group>
      </Card>
    </Stack>
  );
}
