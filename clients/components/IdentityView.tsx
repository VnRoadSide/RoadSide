import React from 'react';
import { Group, Image, Text, Stack, Paper } from '@mantine/core';

interface IdentityViewerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function IdentityViewer({ title, subtitle, imageUrl }: IdentityViewerProps) {
  return (
    <Paper withBorder shadow="xs" p="md">
      <Group>
        <Image src={imageUrl} alt={`${title}_${subtitle}`} width={100} height={80} fit="contain" />
        <Stack gap="xs">
          <Text size="sm" w={500}>{title}</Text>
          <Text size="xs" c="dimmed">{subtitle}</Text>
        </Stack>
      </Group>
    </Paper>
  );
}