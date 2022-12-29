import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { CommunityPage } from '@/components/templates/CommunityPage'
import { AppLayout } from '@/layout/AppLayout'
const Community: NextPageWithLayout = () => {
  return (
    <>
      <CommunityPage />
    </>
  )
}
Community.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Community
