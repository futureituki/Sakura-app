import { ThemeProvider } from '@mui/material/styles'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { LoginPage } from '@/components/templates/Login'
import { homeFontTheme } from '@/config/fontFamilry'
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
