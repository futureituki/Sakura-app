import Head from 'next/head'
import { ReactElement } from 'react'
import { BreadCrumb } from '@/components/BreadCrumb'
import { AppFooter } from '@/layout/Footer/AppFooter'
import { AppHeader } from '@/layout/Header/AppHeader'

type LayoutProps = Required<{
  readonly children: ReactElement
}>
export const AppLayout = ({ children }: LayoutProps) => (
  <>
    <div style={{ overflow: 'hidden' }}>
      <AppHeader />
      <BreadCrumb />
      {children}
      <AppFooter />
    </div>
  </>
)
