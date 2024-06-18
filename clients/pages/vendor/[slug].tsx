import { Container, Flex, Image } from "@mantine/core";
import { ShopInfo } from "@/components/ShopInfo";
import { ProductList } from "@/components/ProductList";
import { useUserSession } from "@/hooks/useUserSession";
import { useRouter } from "next/router";
import { defineApi } from "@/hooks";

export default function ShopPage() {
  const { loggedIn } = useUserSession();
  const router = useRouter();
  const shopId = router.query.slug;
  return (
    <div>
      <Flex>
        <Flex flex={2}>
          <ShopInfo shopId={shopId ? shopId : "1"} />
        </Flex>
        <Container>
          <Image
            src="https://www.lithospos.com/storage/app/media/veg_banner.jpg"
            alt="shop banner"
            w={"100%"}
            h={"25%"}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
          <ProductList shopId={shopId} />
        </Container>
      </Flex>
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { get } = defineApi();
  const { data: posts, error } = await get("/vendors");


  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
