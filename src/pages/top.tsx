import axios from 'axios'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { TopPage } from '@/components/templates/TopPage'
import { AppLayout } from '@/layout/AppLayout'
import { HistoryContext } from '@/redux/context/history'

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
