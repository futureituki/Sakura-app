import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { Member } from '@/components/templates/Member'
import { AppLayout } from '@/layout/AppLayout'

const MemberPage: NextPageWithLayout = () => {
  const router = useRouter()
  const name = router.query.name
  return (
    <>
      <Member name={name as string} />
    </>
  )
}

MemberPage.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default MemberPage
