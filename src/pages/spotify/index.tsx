import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { LargeProgress } from '@/components/atoms/Loading/progress'
import { SpotifyPage } from '@/components/templates/SpotifyPage'
import { AppLayout } from '@/layout/AppLayout'
import useLogin from '@/lib/hook/useLogin'
import useLoginApi from '@/lib/hook/useLoginApi'
const Spotify: NextPageWithLayout = () => {
  const router = useRouter()
  const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi()
  if (loginError) router.push('/music-list')
  if (!loginData) return <LargeProgress />
  if (!loginData.access_token) router.push('/music-list')
  console.log(loginData.access_token)
  return (
    <>
      <SpotifyPage />
    </>
  )
}
Spotify.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Spotify
