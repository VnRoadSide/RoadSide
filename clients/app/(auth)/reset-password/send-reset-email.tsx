"use client";
import {
  Grid,
  Box,
  Title,
  Space,
  Paper,
  TextInput,
  Button,
  Text,
  Image,
  GridCol,
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { resetPassword } from "@/lib/auth";

export default function EmailVerification() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
  });

  return (
    <Grid
      style={{
        minHeight: "600px",
        "@media (min-width: 1200px)": { minHeight: "800px" },
      }}
    >
      <GridCol
        span={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px",
        }}
      >
        <Box style={{ maxWidth: "350px", width: "100%" }}>
          <Box style={{ textAlign: "center" }}>
            <Title order={1} style={{ fontSize: "30px", fontWeight: "bold" }}>
              Đặt lại mật khẩu
            </Title>
            <Text c="dimmed">
              Nhập email của bạn dưới đây để đặt lại mật khẩu
            </Text>
          </Box>
          <Space h="md" />
          <Paper withBorder shadow="sm" p="md">
            <form
              onSubmit={form.onSubmit((values) => resetPassword(values.email))}
            >
              <TextInput
                label="Email"
                placeholder="m@example.com"
                // type="email"
                required
                key={form.key("email")}
              />
              <Space h="md" />
              <Button type="submit" fullWidth>
                Đặt lại mật khẩu
              </Button>
            </form>
            <Space h="md" />
            <Text size="sm">
              Nhớ mật khẩu?{" "}
              <Link href="/login" style={{ textDecoration: "underline" }}>
                Đăng nhập
              </Link>
            </Text>
          </Paper>
        </Box>
      </GridCol>
      <GridCol
        span={0}
        style={{
          display: "none",
          "@media (min-width: 1024px)": { display: "block" },
        }}
      >
        <Image
          src="/asset/placeholder.svg"
          alt="Image"
          width={1920}
          height={1080}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            filter: "brightness(0.2) grayscale(1)",
          }}
        />
      </GridCol>
    </Grid>
  );
}
