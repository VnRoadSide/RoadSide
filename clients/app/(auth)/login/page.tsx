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
} from "@mantine/core";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "@mantine/form";

export default function Login() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Grid
      style={{
        minHeight: "600px",
        "@media (min-width: 1200px)": { minHeight: "800px" },
      }}
    >
      <Grid.Col
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
              Login
            </Title>
            <Text c="dimmed">
              Enter your email below to login to your account
            </Text>
          </Box>
          <Space h="md" />
          <Paper withBorder shadow="sm" p="md">
            <form onSubmit={form.onSubmit((values) => signIn("credentials", values))}>
              <TextInput
                label="Email"
                placeholder="m@example.com"
                // type="email"
                required
                key={form.key('email')}
              />
              <Space h="md" />
              <PasswordInput label="Password" required key={form.key('password')} />
              <Link
                href="/forgot-password"
                style={{
                  fontSize: "14px",
                  textDecoration: "underline",
                  display: "block",
                  marginTop: "4px",
                  marginBottom: "12px",
                  textAlign: "right",
                }}
              >
                Forgot your password?
              </Link>
              <Button
                type="submit"
                fullWidth
              >
                Login
              </Button>
            </form>
            <Space h="md" />
            <Button variant="outline" fullWidth>
              Login with Google
            </Button>
          </Paper>
          <Space h="md" />
          <Text size="sm">
            Don&apos;t have an account?{" "}
            <Link href="#" style={{ textDecoration: "underline" }}>
              Sign up
            </Link>
          </Text>
        </Box>
      </Grid.Col>
      <Grid.Col
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
      </Grid.Col>
    </Grid>
  );
}
