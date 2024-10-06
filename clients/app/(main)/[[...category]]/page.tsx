import { DynamicIcon } from "@/components/Icon";
import { ProductCard } from "@/components/Product";
import { environment } from "@/environment";
import { Category, Feature, PagingResult, Product } from "@/models";
import { useApi } from "@/lib/hooks";
import {
  Title,
  Button,
  SimpleGrid,
  Card,
  ThemeIcon,
  Container,
  Image,
  Text,
  Stack,
  NavLink,
  Group,
  Paper,
  rem,
} from "@mantine/core";
import Link from "next/link";
import { fetchData } from "@/lib/fetch";
import { auth } from "@/auth";

function CategorySection({ categories }: { categories: Category[] }) {
  function CategoryItem({ category }: { category: Category }) {
    return (
      <NavLink component={Link} href={`/${category.url}`} label={category.name}>
        {category.categories && category.categories.length > 0 ? (
          <CategorySection categories={category.categories} />
        ) : null}
      </NavLink>
    );
  }

  return (
    <Stack gap={0}>
      {categories.map((category, index) => (
        <CategoryItem key={index} category={category} />
      ))}
    </Stack>
  );
}

function FeatureSection({ features }: { features: Feature[] }) {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      spacing={{ base: "md", md: 10 }}
      verticalSpacing={{ base: "xl", md: 10 }}
    >
      {features.map(({ icon, title, description }, index) => (
        <Card shadow="lg" padding="lg" radius="md" p="md" key={index}>
          <ThemeIcon variant="light" size={40} radius={40}>
            <DynamicIcon icon={icon} />
          </ThemeIcon>
          <Text mt="sm" mb={7}>
            {title}
          </Text>
          <Text size="sm" c="dimmed" lh={1.6}>
            {description}
          </Text>
        </Card>
      ))}
    </SimpleGrid>
  );
}

function HeroSection() {
  return (
    <Stack align="stretch" justify="center" gap="xs">
      <Container>
        <Image
          radius="md"
          src={"/asset/logo_full.svg"}
          h={180}
          w="auto"
          fit="contain"
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </Container>
      <Container>
        <Title order={1}>Sàn thương mại điện tử nông sản Việt Nam</Title>
      </Container>
      <Container>
        <Text size="xl" fw="700" c="dimmed">
          Hãy cùng chúng tôi trải nghiệm sự khác biệt!
        </Text>
      </Container>
      <Container>
        <Button
          component="a"
          variant="gradient"
          size="lg"
          radius="md"
          href="/login"
        >
          Bắt đầu
        </Button>
      </Container>
    </Stack>
  );
}

function ProductSection({ products }: { products: Product[] }) {
  return products?.length > 0 ? (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      spacing={{ base: "md", md: 10 }}
      verticalSpacing={{ base: "xl", md: 10 }}
    >
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </SimpleGrid>
  ) : (
    <Text>No products to show. Try to reconnect to the internet.</Text>
  );
}

export default async function Page({
  params,
}: {
  params?: { category: string[] };
}) {
  const categoryUrl = params?.category?.join("/");
  const { features, products, categories } = await getData(categoryUrl);
  return (
    <Stack p="xl">
      <Group grow preventGrowOverflow={false} wrap="nowrap" align="start">
        <Paper
          radius="md"
          p="xs"
          maw="15rem"
          shadow="lg"
          style={{ position: "sticky", top: rem(100), left: 0 }}
        >
          <CategorySection categories={categories} />
        </Paper>
        <Paper radius="md" p="xs" shadow="lg">
          <ProductSection products={products.data} />
        </Paper>
      </Group>
      <FeatureSection features={features} />
      <HeroSection />
    </Stack>
  );
}

async function getData(categoryUrl?: string) {
  // const features: Feature[] | null = await fetchData("features");
  const session = await auth();
  const { get } = useApi(session);

  const { data: products, error: productError } = await get<
    PagingResult<Product>
  >(`/products/${categoryUrl ?? ""}`);
  const { data: categories, error: categoryError } = await get<Category[]>(
    "/category"
  );
  if (productError) {
    console.error("Error: ", productError);
  }

  if (categoryError) {
    console.error("Error: ", categoryError);
  }

  return {
    features: [],
    products: products ?? { data: [] },
    categories: categories ?? [],
  };
}
