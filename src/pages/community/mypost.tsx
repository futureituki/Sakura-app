import { css } from '@emotion/react'
import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { MyPostPage } from '@/components/templates/MyPostPage'
import { AppLayout } from '@/layout/AppLayout'
const MyPost: NextPageWithLayout = () => {
  return (
    <>
      <MyPostPage />
    </>
  )
}
MyPost.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default MyPost
