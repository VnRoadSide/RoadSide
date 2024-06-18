import {
  Paper,
  Text,
  Stack,
  rem,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  Flex,
  Container,
  Title,
} from "@mantine/core";
import { IconSun, IconPhone, IconMapPin, IconAt } from "@tabler/icons-react";

interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({
  icon: Icon,
  title,
  description,
  ...others
}: ContactIconProps) {
  return (
    <Flex {...others} gap={20} align={"center"}>
      <span>
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </span>
      <span>
        <Text size="xs" c={"dimmed"}>{title}</Text>
        <Text>{description}</Text>
      </span>
    </Flex>
  );
}

const MOCKDATA = [
  { title: "Email", description: "hello@mantine.dev", icon: IconAt },
  { title: "Điện thoại", description: "+84 (800) 335 35 35", icon: IconPhone },
  { title: "Địa chỉ", description: "844 Morris Park avenue", icon: IconMapPin },
  { title: "Giờ làm việc", description: "8 a.m. – 11 p.m.", icon: IconSun },
];

function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
}

export default function Contact() {
  return (
    <Container p='40'>
      <Paper withBorder shadow="lg" p='50'>
        <Flex>
          <Container>
            <Title pb={20}>
              RoadSide
            </Title>

            <ContactIconsList />
          </Container>

          <Container>
            <form onSubmit={(event) => event.preventDefault()}>
              <Title pb={10}>
                Liên hệ
              </Title>

              <div>
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                  <TextInput label="Tên của bạn" placeholder="Tên của bạn" />
                  <TextInput
                    label="Email"
                    placeholder="email@gmai.com"
                    required
                  />
                </SimpleGrid>

                <TextInput
                  mt="md"
                  label="Chủ đề"
                  placeholder="Chủ đề"
                  required
                />

                <Textarea
                  mt="md"
                  label="Ghi chú"
                  placeholder="Ghi chú"
                  minRows={3}
                />

                <Group justify="center" mt="md">
                  <Button type="submit" variant="gradient">
                    Gửi
                  </Button>
                </Group>
              </div>
            </form>
          </Container>
        </Flex>
      </Paper>
    </Container>
  );
}
