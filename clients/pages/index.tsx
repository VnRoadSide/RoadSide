import DynamicIcon from "@/components/DynamicIcon";
import { ProductCard } from "@/components/ProductCard";
import { environment } from "@/environment";
import { Category, Feature, Product } from "@/models";
import { useApi } from "@/utils";
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

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

function CategorySection({ categories }: { categories: Category[] }) {
  function CategoryItem({ category }: { category: Category }) {
    return (
      <NavLink href={category.link} label={category.name}>
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
          src={"logo_full.svg"}
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

export default function Home({
  features,
  products,
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>)  {
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
          <ProductSection products={products} />
        </Paper>
      </Group>
      <FeatureSection features={features} />
      <HeroSection />
    </Stack>
  );
}

type HomeProps = {
  features: Feature[];
  products: Product[];
  categories: Category[];
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const features: Feature[] = await fetch(`${environment.appUrl}/api/feature`)
    .then((r) => r.json())
    .catch((err) => console.error(err));

  const { get } = useApi();

  const { data: products, error: productError } = await get<Product[]>(
    "/products"
  );
  const { data: categories, error: categoryError } = await get<Category[]>(
    "/products/category"
  );
  if (productError) {
    console.error("Error: ", productError);
  }

  if (categoryError) {
    console.error("Error: ", categoryError);
  }

  return {
    props: {
      features: features ?? [],
      products: products ?? [],
      categories: categories ?? [],
    },
  };
}