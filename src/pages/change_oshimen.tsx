import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ChangeOshimenPage } from '@/components/templates/ChangeOshimenPage'
import { AppLayout } from '@/layout/AppLayout'
import { Layout } from '@/layout/Layout'
const ChangeOshimen: NextPageWithLayout = () => {
  return (
    <>
      <ChangeOshimenPage />
    </>
  )
}
ChangeOshimen.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default ChangeOshimen
