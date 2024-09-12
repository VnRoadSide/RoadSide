"use client";
import { Product } from '@/models';
import { Badge, Button, Group, Image, Select, Text, Title, Box } from '@mantine/core';
import { useState } from 'react';

interface ProductPageProps {
  product: Product;
}

export default function ProductView({ product }: ProductPageProps) {
  const [selectedColor, setSelectedColor] = useState('Xanh rêu lót nâu');

  // Calculate final price if there's a discount or sale
  const finalPrice = product.discountedPrice ?? product.baseUnitPrice;

  return (
    <Box p="md">
      <Group align="center" px="auto">
        {/* Image Section */}
        <Image
          src={product.imageUrl || 'https://via.placeholder.com/300'} // Fallback to a placeholder image
          alt={product.name}
          width={300}
        />

        {/* Product Details Section */}
        <Box ml="lg">
          <Badge color="green" size="lg">
            {product.vendor.fullName}
          </Badge>

          <Title order={2} mt="sm">
            {product.name}
          </Title>

          {/* Rating and Reviews */}
          <Group mt="sm">
            {product.rate && (
              <Text size="sm">
                <strong>{product.rate}★</strong> 
              </Text>
            )}
            <Text size="sm"> | Đã bán {product.vouchers.length} khuyến mãi</Text>
          </Group>

          {/* Price Section */}
          <Text size="xl" mt="md" c={product.discountedPrice ? 'red' : 'black'}>
            {finalPrice.toLocaleString('vi-VN')}₫
          </Text>

          {product.discountedPrice && (
            <Text size="sm" c="dimmed" td="line-through">
              {product.baseUnitPrice.toLocaleString('vi-VN')}₫
            </Text>
          )}

          {/* Description */}
          {product.description && (
            <Text size="sm" mt="md" c="gray">
              {product.description}
            </Text>
          )}

          {/* Color Selection (placeholder, can be customized to product specifics) */}
          <Select
            label="Chọn mẫu mã"
            value={selectedColor}
            onChange={(val) => setSelectedColor(val ?? "")}
            data={[
              { label: 'Xanh rêu lót nâu', value: 'Xanh rêu lót nâu' },
              { label: 'Cam', value: 'Cam' },
              { label: 'Đen bóng', value: 'Đen bóng' },
            ]}
            mt="md"
          />

          {/* Action Buttons */}
          <Group mt="md">
            <Button color="blue">Thêm vào giỏ</Button>
            <Button variant="outline">Mua ngay</Button>
          </Group>
        </Box>
      </Group>
    </Box>
  );
}
