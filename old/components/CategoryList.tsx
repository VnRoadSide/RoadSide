import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  Text,
  UnstyledButton,
  Container,
} from "@mantine/core";
import {
  IconChevronRight,
  IconFish,
  IconCoffee,
  IconSalad,
} from "@tabler/icons-react";
import { JSX } from "react/jsx-runtime";
import { GetStaticProps } from "next";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text<"a">
      className="block pl-[75px] mb-[5px]"
      component="a"
      href={link.link}
      key={link.label}
      onClick={(event: { preventDefault: () => any }) => event.preventDefault()}
    >
      {link.label}
    </Text>
  ));

  return (
    <div className="block w-[250px] ml-[10px] mb-[10px]">
      <UnstyledButton onClick={() => setOpened((o) => !o)} className="block">
        <Group justify="space-between" gap={10}>
          <Box className="flex items-center mx-auto">
            <Icon className="w-[40px] h-[40px] text-green-500" />
            <Box ml="sm">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              stroke={1.5}
              className={`transition-transform ease-[150ms] w-[16px] h-[16px] ${
                opened ? "transform-rotate-[-90deg]" : ""
              }`}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </div>
  );
}

const mockdata = [
  {
    label: "Trái cây & Rau củ",
    icon: IconSalad,
    initiallyOpened: true,
    links: [
      { label: "Trái cây", link: "/" },
      { label: "Rau củ", link: "/" },
    ],
  },
  {
    label: "Thịt cá",
    icon: IconFish,
    links: [
      { label: "Hải sản", link: "/" },
      { label: "Thịt", link: "/" },
    ],
  },
  {
    label: "Ngũ cốc",
    icon: IconCoffee,
    links: [
      { label: "Nuts & biscuits", link: "/" },
      { label: "Chocolates", link: "/" },
      { label: "Crisps", link: "/" },
      { label: "Noodles & Pasta", link: "/" },
      { label: "Sauces", link: "/" },
      { label: "Soup", link: "/" },
    ],
  },
];

export function CategoryList() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Container className="mt-[20px] h-full w-[250px]">
      {links}
    </Container>
  );
}