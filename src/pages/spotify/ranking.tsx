import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { LargeProgress } from '@/components/atoms/Loading/progress'
import { SpotifyRankingPage } from '@/components/templates/SpotifyRankingPage'
import { AppLayout } from '@/layout/AppLayout'
import useLoginApi from '@/lib/hook/useLoginApi'

const Ranking: NextPageWithLayout = () => {
  const router = useRouter()
  const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi()
  if (loginError) router.push('/music-list')
  if (!loginData) return <LargeProgress />
  if (!loginData.accessToken) router.push('/music-list')
  return (
    <>
      <SpotifyRankingPage token={loginData.accessToken as string} />
    </>
  )
}

Ranking.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Ranking
