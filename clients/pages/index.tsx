import { Inter } from "next/font/google";
import { Box, Container, Flex, Title, Text, Image, Center } from "@mantine/core";
import { CategoryList } from "@/components/CategoryList";
import { ProductList } from "@/components/ProductList";
import { Shortcut } from "@/components/Shortcut";

export default function Home() {
  return (
    <Box py="xl">
      <Container>
        <Center>
          <Image src={"logo.png"} alt="logo" h={180} w="auto" fit="contain" mb={10} />
        </Center>
        <Center>
          <Title>ĐẶT HÀNG NGAY TẠI DEMETER </Title>
        </Center>
        <Center>
          <Text mt={10} size="xl" c="dimmed">
            Hãy dùng rau củ quả sạch mỗi ngày - Hàng tươi mới mỗi ngày!
          </Text>
        </Center>
      </Container>
        
      <Flex justify="space-evenly" align="center" gap={5} ml={10} mr={10}>
        <Image
          src={"offer-1.png"}
          alt="Express Delivery"
          h={180}
          w="350"
          fit="contain"
        />
        <Image
          src={"offer-2.png"}
          alt="Cash On Delivery"
          h={180}
          w="350"
          fit="contain"
        />
        <Image src={"offer-3.png"} alt="Gift Voucher" h={180} w="350" fit="contain" />
        <Image src={"offer-4.png"} alt="Free Delivery" h={180} w="350" fit="contain" />
      </Flex>
      <Shortcut />

      <Flex mt={10}>
        <CategoryList />
        <ProductList />
      </Flex>
    </Box>
  );
}
