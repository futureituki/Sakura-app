import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { LargeProgress } from '@/components/atoms/Loading/progress'
import { DiscographyRankingPage } from '@/components/templates/DiscographyRankingPage'
import { AppLayout } from '@/layout/AppLayout'
import useLoginApi from '@/lib/hook/useLoginApi'

const Ranking: NextPageWithLayout = () => {
  const router = useRouter()
  const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi()
  if (loginError) router.push('/music-list')
  if (!loginData) return <LargeProgress />
  if (!loginData.access_token) router.push('/music-list')
  return (
    <>
      <DiscographyRankingPage token={loginData.access_token as string} />
    </>
  )
}

Ranking.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Ranking
