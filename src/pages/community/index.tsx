import { NextPageWithLayout, InferGetServerSidePropsType, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AdminDB } from '@/firebase/server'
import { AppLayout } from '@/layout/AppLayout'
const Community: NextPageWithLayout = () => {
  const router = useRouter()
  return (
    <>
      投稿しよう！
      <button onClick={() => router.push('/community/posts')}>投稿を見る</button>
    </>
  )
}
Community.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Community
