import { css } from '@emotion/react'
import { LinkOff, Router } from '@mui/icons-material'
import { Box } from '@mui/material'
import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { LargeProgress } from '@/components/atoms/Loading/progress'
import { SpotifySinglePage } from '@/components/templates/SpotifySinglePage'
import { AppLayout } from '@/layout/AppLayout'
import useLoginApi from '@/lib/hook/useLoginApi'
const MusicDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi()
  if (loginError)
    return (
      <div>
        エラーが発生しました<br></br>Spotifyにログインしてください
      </div>
    )
  if (!loginData) return <LargeProgress />
  if (!loginData.accessToken) router.push('/music-list')
  return (
    <>
      <SpotifySinglePage token={loginData.accessToken as string} />
    </>
  )
}

MusicDetail.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default MusicDetail
