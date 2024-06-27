import {
  Table,
  Group,
  Text,
  ActionIcon,
  Box,
  Flex,
  Pagination,
  Stack,
  Button,
  Modal,
  Title,
} from "@mantine/core";
import { IconTrash, IconReceipt } from "@tabler/icons-react";
import { useUserSession } from "@/hooks/useUserSession";
import { defineApi } from "@/utils";
import { useRouter } from "next/router";
import { useState } from "react";

const generateData = (count: number) => {
  const data = [];
  for (let i = 0; i <= count; i++) {
    data.push({
      day: `28/04/2024`,
      des: `Đơn hàng ${
        906524241 + i
      } đã được bàn giao đến đối tác vận chuyển TED. Đơn hàng sẽ được giao trước 23:59 ngày 28/04/2023. Quý khách vui lòng giữ liên lạc qua điện thoại.`,
      link: `/`,
    });
  }
  return data;
};

const dataSource = generateData(50);

export function Notification() {
  const { loggedIn } = useUserSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate("/home");
  //   }
  // }, [loggedIn]);

  const [currentPage, setCurrentPage] = useState(1);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const pageSize = 10;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const handleEditClick = () => {
    setEditModalVisible(true);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const data = dataSource.slice(startIndex, endIndex);

  const rows = data.map((item, key) => (
    <Table.Tr key={key}>
      <Table.Td>
        <Text fz="sm">{item.day}</Text>
      </Table.Td>

      <Table.Td>
        <Flex gap="sm">
          <IconReceipt size={40} color="green" />
          <div>
            <Text span fz="sm" fw={500}>
              {item.des}{" "}
              <Text
                fz="sm"
                fw={500}
                component="a"
                c="blue"
                target="_self"
                href={item.link}
              >
                Xem chi tiết
              </Text>
            </Text>
          </div>
        </Flex>
      </Table.Td>
      <Table.Td>
        <Button variant="transparent" fz="sm" fw={500}>
          Đánh dấu đã đọc
        </Button>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconTrash width={30} height={30} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack p={"xl"} align={"center"}>
      <Box>
        <Title>Thông báo của tôi</Title>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="md">
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Box>
      <Flex justify="center">
        <Pagination
          // type="primary"
          current={currentPage}
          total={dataSource.length / pageSize}
          pageSize={pageSize}
          onChange={handleChangePage}
          showSizeChanger={false}
          m={"16px"}
          ta={"right"}
        />
        <Modal
          centered
          size="xl"
          opened={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          zIndex={1001}
        >
          <ProductForm />
        </Modal>
      </Flex>
    </Stack>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { get } = defineApi();
  const { data: posts, error } = await get("/notification");

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: any) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
