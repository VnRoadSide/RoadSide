import { Inter } from "next/font/google";
import { Box, Container, Flex, Title, Text, Image, Center } from "@mantine/core";
import { CategoryList } from "@/components/CategoryList";
import { ProductList } from "@/components/ProductList";
import { Shortcut } from "@/components/Shortcut";
import { GetStaticProps } from "next";

export default function Home() {
  return (
    <Box py="xl">
      <Shortcut />

      <Flex mt={10}>
        <CategoryList />
        <ProductList />
      </Flex>
    </Box>
  );
}

export const getStaticProps = (async (context) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()
  return { props: { repo } }
}) satisfies GetStaticProps<{
  repo: Repo
}>