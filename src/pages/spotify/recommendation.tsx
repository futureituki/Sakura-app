import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { LargeProgress } from '@/components/atoms/Loading/progress'
import { SpotifyRecommendationPage } from '@/components/templates/SpotifyRecommendationPage'
import { AppLayout } from '@/layout/AppLayout'
import useLoginApi from '@/lib/hook/useLoginApi'

const Recommendation: NextPageWithLayout = () => {
  const router = useRouter()
  const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi()
  if (loginError) router.push('/music-list')
  if (!loginData) return <LargeProgress />
  if (!loginData.accessToken) router.push('/music-list')
  return (
    <>
      <SpotifyRecommendationPage token={loginData.accessToken as string} />
    </>
  )
}

Recommendation.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Recommendation
