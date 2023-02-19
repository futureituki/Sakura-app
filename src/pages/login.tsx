import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import LoginPage from '@/components/templates/Login'
import { Layout } from '@/layout/Layout'
import { useGetUser } from '@/lib/user'
import { HistoryContext } from '@/redux/context/history'
const Login: NextPageWithLayout = () => {
  const router = useRouter()
  const history = useContext(HistoryContext)
  const user = useGetUser().user
  if (user.uid !== '') router.push('/top')
  if (history[1] === '/top' || history[1] === '/top?first_come=true' || history[1] === '/mypage') {
    toast.success('ログアウトに成功しました')
    history[1] = ''
  }
  return (
    <>
      <LoginPage />
    </>
  )
}
Login.getLayout = (page) => <Layout>{page}</Layout>
export default Login
