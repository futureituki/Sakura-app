import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { MyPage } from '@/components/templates/Mypage'
import { AppLayout } from '@/layout/AppLayout'
import useLogin from '@/lib/hook/useLogin'
import { LargeProgress } from '@/components/atoms/Loading/progress'
const MyPages: NextPageWithLayout = () => {
  const router = useRouter()
  const { data, error } = useLogin()
  if (error) return <p>エラーが発生しました</p>
  if (!data) return <LargeProgress />
  if (data.user === null) router.push('/login')
  return (
    <>
      <MyPage />
    </>
  )
}
MyPages.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default MyPages
