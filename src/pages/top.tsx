import { GetStaticProps, GetStaticPropsResult, NextPageWithLayout } from 'next'
import Head from 'next/head'
import { TopPage } from '@/components/templates/TopPage'
import { customSearchEndpoint } from '@/constant/url'
import { AppLayout } from '@/layout/AppLayout'
import { getData } from '@/lib/bing-search'
import { SearchObj } from '@/types/search'

type Props = {
  search: SearchObj[]
}
export const getStaticProps: GetStaticProps<Props> = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const url =
    customSearchEndpoint +
    `?key=${process.env.NEXT_PUBLIC_API_KEY}&cx=${process.env.NEXT_PUBLIC_CUSTOM_ID}&sort=date&dateRestrict=d6&q=ニュース櫻坂46`
  const data = await getData(url)
  const search: SearchObj[] = data.data.items
  return {
    props: {
      search,
    },
  }
}
const Top: NextPageWithLayout<Props> = ({ search }) => {
  // const [tweets, setTweets] = useState<any>()
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
