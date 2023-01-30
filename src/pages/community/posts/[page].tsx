import axios from 'axios'
import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { LargeProgress } from '@/components/atoms/Loading/progress'
import PostsPagination from '@/components/pagination/post/list'
import { CommunityPage } from '@/components/templates/CommunityPage'
import { AppLayout } from '@/layout/AppLayout'

const IndividualPage: NextPageWithLayout = () => {
  const router = useRouter()
  const fetcher = (url: string) => {
    return axios.get(url).then((res) => {
      return res.data
    })
  }
  const { data, error }: { data: any; error: any } = useSWR(
    router.query.page ? `/api/post/${router.query.page}` : '',
    fetcher,
  )
  console.log(data)
  if (error) return <div>情報を取得できませんでした。インターネット状況をお確かめください</div>
  if (!data) return <LargeProgress />
  const pageNum = sessionStorage.getItem('pages')
  return (
    <>
      <CommunityPage communitys={data} />
      <PostsPagination numberPages={pageNum as unknown as number} />
    </>
  )
}

IndividualPage.getLayout = (page) => <AppLayout>{page}</AppLayout>
export default IndividualPage
