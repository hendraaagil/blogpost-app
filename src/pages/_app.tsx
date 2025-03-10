import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ConfigProvider } from 'antd'
import { Geist } from 'next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import theme from '@/styles/theme'
import '@/styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <Head>
        <title>Blogpost App</title>
        <meta name="description" content="A blogpost app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={geistSans.variable}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </main>
    </ConfigProvider>
  )
}
