import { useToggle, useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Title,
  Modal,
} from "@mantine/core";
import { FacebookButton, GoogleButton } from "./GoogleFacebookButton";
import { signUp } from "@/actions/auth";
import { signIn } from "@/auth";

interface AuthFormProps {
  opened: boolean;
  close: () => void;
}

export function AuthForm({ opened, close }: AuthFormProps) {
  const [type, toggle] = useToggle(["Đăng nhập", "Đăng ký"]);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Email không hợp lệ"),
      password: (val) =>
        val.length <= 6 ? "Mật khẩu phải có ít nhất 6 ký tự" : null,
    },
  });

  const handleLogin = async (formData: any) => {
    await signIn("credentials", formData);
  };

  const handleSignup = async (values: any) => {
    const data = await signUp({
      username: values.name,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Modal opened={opened} onClose={close} centered size="md" radius="lg">
      <Title ta={"center"}>{type}</Title>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <FacebookButton radius="xl">Facebook</FacebookButton>
      </Group>

      <Divider label="Hoặc đăng nhập với tài khoản" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          {type === "Đăng ký" && (
            <TextInput
              required
              label="Email"
              placeholder="alice@mantine.dev"
              value={form.values.email}
              onChange={(event: any) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />
          )}
          <TextInput
            label="Tên đăng nhập"
            placeholder="aliceeee"
            value={form.values.name}
            onChange={(event: any) =>
              form.setFieldValue("name", event.currentTarget.value)
            }
            radius="md"
          />

          <PasswordInput
            required
            label="Mật khẩu"
            placeholder="*********"
            value={form.values.password}
            onChange={(event: any) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />

          {type === "Đăng ký" && (
            <Checkbox
              label="Tôi đồng ý với các điều khoản và quy định"
              checked={form.values.terms}
              onChange={(event: any) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "Đăng ký"
              ? "Đã có tài khoản? Đăng nhập"
              : "Chưa có tài khoản? Đăng ký"}
          </Anchor>
          <Button
            variant="gradient"
            type="submit"
            radius="xl"
            onClick={() =>
              type === "Đăng nhập"
                ? handleLogin(form.values)
                : handleSignup(form.values)
            }
          >
            {type}
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
