import { ReactElement } from 'react'
import { Footer } from '@/layout/Footer/Footer'
import { HomePageHeader } from '@/layout/Header/HomePageHeader'
import Head from 'next/head'

type LayoutProps = Required<{
  readonly children: ReactElement
}>
export const Layout = ({ children }: LayoutProps) => (
  <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
      </Head>
    <HomePageHeader />
    {children}
    <Footer />
  </>
)
