import { Card, Group, Badge, Button, Image, Text, Container } from "@mantine/core";

export function ProductCard() {
  // const features = mockdata.map((feature) => (
  //   <Center key={feature.label}>
  //     <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
  //     <Text size="xs">{feature.label}</Text>
  //   </Center>
  // ));

  return (
    <Card withBorder padding="lg" radius="md" p="md"  >
      {/* <Card.Section maw={100} >
        <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S"  />
      </Card.Section> */}

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>Tesla Model S</Text>
          <Text fz="xs" c="dimmed">
            Free recharge at any station
          </Text>
        </div>
        <Badge variant="outline">25% off</Badge>
      </Group>

      <Container>
        <Text fz="sm" c="dimmed">
          Basic configuration
        </Text>
      </Container>

      <Card.Section p="md">
        <Group gap={30} justify="space-between">
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              $168.00
            </Text>
            <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
              per day
            </Text>
          </div>

          <Button radius="xl">
            Rent now
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}