import { Group, Image, Paper, Text, Anchor, Container } from "@mantine/core";
// import { FuzzySearch } from "./Search";

export function NavBar() {
  return (
    <Paper shadow="sm" variant="gradient">
      <Container fluid>
        <Group component="nav" justify="space-between" h="60" px="sm">
          <Group gap={4}>
            <Anchor href="/" underline="never">
              <Group gap={4} align="end">
                <Image src={"logo.svg"} alt="logo" h={35} />
                <Text variant="gradient" fw={900} size="1.8rem">
                  {"RoadSide"}
                </Text>
              </Group>
            </Anchor>
            {/* <FuzzySearch/> */}
          </Group>

          <Group gap={"lg"} align="center">
            <Anchor href="/faq" underline="never">
              FAQ
            </Anchor>
            <Anchor href="/contact" underline="never">
              Contact
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Paper>
  );
}
