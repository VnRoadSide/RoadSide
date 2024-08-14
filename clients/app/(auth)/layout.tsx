import { Stack } from "@mantine/core";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return <Stack p="xl">{children}</Stack>;
}