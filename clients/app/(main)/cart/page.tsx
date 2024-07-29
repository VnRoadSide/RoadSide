import { OrderItem } from "@/models";
import useCart from "@/utils/useCart";
import {
  Button,
  Checkbox,
  Grid,
  Group,
  NumberInput,
  Paper,
  Stack,
  Table,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useState } from "react";

function ProductRow({
  item,
  onUpdate,
  onRemove,
  onSuggest,
}: {
  item: OrderItem;
  onUpdate: (val: OrderItem) => void;
  onRemove: () => void;
  onSuggest?: () => void;
}) {
  return (
    <Table.Tr>
      <Table.Td>
        <Checkbox checked={item.selected} onClick={() => onUpdate({...item, selected: !item.selected})}/>
      </Table.Td>
      <Table.Td>
        <Text w={300}>{item.product.name}</Text>
        <Text size="sm" c="dimmed">
          Miễn phí 15 ngày
        </Text>
      </Table.Td>

      <Table.Td>
        <Text
          c={item.product.discountedPrice ? "dimmed" : undefined}
          td={!!item.product.discountedPrice ? "line-through" : undefined}
        >
          {item.product.discountedPrice
            ? `₫${item.product.baseUnitPrice.toLocaleString()}`
            : ""}
        </Text>
        <Text>
          ₫
          {(
            item.product.discountedPrice ?? item.product.baseUnitPrice
          ).toLocaleString()}
        </Text>
      </Table.Td>
      <Table.Td>
        <NumberInput
          defaultValue={item.quantity}
          min={1}
          onChange={(val) =>
            onUpdate({ ...item, quantity: parseInt(val.toString()) })
          }
        />
      </Table.Td>
      <Table.Td w={100}>
        <Text>
          ₫{(item.product.baseUnitPrice * item.quantity).toLocaleString()}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group justify="flex-end">
          <Button color="red" variant="light" onClick={onRemove}>
            Xóa
          </Button>
          <Button variant="light" onClick={onSuggest}>
            Tìm sản phẩm tương tự
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}

function OrderSection() {
  // Render product row using Mantine Table components
  const [{ value, isClient }, setValue] = useCart();

  function onChange(item: OrderItem) {
    setValue(value.map((p) => (p.id === item.id ? item : p)));
  }

  return (
    <Paper radius="md" p="xs" shadow="lg">
      {value.length > 0 && (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>Sản Phẩm</Table.Th>
              <Table.Th>Đơn Giá</Table.Th>
              <Table.Th>Số Lượng</Table.Th>
              <Table.Th>Số Tiền</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {isClient &&
              value.map((product) => (
                <ProductRow
                  key={product.id}
                  item={product}
                  onUpdate={onChange}
                  onRemove={() =>
                    setValue(value.filter((p) => p.id !== product.id))
                  }
                />
              ))}
          </Table.Tbody>
        </Table>
      )}
    </Paper>
  );
}

function BannerSection() {
  // Render product row using Mantine Table components
  const [{ value, isClient }, setValue] = useCart();
  const [selectAll, setSelectedAll] = useState(value.every((p) => p.selected));

  useEffect(() => {
    setSelectedAll(value.every((p) => p.selected));
  }, [value]);

  const handleSelectAll = () => {
    setSelectedAll(!selectAll);
    setValue(value.map((p) => ({ ...p, selected: !selectAll })));
  };
  
  const total = value.reduce(
    (total, item) => total + item.product.baseUnitPrice * item.quantity,
    0
  );
  const selected = value.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const price = total.toLocaleString();

  return (
    <Paper
      radius="md"
      p="xs"
      shadow="lg"
      style={{ position: "sticky", bottom: 0, left: 0, right: 0, zIndex: 1 }}
    >
      <Stack p="md">
        <Grid grow>
          <Grid.Col span={6}>
            <Checkbox label={`Chọn Tất Cả (${value.length})`} checked={selectAll} onClick={handleSelectAll}/>
          </Grid.Col>
          <Grid.Col
            span={6}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <UnstyledButton>Đưa vào mục Đã thích</UnstyledButton>
          </Grid.Col>
        </Grid>
        <Grid grow>
          <Grid.Col
            span={3}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text size="sm" c="dimmed">
              Tổng thanh toán ({selected} Sản phẩm):
            </Text>
          </Grid.Col>
          <Grid.Col
            span={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Text size="lg">{price}₫</Text>
          </Grid.Col>
          <Grid.Col
            span={1}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button disabled={selected === 0} size="md">Mua Hàng</Button>
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
}

export default function Cart() {
  return (
    <Stack p="xl">
      <Title order={2} mb="lg">
        Giỏ hàng
      </Title>
      <OrderSection />
      <BannerSection />
    </Stack>
  );
}
