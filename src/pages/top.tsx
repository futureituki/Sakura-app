import { NextPageWithLayout, GetServerSideProps } from 'next'
import Head from 'next/head'
import nookies from 'nookies'
import { useEffect, useState } from 'react'
import { TopPage } from '@/components/templates/TopPage'
import { customSearchEndpoint } from '@/constant/url'
import { AdminAUTH } from '@/firebase/server'
import { AppLayout } from '@/layout/AppLayout'
import { getData } from '@/lib/bing-search'
import { SearchObj } from '@/types/search'
type Props = {
  search: SearchObj[]
}

const Top: NextPageWithLayout<Props> = () => {
  // const [tweets, setTweets] = useState<any>()
  // const user = GetUser()
  const [searchNews, setSearchNews] = useState<SearchObj[]>([])
  useEffect(() => {
    const getNews = async () => {
      const url =
        customSearchEndpoint +
        `?key=${process.env.NEXT_PUBLIC_CUSTOM_API_KEY}&cx=${process.env.NEXT_PUBLIC_CUSTOM_ID}&sort=date&dateRestrict=d6&q=ニュース`
      const data = await getData(url)
      const search: SearchObj[] = data.data.items
      setSearchNews(search)
    }
    getNews()
  }, [])
  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
      </Head>
      <TopPage searchs={searchNews} />
    </>
  )
}
Top.getLayout = (page) => <AppLayout>{page}</AppLayout>

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  const session = cookies.session || ''
  // セッションIDを検証して、認証情報を取得する
  const user = await AdminAUTH.verifySessionCookie(session, true).catch(() => null)

  // 認証情報が無い場合は、ログイン画面へ遷移させる
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      email: user.email,
    },
  }
}
export default Top
