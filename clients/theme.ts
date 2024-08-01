"use client";

import { MantineColorsTuple, createTheme } from "@mantine/core";

const base: MantineColorsTuple = [
  "#d7fcf7",
  "#aafbee",
  "#7cfae5",
  "#5dfadd",
  "#4ff9d9",
  "#46f9d7",
  "#39ddbe",
  "#2ac5a8",
  "#03aa90",
  "#027563",
];

const accent: MantineColorsTuple = [
  "#ecf9fd",
  "#dbeff7",
  "#b0def0",
  "#84ceeb",
  "#64bfe5",
  "#52b6e2",
  "#47b3e2",
  "#3a9cc8",
  "#2c8bb3",
  "#0f789e",
];

const theme = createTheme({
  colors: { base, accent },
  fontFamily: "Open Sans, sans-serif",
  autoContrast: true,
  luminanceThreshold: 0.15,
  primaryShade: 9,
  primaryColor: "base",
  defaultGradient: { deg: 133, from: "base", to: "accent" },
});

export default theme;