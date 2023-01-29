import Head from 'next/head'
import { ReactElement } from 'react'
import { Footer } from '@/layout/Footer/Footer'

type LayoutProps = Required<{
  readonly children: ReactElement
}>
export const Layout = ({ children }: LayoutProps) => (
  <>
    {children}
    <Footer />
  </>
)
