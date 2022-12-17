import { GetStaticProps, GetStaticPropsResult, NextPageWithLayout } from 'next'
import Head from 'next/head'
import { TopPage } from '@/components/templates/TopPage'
import { AppLayout } from '@/layout/AppLayout'
import { getData } from '@/lib/bing-search'
import { GetImg } from '@/lib/img'
import { GetUser } from '@/lib/user'
import { SearchObj } from '@/types/search'

type Props = {
  search: SearchObj[]
}

export const getStaticProps: GetStaticProps<Props> = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const url =
    'https://www.googleapis.com/customsearch/v1?key=AIzaSyBQDRkSqqgoG4rTk9czMdjhW0ElY39QqMo&cx=708d155ae7f0e495c&dateRestrict=d6&q=ニュース櫻坂46'
  const data = await getData(url)
  const search: SearchObj[] = data.data.items
  return {
    props: {
      search,
    },
  }
}

const Top: NextPageWithLayout<Props> = ({ search }) => {
  // const user = GetUser()
  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
      </Head>
      <TopPage searchs={search as SearchObj[]} />
    </>
  )
}
Top.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Top
