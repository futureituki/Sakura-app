import { ThemeProvider } from '@mui/material/styles'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FavoritePage } from '@/components/templates/FavoriteMember'
import { homeFontTheme } from '@/config/fontFamilry'
import { Layout } from '@/layout/Layout'
const Favorite: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
      </Head>
      <ThemeProvider theme={homeFontTheme}>
        <FavoritePage />
      </ThemeProvider>
    </>
  )
}
Favorite.getLayout = (page) => <Layout>{page}</Layout>

export default Favorite
