import { ThemeProvider } from '@mui/material/styles'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import SignUp from '@/components/templates/SignUp'
import { homeFontTheme } from '@/config/fontFamilry'
import { Layout } from '@/layout/Layout'
const Sign: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
      </Head>
      <SignUp />
    </>
  )
}
Sign.getLayout = (page) => <Layout>{page}</Layout>
export default Sign
