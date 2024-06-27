// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppShell, createTheme, MantineColorsTuple, MantineProvider } from "@mantine/core";
import { Footer } from "@/components/Footer";
import { HeaderMegaMenu } from "@/components/HeaderMegaMenu";
import { SessionProvider } from "next-auth/react";

const myColor: MantineColorsTuple = [
  '#e7fdef',
  '#d7f5e1',
  '#b1e8c4',
  '#88dca5',
  '#66d18a',
  '#4fca79',
  '#41c770',
  '#32af5d',
  '#269c52',
  '#148743'
];

const theme = createTheme({
  colors: {
    myColor,
  }
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MantineProvider theme={theme}>
        <AppShell
          header={{ height: 60, collapsed: false, offset: true }}
          withBorder={false}
        >
          <AppShell.Header>
            <HeaderMegaMenu />
          </AppShell.Header>
          <AppShell.Main>
            <Component {...pageProps} />
          </AppShell.Main>
        </AppShell>
        <Footer />
      </MantineProvider>
    </SessionProvider>
  );
}
