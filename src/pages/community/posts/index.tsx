import { NextPageWithLayout, InferGetServerSidePropsType, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PrimaryButton } from '@/components/atoms/Button'
import Pagination from '@/components/pagination'
import { CommunityPage } from '@/components/templates/CommunityPage'
import { TagListPage } from '@/components/templates/TagListPage'
import { AdminDB } from '@/firebase/server'
import { AppLayout } from '@/layout/AppLayout'
import { Community } from '@/types/community'
const Posts: NextPageWithLayout = ({
  community,
  postsCount,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const router = useRouter()
  sessionStorage.setItem('pages', postsCount._data.count)
  return (
    <>
      <CommunityPage communitys={community} />
      <Pagination numberPages={postsCount._data.count} />
      <TagListPage />
    </>
  )
}
Posts.getLayout = (page) => <AppLayout>{page}</AppLayout>

export const getStaticProps: GetStaticProps = async () => {
  const communitySnap = await AdminDB.collection(`community`)
    .orderBy('created_at', 'desc')
    .limit(3)
    .get()
  const count = await AdminDB.collection(`community`).orderBy('created_at', 'desc').count().get()
  const communitys = communitySnap.docs.map((doc) => doc.data() as Community)
  const community = JSON.parse(JSON.stringify(communitys))
  const postsCount = JSON.parse(JSON.stringify(count))
  return {
    props: {
      community,
      postsCount,
    },
    revalidate: 5,
  }
}
export default Posts
