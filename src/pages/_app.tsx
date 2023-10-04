import { MantineProvider, localStorageColorSchemeManager } from '@mantine/core'
import '@mantine/core/styles.css'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { NavigationProgress } from '@mantine/nprogress'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { env } from '~/config/env'
import { theme } from '~/core/styles/theme'
import getSiteLayout from '~/layouts/core'

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'my-app-color-scheme',
})

export default function App(props: AppProps) {
  const siteLayout = getSiteLayout(props)

  const title = env.APP_NAME
  const description = `${env.APP_NAME} - Improve your website with me.`
  const metaURL = env.SITE_URL
  const metaImage = '/favicon.svg'
  const webIconURL = '/favicon.svg'

  return (
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager}>
      <Head>
        <title>{env.APP_NAME}</title>
        <meta name="title" content={title} />
        <link rel="icon" href={webIconURL} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaURL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={metaImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={metaURL} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={metaImage} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      {/* router transition provider */}
      <NavigationProgress />

      {/* notification provider */}
      <Notifications position="top-right" zIndex={2077} />

      {/* modal provider */}
      <ModalsProvider>
        {/* render site layout */}
        {siteLayout}
      </ModalsProvider>
    </MantineProvider>
  )
}
