import Head from 'next/head'
import Image from 'next/image'
import { NextPageWithLayout } from 'next'
import { Layout } from '@/layout/Layout'
import { HomePage } from '@/components/templates/HomePage'
import { homeFontTheme } from '@/config/fontFamilry'
import { ThemeProvider } from '@mui/material/styles'

const Home:NextPageWithLayout = () => {
  return (
    <>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Sawarabi+Mincho" rel="stylesheet"/>
    </Head>
    <ThemeProvider theme={homeFontTheme}>
      <HomePage/>
    </ThemeProvider>
    </>
  )
}
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home;