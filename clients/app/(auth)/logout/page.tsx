"use client";
import { signOut } from "next-auth/react";
import { Paper, Center, Loader, Container, Text } from "@mantine/core";
import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  return (
    <Container size="xs">
      <Paper shadow="md" radius="md" p="lg">
        <Center>
          <Loader size="lg" />
        </Center>
        <Text mt="md">Signing you out...</Text>
      </Paper>
    </Container>
  );
}
