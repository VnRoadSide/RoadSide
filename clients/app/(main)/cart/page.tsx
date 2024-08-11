"use client";
import { OrderItem } from "@/models";
import useCart from "@/lib/hooks/useCart";
import {
  Button,
  Checkbox,
  Grid,
  GridCol,
  Group,
  NumberInput,
  Paper,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
  Title,
  UnstyledButton,
  Image,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

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
    <TableTr>
      <TableTd>
        <Checkbox
          checked={item.selected}
          onClick={() => onUpdate({ ...item, selected: !item.selected })}
        />
      </TableTd>
      <TableTd>
        <Image
          src={item.product.imageUrl}
          alt="no image here"
          height={50}
          w={50}
        />
      </TableTd>
      <TableTd>
        <Text w={300}>{item.product.name}</Text>
        <Text size="sm" c="dimmed">
          Miễn phí 15 ngày
        </Text>
      </TableTd>

      <TableTd>
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
      </TableTd>
      <TableTd>
        <NumberInput
          defaultValue={item.quantity}
          min={1}
          onChange={(val) =>
            onUpdate({ ...item, quantity: parseInt(val.toString()) })
          }
        />
      </TableTd>
      <TableTd w={100}>
        <Text>
          ₫{(item.product.baseUnitPrice * item.quantity).toLocaleString()}
        </Text>
      </TableTd>
      <TableTd>
        <Group justify="flex-end">
          <Button color="red" variant="light" onClick={onRemove}>
            Xóa
          </Button>
          <Button variant="light" onClick={onSuggest}>
            Tìm sản phẩm tương tự
          </Button>
        </Group>
      </TableTd>
    </TableTr>
  );
}

function OrderSection() {
  // Render product row using Mantine Table components
  const [{ items, session, isClient }, setValue] = useCart();

  function onChange(item: OrderItem) {
    const valueToSet = {
      items: items.map((p) => (p.id === item.id ? item : p)),
      session,
    };
    setValue(valueToSet);
  }

  function onRemove(item: OrderItem) {
    const valueToSet = {
      items: items.filter((p) => p.id !== item.id),
      session,
    };
    setValue(valueToSet);
  }

  return (
    <Paper radius="md" p="xs" shadow="lg">
      {items.length > 0 && (
        <Table>
          <TableThead>
            <TableTr>
              <TableTh></TableTh>
              <TableTh></TableTh>
              <TableTh>Sản Phẩm</TableTh>
              <TableTh>Đơn Giá</TableTh>
              <TableTh>Số Lượng</TableTh>
              <TableTh>Số Tiền</TableTh>
              <TableTh></TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            {isClient &&
              items.map((product) => (
                <ProductRow
                  key={product.id}
                  item={product}
                  onUpdate={onChange}
                  onRemove={() => onRemove(product)}
                />
              ))}
          </TableTbody>
        </Table>
      )}
    </Paper>
  );
}

export default function Cart() {
  // Render product row using Mantine Table components
  const [{ items, session, isClient }, setValue, getSession] = useCart();
  const [selectAll, setSelectedAll] = useState(items.every((p) => p.selected));
  const router = useRouter()

  useEffect(() => {
    setSelectedAll(items.every((p) => p.selected));
  }, [items]);

  const handleSelectAll = () => {
    setSelectedAll(!selectAll);
    const valueToSet = {
      session,
      items: items.map((p) => ({ ...p, selected: !selectAll })),
    };
    setValue(valueToSet);
  };

  const handleCheckout = async () => {
    await getSession();
    console.log(session);
    if (!session) {
      return;
    }
    setValue({
      items,
      session: session,
    });
    router.push(`/checkout/${session}`);
  };

  const total = items.reduce(
    (total, item) =>
      total + (item.selected ? item.product.baseUnitPrice * item.quantity : 0),
    0
  );
  const selected = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <Stack p="xl">
      <Title order={2} mb="lg">
        Giỏ hàng
      </Title>
      <OrderSection />
      <Paper
        radius="md"
        p="xs"
        shadow="lg"
        style={{ position: "sticky", bottom: 0, left: 0, right: 0, zIndex: 1 }}
      >
        <Stack p="md">
          <Grid grow>
            <GridCol span={6}>
              <Checkbox
                label={`Chọn Tất Cả (${items.length})`}
                checked={selectAll}
                onClick={handleSelectAll}
              />
            </GridCol>
            <GridCol
              span={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <UnstyledButton>Đưa vào mục Đã thích</UnstyledButton>
            </GridCol>
          </Grid>
          <Grid grow>
            <GridCol
              span={3}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text size="sm" c="dimmed">
                Tổng thanh toán ({selected} Sản phẩm):
              </Text>
            </GridCol>
            <GridCol
              span={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text size="lg">{total?.toLocaleString()}₫</Text>
            </GridCol>
            <GridCol
              span={1}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                disabled={selected === 0}
                onClick={handleCheckout}
                size="md"
              >
                Mua Hàng
              </Button>
            </GridCol>
          </Grid>
        </Stack>
      </Paper>
    </Stack>
  );
}
