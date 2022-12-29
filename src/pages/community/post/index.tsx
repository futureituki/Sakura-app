import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { CommunityPostPage } from '@/components/templates/CommunityPostPage'
import { AppLayout } from '@/layout/AppLayout'
const CommunityPost: NextPageWithLayout = () => {
  return (
    <>
      <CommunityPostPage />
    </>
  )
}
CommunityPost.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default CommunityPost
