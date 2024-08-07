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
    <TableTr>
      <TableTd>
        <Checkbox checked={item.selected} onClick={() => onUpdate({...item, selected: !item.selected})}/>
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
  const [{ value, isClient }, setValue] = useCart();

  function onChange(item: OrderItem) {
    setValue(value.map((p) => (p.id === item.id ? item : p)));
  }

  return (
    <Paper radius="md" p="xs" shadow="lg">
      {value.length > 0 && (
        <Table>
          <TableThead>
            <TableTr>
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
          </TableTbody>
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
 
  const handleCheckout = () => {
    
  }
  
  const total = value.reduce(
    (total, item) => total + (item.selected ? item.product.baseUnitPrice * item.quantity : 0),
    0
  );
  const selected = value.reduce(
    (total, item) => total + item.quantity,
    0
  );


  return (
    <Paper
      radius="md"
      p="xs"
      shadow="lg"
      style={{ position: "sticky", bottom: 0, left: 0, right: 0, zIndex: 1 }}
    >
      <Stack p="md">
        <Grid grow>
          <GridCol span={6}>
            <Checkbox label={`Chọn Tất Cả (${value.length})`} checked={selectAll} onClick={handleSelectAll}/>
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
            <Button disabled={selected === 0} size="md">Mua Hàng</Button>
          </GridCol>
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
