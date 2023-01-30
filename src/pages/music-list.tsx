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

type Music = {
  id: string
  src: string
  title: string
  type: string
}
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
      {loginData?.accessToken ? (
        <Box
          sx={{
            width: '90%',
            maxWidth: '1440px',
            margin: '0 auto',
          }}
        >
          <Link href='/music-list/single'>Single</Link>
          <Box
            sx={{
              margin: '60px 0',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '40px',
            }}
          >
            {music_id.map((music: Music, index: number) => (
              <Link href={`/music-list/single/${music.id}`} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <Image
                    src={`/assets/${music.src}`}
                    alt={music.title}
                    width={400}
                    height={400}
                    style={{ width: '40vw', height: '100%', display: 'block' }}
                  />
                  <Box
                    sx={{
                      border: '1px solid #f2f2f2',
                      borderRadius: '2.5em',
                      padding: '5px 15px',
                      width: 'fit-Content',
                      fontSize: '2vw',
                    }}
                  >
                    <span>{music.type}</span>
                  </Box>
                  <p style={{ fontSize: '3.4vw' }}>{music.title}</p>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      ) : (
        ''
      )}
    </>
  )
}
MusicList.getLayout = (page) => <AppLayout>{page}</AppLayout>

export const getStaticProps: GetStaticProps = async () => {
  // https://accounts.spotify.com/authorizeへのリクエストパラメータに必要な項目を設定
  const scopes = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
  ]
  const params = new URLSearchParams()
  params.append('client_id', process.env.SPOTIFY_CLIENT_ID || '')
  params.append('response_type', 'code')
  params.append('redirect_uri', `${process.env.RETURN_TO}` || '')
  params.append('scope', scopes.join(' '))
  params.append('state', 'state')
  return {
    props: { loginPath: `https://accounts.spotify.com/authorize?${params.toString()}` },
  }
}

export default MusicList
