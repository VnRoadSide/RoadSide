"use client";
import { toNormalDate } from "@/lib/hooks";
import { Notification, PagingResult } from "@/models";
import {
  Text,
  TableTr,
  TableTd,
  Flex,
  Button,
  Group,
  ActionIcon,
  Stack,
  Box,
  Title,
  TableScrollContainer,
  Table,
  TableTbody,
  Pagination,
  Center,
  Image
} from "@mantine/core";
import { IconReceipt, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export function NotificationView({ data, total }: PagingResult<Notification>) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const rows = data.map((item, key) => (
    <TableTr key={key}>
      <TableTd>
        <Text fz="sm">{toNormalDate(item.createdOn)}</Text>
      </TableTd>

      <TableTd>
        <Flex gap="sm">
          <IconReceipt size={40} color="green" />
          <Text span fz="sm" fw={500}>
            {item.content}{" "}
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
    <Stack>
      <Box>
        <Title>Thông báo của tôi</Title>
        {total > 0 ? (
          <TableScrollContainer minWidth={800}>
            <Table verticalSpacing="md">
              <TableTbody>{rows}</TableTbody>
            </Table>
          </TableScrollContainer>
        ) : (
          <Center>
            <Stack align="center" p="sm">
              {/* <Image
                src="/placeholder-image.png" // You can add a placeholder image here or use Mantine's `Image` component
                width={150}
                alt="No notifications"
              /> */}
              <Text size="lg" c="dimmed">
                Bạn chưa có thông báo nào.
              </Text>
            </Stack>
          </Center>
        )}
      </Box>
      {total > 0 && (
        <Flex justify="center">
          <Pagination
            value={currentPage}
            total={Math.ceil(total/pageSize)}
            onChange={handleChangePage}
          />
        </Flex>
      )}
    </Stack>
  );
}
