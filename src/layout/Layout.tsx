import Head from 'next/head'
import { ReactElement } from 'react'
import { Footer } from '@/layout/Footer/Footer'
import { HomePageHeader } from '@/layout/Header/HomePageHeader'

type LayoutProps = Required<{
  readonly children: ReactElement
}>
export const Layout = ({ children }: LayoutProps) => (
  <>
    <HomePageHeader />
    {children}
    <Footer />
  </>
)
