import Head from 'next/head'
import { ReactElement } from 'react'
import { AppFooter } from '@/layout/Footer/AppFooter'
import { AppHeader } from '@/layout/Header/AppHeader'

type LayoutProps = Required<{
  readonly children: ReactElement
}>
export const AppLayout = ({ children }: LayoutProps) => (
  <>
    <Head>
      <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
    </Head>
    <div style={{ overflow: 'hidden' }}>
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  </>
)
