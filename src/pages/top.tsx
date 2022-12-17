import { GetStaticProps, GetStaticPropsResult, NextPageWithLayout } from 'next'
import Head from 'next/head'
import { TopPage } from '@/components/templates/TopPage'
import { accessKey, webEndpoint } from '@/constant/url'
import { AppLayout } from '@/layout/AppLayout'
import { getData } from '@/lib/bing-search'
import { GetImg } from '@/lib/img'
import { GetUser } from '@/lib/user'
import { NewsObj } from '@/types/news'

type Props = {
  blogs: NewsObj[]
}
// export const getStaticProps: GetStaticProps<Props> = async (): Promise<
//   GetStaticPropsResult<Props>
// > => {
//   const url =
//     webEndpoint +
//     `?count=10&responseFilter=Webpages&freshness=Week&safeSearch=Strict&q=NEWS+site:sakurazaka46.com`
//   const blogData = await getData(url, accessKey)
//   const blogs: NewsObj[] = blogData.webPages.value
//   return {
//     props: {
//       blogs,
//     },
//   }
// }

const Top: NextPageWithLayout<Props> = () => {
  const image = GetImg()
  const user = GetUser()
  console.log(user, image)
  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
      </Head>
      {/* <TopPage blogs={blogs as NewsObj[]} /> */}
    </>
  )
}
Top.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Top
