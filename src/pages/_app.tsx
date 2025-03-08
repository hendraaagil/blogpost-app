import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'

import theme from '@/styles/theme'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}
