import axios from 'axios'
import { NextPageWithLayout, GetServerSideProps, GetStaticPropsResult, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { TopPage } from '@/components/templates/TopPage'
import { customSearchEndpoint } from '@/constant/url'
import { AppLayout } from '@/layout/AppLayout'
import useLogin from '@/lib/hook/useLogin'
import { SearchObj } from '@/types/search'

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
