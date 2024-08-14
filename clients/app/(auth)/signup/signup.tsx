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
  Stack,
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { SignUpForm, signUp } from "@/lib/auth";
import { validator } from "@/lib/validator";

type SignupProps = SignUpForm & {
  confirmPassword: string;
};


export default function Signup() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    } as SignupProps,
    validate: {
      ...validator,
      confirmPassword: (value, values) =>
        value !== values.password
          ? "Confirm password does not match with password"
          : null,
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
              Đăng Ký
            </Title>
            <Text c="dimmed">
              Nhập thông tin của bạn dưới đây để tạo tài khoản mới
            </Text>
          </Box>
          <Space h="md" />
          <Paper withBorder shadow="sm" p="md">
            <form onSubmit={form.onSubmit((values) => signUp({ ...values }))}>
              <Stack>
                <TextInput
                  label="Email"
                  placeholder="m@example.com"
                  // type="email"
                  required
                  key={form.key("email")}
                />
                <PasswordInput
                  label="Mật khẩu"
                  required
                  key={form.key("password")}
                />
                <PasswordInput
                  label="Xác nhận mật khẩu"
                  required
                  key={form.key("confirmPassword")}
                />
                <Button type="submit" fullWidth>
                  Đăng Ký
                </Button>
              </Stack>
            </form>
            <Space h="md" />
            <Button variant="outline" fullWidth>
              Đăng ký với Google
            </Button>
          </Paper>
          <Space h="md" />
          <Text size="sm">
            Bạn đã có tài khoản?{" "}
            <Link href="/login" style={{ textDecoration: "underline" }}>
              Đăng nhập
            </Link>
          </Text>
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
          src="/placeholder.svg"
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
