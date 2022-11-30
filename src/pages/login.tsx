import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import LoginPage from '@/components/templates/Login'
import { Layout } from '@/layout/Layout'
const Login: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
      </Head>
      <LoginPage />
    </>
  )
}
Login.getLayout = (page) => <Layout>{page}</Layout>
export default Login
