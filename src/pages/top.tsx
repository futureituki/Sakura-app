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
  const router = useRouter()
  const url =
    customSearchEndpoint +
    `?key=${process.env.NEXT_PUBLIC_CUSTOM_API_KEY}&cx=${process.env.NEXT_PUBLIC_CUSTOM_ID}&sort=date&dateRestrict=d6&q=ニュース`
  const fetcher = async (url: string) => {
    return await axios.get(url).then((data) => {
      return data.data.items
    })
  }
  const { data, error }: { data: SearchObj[]; error: any } = useSWR(url, fetcher)
  if (error) return <div>Error News取得に失敗しました。</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
      </Head>
      <TopPage searchs={data} />
    </>
  )
}
Top.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Top
