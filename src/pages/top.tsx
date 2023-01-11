import { NextPageWithLayout, GetServerSideProps, GetStaticPropsResult, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { TopPage } from '@/components/templates/TopPage'
import { customSearchEndpoint } from '@/constant/url'
import { AdminAUTH } from '@/firebase/server'
import { AppLayout } from '@/layout/AppLayout'
import { getData } from '@/lib/bing-search'
import { SearchObj } from '@/types/search'
type Props = {
  search: SearchObj[]
}
export const getStaticProps: GetStaticProps<Props> = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  // const url =
  //   customSearchEndpoint +
  //   `?key=${process.env.NEXT_PUBLIC_CUSTOM_API_KEY}&cx=${process.env.NEXT_PUBLIC_CUSTOM_ID}&sort=date&dateRestrict=d6&q=ニュース`
  // const data = await getData(url)
  // const search: SearchObj[] = data.data.items
  const search: SearchObj[] = []
  return {
    props: {
      search,
    },
  }
}
const Top: NextPageWithLayout<Props> = ({ search }) => {
  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
      </Head>
      <TopPage searchs={search} />
    </>
  )
}
Top.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Top
