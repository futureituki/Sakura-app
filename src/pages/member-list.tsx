import { NextPageWithLayout } from 'next'
import { MemberList } from '@/components/templates/MemberList'
import { AppLayout } from '@/layout/AppLayout'

const MemberListPage: NextPageWithLayout = () => {
  return (
    <>
      <MemberList />
    </>
  )
}
MemberListPage.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default MemberListPage
