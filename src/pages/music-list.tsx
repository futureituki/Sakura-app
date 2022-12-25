import axios from 'axios'
import { NextPageWithLayout, GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import session from 'redux-persist/lib/storage/session'
import { MusicListPage } from '@/components/templates/MusicListPage'
import { AppLayout } from '@/layout/AppLayout'
import useLoginApi from '@/lib/hook/useLoginApi'
import { accessUrl, getTokenFromUrl } from '@/spotify/spotify'

type SpotifyAuthApiResponse = {
  access_token: string
  token_type: string
  scope: string
  expires_in: number
  refresh_token: string
}

const MusicList: NextPageWithLayout = ({
  loginPath,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi()
  const [trackContents, setTracksContents] = useState([])
  console.log(loginData)
  const login = useCallback(() => {
    window.location.href = loginPath
  }, [loginPath])
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (loginData?.accessToken) {
      axios(`https://api.spotify.com/v1/albums/0k4rYF9WBoCOoPjr0fEvER`, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + loginData.accessToken },
      }).then((tracksReaponse) => {
        setTracksContents(tracksReaponse.data.tracks.items)
      })
    }
  }, [loginData])
  console.log(trackContents)
  return (
    <>
      <button onClick={login}>Sign in with Spotify</button>
      {trackContents
        ? trackContents.map((track: any, index) => (
            <div key={index}>
              {track.name}
              <iframe
                style={{ position: 'relative' }}
                src={track.preview_url}
                width={100}
                height={100}
              />
            </div>
            // <Link href={track.external_urls.spotify}>{track.name}</Link>
          ))
        : ''}
      <MusicListPage />
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
  params.append('redirect_uri', process.env.RETURN_TO || '')
  params.append('scope', scopes.join(' '))
  params.append('state', 'state')
  return {
    props: { loginPath: `https://accounts.spotify.com/authorize?${params.toString()}` },
  }
}

export default MusicList
