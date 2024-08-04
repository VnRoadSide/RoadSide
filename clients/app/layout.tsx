// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { Footer } from "@/components/Footer";
import NavBar from "@/components/NavBar";
import theme from "@/theme";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  ColorSchemeScript,
  MantineProvider,
} from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <NavigationProgress />

          <AppShell
            header={{ height: 60, collapsed: false, offset: true }}
            withBorder={false}
          >
            <AppShellHeader>
              <NavBar />
            </AppShellHeader>
            <AppShellMain>{children}</AppShellMain>
          </AppShell>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
