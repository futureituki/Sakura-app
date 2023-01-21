import axios from 'axios'
import { NextPageWithLayout, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import useSWR from 'swr'
import { MyPage } from '@/components/templates/Mypage'
import { AdminAUTH } from '@/firebase/server'
import { AppLayout } from '@/layout/AppLayout'
import useLogin from '@/lib/hook/useLogin'
const MyPages: NextPageWithLayout = () => {
  const router = useRouter()
  const { data, error } = useLogin()
  if (!data) return <div>Loading</div>
  if (data.user === null) router.push('/login')
  return (
    <>
      <MyPage />
    </>
  )
}
MyPages.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default MyPages
