import { NextPageWithLayout } from 'next'
import LoginPage from '@/components/templates/Login'
import { Layout } from '@/layout/Layout'
const Login: NextPageWithLayout = () => {
  return (
    <>
      <LoginPage />
    </>
  )
}
Login.getLayout = (page) => <Layout>{page}</Layout>
export default Login
