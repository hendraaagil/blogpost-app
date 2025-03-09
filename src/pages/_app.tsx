import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import { Geist, Geist_Mono } from 'next/font/google'

import { cn } from '@/lib/utils'
import theme from '@/styles/theme'
import '@/styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <main className={cn(geistSans.variable, geistMono.variable)}>
        <Component {...pageProps} />
      </main>
    </ConfigProvider>
  )
}
