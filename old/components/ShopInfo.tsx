import shopLogo from "../../assets/logo.png";
import { Container, Flex, Image } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons-react";

const ShopDetails = {
  shopId: "1",
  logo: shopLogo,
  name: "Nông sản RoadSide",
  description:
    "Tại đây, bạn sẽ tìm thấy đa dạng các loại rau, trái cây, thực phẩm chế biến và các sản phẩm nông nghiệp khác, đảm bảo mang đến sự hài lòng cho vị giác và sức khỏe của bạn.",
  adress: "Đại học Bách Khoa ĐHQG-HCM, Dĩ An, Bình Dương",
  phone: "+84 1234 56789",
  website: "https://hcmut.edu.vn/",
};

export const ShopInfo: React.FC<{ shopId: string | string[] }> = ({ shopId }) => {
  return (
    <div>
      <Container>
        <Image
          src={ShopDetails.logo}
          alt="logo"
          w={"50%"}
          className="rounded-lg"
        />
        <Container
          fw={700}
          fz={"h2"}
          c={"#009f7f"}
          className="font-bold text-2xl text-green-600"
        >
          {ShopDetails.name}
        </Container>
        <Flex ta={"justify"} className="opacity-80 mb-2.5">
          {ShopDetails.description}
        </Flex>
        <Flex justify="center" gap={10} className="opacity-80 mb-2.5">
          <IconBrandFacebook />
          <IconBrandInstagram />
          <IconBrandTwitter />
        </Flex>
      </Container>
      <Container
        className="flex flex-col justify-center gap-6"
      >
        <Flex direction="column" gap={10}>
          <span className="font-bold">Địa chỉ: </span>
          <span className="opacity-80">{ShopDetails.adress}</span>
        </Flex>
        <Flex direction="column" gap={10}>
          <span className="font-bold">SĐT: </span>
          <span className="opacity-80">{ShopDetails.phone}</span>
        </Flex>
        <Flex direction="column" gap={10}>
          <span className="font-bold">Trang web: </span>
          <span>
            <a
              href={ShopDetails.website}
              target="_blank"
              className="font-bold text-green-600"
            >
              {ShopDetails.website}
            </a>
          </span>
        </Flex>
      </Container>
    </div>
  );
};
