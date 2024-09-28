"use client";

import { useState } from 'react';
import {
  Tabs,
  Text,
  Container,
  Group,
  Switch,
  Collapse,
  Button,
  Stack,
} from '@mantine/core';

const ShippingSettings = () => {
  const [fastShipping, setFastShipping] = useState(false);
  const [expressShipping, setExpressShipping] = useState(true);
  const [economyShipping, setEconomyShipping] = useState(false);

  const [fastOpen, setFastOpen] = useState(false);
  const [expressOpen, setExpressOpen] = useState(false);
  const [economyOpen, setEconomyOpen] = useState(false);

  return (
    <Stack>
      <Tabs defaultValue="shipping-companies">
        <Tabs.List>
          <Tabs.Tab value="shipping-companies">Đơn vị vận chuyển</Tabs.Tab>
          <Tabs.Tab value="shipping-documents">Chứng từ vận chuyển</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="shipping-companies" pt="xs">

          {/* Fast Shipping */}
          <Group  mt="md">
            <div>
              <Text w={500}>Hỏa Tốc</Text>
              <Text color="dimmed">Phương thức vận chuyển với tốc độ giao hàng nhanh nhất</Text>
            </div>
            <Switch
              checked={fastShipping}
              onChange={(event) => setFastShipping(event.currentTarget.checked)}
            />
          </Group>
          <Button variant="subtle" size="xs" onClick={() => setFastOpen(!fastOpen)}>
            {fastOpen ? 'Thu gọn' : 'Xem thêm'}
          </Button>
          <Collapse in={fastOpen}>
            <Text size="sm" mt="sm">
              Chi tiết về dịch vụ vận chuyển Hỏa Tốc...
            </Text>
          </Collapse>

          {/* Express Shipping */}
          <Group  mt="md">
            <div>
              <Text w={500}>Nhanh</Text>
              <Text c="dimmed">
                Với kênh Nhanh, người mua sẽ được trải nghiệm dịch vụ vận chuyển chuyên nghiệp, nhanh và đáng tin cậy.
              </Text>
            </div>
            <Switch
              checked={expressShipping}
              onChange={(event) => setExpressShipping(event.currentTarget.checked)}
            />
          </Group>
          <Button variant="subtle" size="xs" onClick={() => setExpressOpen(!expressOpen)}>
            {expressOpen ? 'Thu gọn' : 'Xem thêm'}
          </Button>
          <Collapse in={expressOpen}>
            <Text size="sm" mt="sm">
              Chi tiết về dịch vụ vận chuyển Nhanh...
            </Text>
          </Collapse>

          {/* Economy Shipping */}
          <Group  mt="md">
            <div>
              <Text w={500}>Tiết Kiệm</Text>
              <Text color="dimmed">
                Với kênh Tiết Kiệm, người mua sẽ được tận hưởng dịch vụ vận chuyển với giá thành hợp lý.
              </Text>
            </div>
            <Switch
              checked={economyShipping}
              onChange={(event) => setEconomyShipping(event.currentTarget.checked)}
            />
          </Group>
          <Button variant="subtle" size="xs" onClick={() => setEconomyOpen(!economyOpen)}>
            {economyOpen ? 'Thu gọn' : 'Xem thêm'}
          </Button>
          <Collapse in={economyOpen}>
            <Text size="sm" mt="sm">
              Chi tiết về dịch vụ vận chuyển Tiết Kiệm...
            </Text>
          </Collapse>
        </Tabs.Panel>

        <Tabs.Panel value="shipping-documents" pt="xs">
          <Text>Chứng từ vận chuyển sẽ được cập nhật tại đây.</Text>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default ShippingSettings;
