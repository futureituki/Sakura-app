import { Router } from '@mui/icons-material'
import { Box } from '@mui/material'
import axios from 'axios'
import { NextPageWithLayout, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { PrimaryButton } from '@/components/atoms/Button'
import { MusicListPage } from '@/components/templates/MusicListPage'
import { music_id } from '@/constant/music-list'
import { AppLayout } from '@/layout/AppLayout'
import useLoginApi from '@/lib/hook/useLoginApi'

const MusicList: NextPageWithLayout = () => {
  // const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi()
  const router = useRouter()
  const spotify_button = async () => {
    await axios.post('/api/auth/authorize')
    router.push('/spotify')
  }
  return (
    <>
      <MusicListPage />

      <Box sx={{}}>
        <p style={{ fontSize: '4vw' }}>もっと聞きたい人はSPOTIFYにログインしてね</p>
        <p style={{ fontSize: '2vw' }}>※ログイン後この画面に再度リダイレクトされます</p>
        <PrimaryButton
          variant='contained'
          label='login'
          color='#fff'
          background='#1BD760'
          onClick={spotify_button}
        >
          with Spotify
        </PrimaryButton>
      </Box>
    </>
  )
}
MusicList.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default MusicList
