
import { environment } from "@/environment";
import { Notification } from "@/models";
import { toNormalDate } from "@/utils";
import {
  Table,
  Flex,
  Button,
  Group,
  ActionIcon,
  Stack,
  Box,
  Title,
  Pagination,
  Modal,
  Text,
} from "@mantine/core";
import { IconReceipt, IconTrash } from "@tabler/icons-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";
import { navigation } from "../me";

type NotificationProps = {
  notifications: Notification[];
  totalPage: number;
};

export default function NotificationPage({
  notifications,
  totalPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  const rows = notifications.map((item, key) => (
    <Table.Tr key={key}>
      <Table.Td>
        <Text fz="sm">{toNormalDate(item.dateCreated)}</Text>
      </Table.Td>

      <Table.Td>
        <Flex gap="sm">
          <IconReceipt size={40} color="green" />
          <Text span fz="sm" fw={500}>
            {item.description}{" "}
            <Text
              fz="sm"
              fw={500}
              component="a"
              c="blue"
              target="_self"
              href={item.url}
            >
              Xem chi tiết
            </Text>
          </Text>
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
      <Stack align={"center"}>
        <Box>
          <Title>Thông báo của tôi</Title>
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="md">
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Box>
        <Flex justify="center">
          {totalPage && (
            <Pagination
              value={currentPage}
              total={totalPage}
              onChange={handleChangePage}
            />
          )}
          {/* <Modal 
              centered size="xl"
              opened={editModalVisible}  
              onClose={() => setEditModalVisible(false)} 
              zIndex={1001}
              >
                <ProductForm />
            </Modal> */}
        </Flex>
      </Stack>
  );
}

export const getServerSideProps: GetServerSideProps<
  NotificationProps
> = async () => {
  const notification: NotificationProps = await fetch(
    `${environment.appUrl}/api/notification`
  )
    .then((r) => r.json())
    .catch((err) => console.error(err));

  console.log(notification);

  return {
    props: {
      ...notification,
    },
  };
};
