import { NextPageWithLayout, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { CommunityPage } from '@/components/templates/CommunityPage'
import { AdminDB } from '@/firebase/server'
import { AppLayout } from '@/layout/AppLayout'
import { Community } from '@/types/community'
const Community: NextPageWithLayout = ({
  community,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <CommunityPage communitys={community} />
    </>
  )
}
Community.getLayout = (page) => <AppLayout>{page}</AppLayout>

export const getServerSideProps: GetServerSideProps = async () => {
  const communitySnap = await AdminDB.collection(`community`).orderBy('created_at', 'desc').get()
  const communitys = communitySnap.docs.map((doc) => doc.data() as Community)
  const community = JSON.parse(JSON.stringify(communitys))
  return {
    props: {
      community,
    },
  }
}
export default Community
