import { MantineProvider, localStorageColorSchemeManager } from '@mantine/core';
import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { theme } from '~/core/styles/theme';

const colorSchemeManager = localStorageColorSchemeManager({ key: 'my-app-color-scheme' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager}>
      <Head>
        <title>Mantine Template</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
