import { NextPageWithLayout } from 'next'
import { MyPage } from '@/components/templates/Mypage'
import { AppLayout } from '@/layout/AppLayout'
const MyPages: NextPageWithLayout = () => {
  return (
    <>
      <MyPage />
    </>
  )
}
MyPages.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default MyPages
