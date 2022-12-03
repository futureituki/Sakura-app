import { ThemeProvider } from '@mui/material/styles'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { HomePage } from '@/components/templates/HomePage'
import { Logout } from '@/components/templates/Logout'
import { homeFontTheme } from '@/config/fontFamilry'
import { Layout } from '@/layout/Layout'
const LogoutPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
      </Head>
      <ThemeProvider theme={homeFontTheme}>
        <Logout />
      </ThemeProvider>
    </>
  )
}
LogoutPage.getLayout = (page) => <Layout>{page}</Layout>

export default LogoutPage
