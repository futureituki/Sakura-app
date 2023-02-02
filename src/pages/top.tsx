import axios from 'axios'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { TopPage } from '@/components/templates/TopPage'
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
