import Head from 'next/head'
import { Geist, Geist_Mono } from 'next/font/google'
import { Button, Typography } from 'antd'

import { cn } from '@/lib/utils'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={cn(geistSans.variable, geistMono.variable, 'pt-8')}>
        <Typography.Title level={1} className="animate-bounce">
          Title
        </Typography.Title>
        <Button type="primary">Button</Button>
      </div>
    </>
  )
}
