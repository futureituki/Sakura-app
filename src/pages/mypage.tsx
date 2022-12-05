import { ThemeProvider } from '@mui/material/styles'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { HomePage } from '@/components/templates/HomePage'
import { MyPage } from '@/components/templates/Mypage'
import { homeFontTheme } from '@/config/fontFamilry'
import { AppLayout } from '@/layout/AppLayout'
import { Layout } from '@/layout/Layout'
const MyPages: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
      </Head>
      <ThemeProvider theme={homeFontTheme}>
        <MyPage />
      </ThemeProvider>
    </>
  )
}
MyPages.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default MyPages
