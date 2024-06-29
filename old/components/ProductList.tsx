import {
  Badge,
  Flex,
  Card,
  Button,
  Image,
  Skeleton,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Product } from "../models/products";
import { getAllProducts, getProductByName } from "../actions/products";
import { IconMinus, IconPlus, IconStarFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const navigate = useRouter();
  const handleAddProduct = () => {
    setQuantity(quantity + 1);
  };

  const handleSubProduct = () => {
    setQuantity(quantity - 1);
  };

  return (
    <Card withBorder shadow="sm" className="relative">
      {product.discountedPrice && (
        <Badge
          variant="gradient"
          size="lg"
          className="absolute top-2.5 right-2.5"
        >
          - {product.vouchers[0]?.discount} %
        </Badge>
      )}
      <div>
        <Image
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          src={product.imageUrl}
          alt="product image"
          width={150}
          height={120}
          onClick={() => navigate.push(`/products/${product.id}`)}
          className="cursor-pointer"
        />
      </div>
      <Flex
        gap="sm"
        justify="flex-start"
        align="center"
        direction="column"
        wrap="wrap"
        className="p-5 w-full"
      >
        <div>
          <Flex gap="xs">
            <span className="font-medium text-lg">
              {product.discountedPrice
                ? `${product.discountedPrice}đ`
                : `${product.baseUnitPrice}đ`}
            </span>
            {product.discountedPrice && (
              <span className="line-through opacity-50 text-sm">
                {`${product.baseUnitPrice}đ`}
              </span>
            )}
            <span>
              <Badge color="#F9C127" className="relative top-0.5" size="lg">
                {product.rate ?? 0} <IconStarFilled size={16} />
              </Badge>
            </span>
          </Flex>
        </div>
        <Text className="opacity-80 text-xl font-medium">{product.name}</Text>
        {quantity === 0 ? (
          <Button
            justify="center"
            variant="gradient"
            size="compact-lg"
            radius="md"
            leftSection={<IconMinus size={14} />}
            rightSection={<IconPlus size={14} />}
            onClick={handleAddProduct}
          >
            <Text size="lg">Thêm vào giỏ</Text>
          </Button>
        ) : (
          <Button
            justify="center"
            variant="gradient"
            size="compact-lg"
            radius="md"
            fullWidth
          >
            <span className="px-11" onClick={handleSubProduct}>
              <IconMinus />
            </span>
            <span>{quantity}</span>
            <span className="px-11" onClick={handleAddProduct}>
              <IconPlus />
            </span>
          </Button>
        )}
      </Flex>
    </Card>
  );
}

type ProductListProps = {
  categoryId?: string;
  shopId?: string | string[];
  search?: string;
};

export const ProductList: React.FC<ProductListProps> = ({
  search,
}: ProductListProps) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);
  const fetchData = async () => {
    if (search) {
      const data = await getProductByName(search);
      if (!data) {
        return;
      }
      setLoading(false);
      setData(data);
    } else {
      const data = await getAllProducts();
      if (!data) {
        return;
      }
      setLoading(false);
      setData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <Skeleton visible={loading}>
      <Flex gap="large" align="center" justify="space-between">
        <Flex m={30} wrap="wrap" gap={30} justify={"flex-start"}>
          {data.map((product, key) => (
            <ProductCard key={key} product={product} />
          ))}
        </Flex>
      </Flex>
    </Skeleton>
  );
};
