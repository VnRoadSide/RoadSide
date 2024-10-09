"use client";
import {
  Grid,
  Box,
  Title,
  Space,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Image,
  GridCol,
} from "@mantine/core";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { validator } from "@/lib/validator";

export default function Login() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      credential: "",
      password: "",
    },
    validate: {
      credential: validator.email,
      password: validator.password,
    },
  });

  return (
    <Grid
      style={{
        minHeight: "600px",
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
              Đăng Nhập
            </Title>
            <Text c="dimmed">
              Nhập email của bạn dưới đây để đăng nhập vào tài khoản của bạn
            </Text>
          </Box>
          <Space h="md" />
          <Paper withBorder shadow="sm" p="md">
            <form
              onSubmit={form.onSubmit((values) =>
                signIn("credentials", {
                  ...values,
                  actionType: "signin",
                })
              )}
            >
              <TextInput
                label="Email"
                placeholder="m@example.com"
                type="email"
                required
                key={form.key("credential")}
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Mật khẩu"
                required
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              <Link
                href="/reset-password"
                style={{
                  fontSize: "14px",
                  textDecoration: "underline",
                  display: "block",
                  marginTop: "4px",
                  marginBottom: "12px",
                  textAlign: "right",
                }}
              >
                Quên mật khẩu?
              </Link>
              <Button type="submit" fullWidth>
                Đăng Nhập
              </Button>
            </form>
            {/* <Space h="md" />
            <Button variant="outline" fullWidth>
              Đăng nhập với Google
            </Button> */}
          </Paper>
          <Space h="md" />
          <Text size="sm">
            Bạn chưa có tài khoản?{" "}
            <Link href="/signup" style={{ textDecoration: "underline" }}>
              Đăng ký
            </Link>
          </Text>
        </Box>
      </GridCol>
      <GridCol
        span={0}
        style={{
          display: "none",
        }}
      >
        <Image
          src="/asset/logo.svg"
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
