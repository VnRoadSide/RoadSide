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
  Flex,
  Group,
  useMantineTheme,
  Box,
  Paper,
} from "@mantine/core";

import { GetStaticProps } from "next";

function CategorySection({ categories }: { categories: Category[] }) {
  function CategoryItem({ category }: { category: Category }) {
    return (
      <NavLink href={category.link} label={category.label}>
        {category.children ? (
          <CategorySection categories={category.children} />
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
    <Stack align="stretch"
    justify="center" gap="xs">
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
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      spacing={{ base: "md", md: 10 }}
      verticalSpacing={{ base: "xl", md: 10 }}
    >
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </SimpleGrid>
  );
}

export default function Home({
  features,
  products,
  categories,
}: {
  features: Feature[];
  products: Product[];
  categories: Category[];
}) {
  const theme = useMantineTheme();
  return (
    <Stack p="xl" style={{ background: theme.colors["gray"][0] }}>
      <Group grow preventGrowOverflow={false} wrap="nowrap" align="start">
        <Paper radius="md" p="xs" miw="14rem" shadow="lg">
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

export const getStaticProps: GetStaticProps = async () => {
  const promises = [
    fetch(`${environment.appUrl}/api/feature`),
    fetch(`${environment.appUrl}/api/category`),
  ];
  const [features, categories] = await Promise.all(
    promises.map((p) => p.then((r) => r.json()))
  );

  const { get } = useApi();

  const { data, error } = await get<Product[]>("/products");
  console.log("fethced products: ", data);

  if (error) {
    console.error("Error: ", error);
  }

  return {
    props: {
      features,
      products: data,
      categories,
    },
  };
};
