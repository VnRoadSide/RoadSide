"use client";
import { Notification } from "@/models";
import { toNormalDate } from "@/utils";
import {Text, TableTr, TableTd, Flex, Button, Group, ActionIcon, Stack, Box, Title, TableScrollContainer, Table, TableTbody, Pagination } from "@mantine/core";
import { IconReceipt, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

type NotificationProps = {
    notifications: Notification[];
    totalPage: number;
  };

export function NotificationView({notifications, totalPage}: NotificationProps) {
    const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  const rows = notifications.map((item, key) => (
    <TableTr key={key}>
      <TableTd>
        <Text fz="sm">{toNormalDate(item.dateCreated)}</Text>
      </TableTd>

      <TableTd>
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
      </TableTd>
      <TableTd>
        <Button variant="transparent" fz="sm" fw={500}>
          Đánh dấu đã đọc
        </Button>
      </TableTd>
      <TableTd>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconTrash width={30} height={30} stroke={1.5} />
          </ActionIcon>
        </Group>
      </TableTd>
    </TableTr>
  ));

  return (
      <Stack align={"center"}>
        <Box>
          <Title>Thông báo của tôi</Title>
          <TableScrollContainer minWidth={800}>
            <Table verticalSpacing="md">
              <TableTbody>{rows}</TableTbody>
            </Table>
          </TableScrollContainer>
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