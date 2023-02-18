import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { LargeProgress } from '@/components/atoms/Loading/progress'
import { DiscographyPage } from '@/components/templates/DiscographyPage'
import { AppLayout } from '@/layout/AppLayout'
import useLoginApi from '@/lib/hook/useLoginApi'
const Spotify: NextPageWithLayout = () => {
  const router = useRouter()
  const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi()
  if (loginError) router.push('/music-list')
  if (!loginData) return <LargeProgress />
  if (!loginData.access_token) router.push('/music-list')
  return (
    <>
      <DiscographyPage />
    </>
  )
}
Spotify.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Spotify
