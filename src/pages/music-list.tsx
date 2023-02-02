import { Box } from '@mui/material'
import { NextPageWithLayout, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'
import { PrimaryButton } from '@/components/atoms/Button'
import { MusicListPage } from '@/components/templates/MusicListPage'
import { music_id } from '@/constant/music-list'
import { AppLayout } from '@/layout/AppLayout'
import useLoginApi from '@/lib/hook/useLoginApi'

const MusicList: NextPageWithLayout = ({
  loginPath,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi()
  const login = useCallback(() => {
    window.location.href = loginPath
  }, [loginPath])

  return (
    <>
      <MusicListPage />
      {loginData?.accessToken ? (
        ''
      ) : (
        <Box sx={{}}>
          <p style={{ fontSize: '4vw' }}>もっと聞きたい人はSPOTIFYにログインしてね</p>
          <p style={{ fontSize: '2vw' }}>※ログイン後この画面に再度リダイレクトされます</p>
          <PrimaryButton
            variant='contained'
            label='login'
            color='#fff'
            background='#1BD760'
            onClick={login}
          >
            Sign in with Spotify
          </PrimaryButton>
        </Box>
      )}
    </>
  )
}
MusicList.getLayout = (page) => <AppLayout>{page}</AppLayout>

export const getStaticProps: GetStaticProps = async () => {
  // https://accounts.spotify.com/authorizeへのリクエストパラメータに必要な項目を設定
  const scopes = [
    'user-read-email',
    'user-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-read-playback-state',
    'user-top-read',
  ]
  const params = new URLSearchParams()
  params.append('client_id', process.env.SPOTIFY_CLIENT_ID || '')
  params.append('response_type', 'code')
  params.append('redirect_uri', `${process.env.RETURN_TO}` || '')
  params.append('scope', scopes.join(' '))
  params.append('show_dialog', 'true')
  params.append('state', 'state')
  return {
    props: { loginPath: `https://accounts.spotify.com/authorize?${params.toString()}` },
  }
}

export default MusicList
