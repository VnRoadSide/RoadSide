"use client";
import { Footer } from "@/components/Footer";
import theme from "@/theme";
import { AppShell, AppShellHeader, AppShellMain, Button, ColorSchemeScript, MantineProvider } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <ColorSchemeScript />
      </head>
      <body suppressHydrationWarning={true}>
        <MantineProvider theme={theme}>
          <NavigationProgress />

          <AppShell
            withBorder={false}
          >
            <AppShellMain>
              <h2>Something went wrong!</h2>
              <Button onClick={() => reset()}>Try again</Button>
            </AppShellMain>
          </AppShell>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
