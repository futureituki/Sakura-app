import { NextPageWithLayout } from 'next'
import { AppLayout } from '@/layout/AppLayout'
import { MemberList } from '@/components/templates/MemberList'

const MemberListPage: NextPageWithLayout = () => {
  return (
    <>
      <MemberList />
    </>
  )
}
MemberListPage.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default MemberListPage
