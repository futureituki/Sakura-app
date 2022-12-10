import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import { TopPage } from '@/components/templates/TopPage'
import { homeFontTheme } from '@/config/fontFamilry'
import { AppLayout } from '@/layout/AppLayout'
const Top: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
      </Head>
        <TopPage />
    </>
  )
}
Top.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Top
