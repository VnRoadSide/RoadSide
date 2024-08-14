"use client";
import { DynamicIcon } from "@/components/Icon";
import { Card, SimpleGrid, Stack, ThemeIcon, Title, Text} from "@mantine/core";

type Marketing = {
    icon: string;
    title: string;
    description: string;
  };

export function Marketing({ marketing }: { marketing: Marketing[] }) {
    return (
      <Stack>
        <Title order={2}> Công cụ Marketing</Title>
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={{ base: "md", md: 10 }}
          verticalSpacing={{ base: "xl", md: 10 }}
        >
          {marketing.map(({ icon, title, description }, index) => (
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
      </Stack>
    );
  }