import { Box } from '@mui/material'
import axios from 'axios'
import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { TitleBar } from '@/components/atoms/TitleBar'
import { AppLayout } from '@/layout/AppLayout'
import useLoginApi from '@/lib/hook/useLoginApi'
import { Album } from '@/types/spotify'

const MusicDetail: NextPageWithLayout = () => {
  const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi()
  const [trackContents, setTracksContents] = useState<Album>()
  const router = useRouter()
  const id = router.query.id
  console.log(loginData)
  useEffect(() => {
    if (loginData?.accessToken) {
      axios
        .get(`https://api.spotify.com/v1/albums/${id}`, {
          headers: {
            Authorization: 'Bearer ' + loginData.accessToken,
          },
        })
        .then((tracksReaponse) => {
          setTracksContents(tracksReaponse.data)
        })
    }
  }, [loginData])
  console.log(trackContents)
  return (
    <>
      <TitleBar>Music List</TitleBar>
      {trackContents ? (
        <Box
          sx={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            margin: '40px 0',
          }}
        >
          <img
            src={trackContents.images[0].url}
            style={{ width: '70vw', height: '100%', margin: '0 auto' }}
          />
          <p
            style={{
              fontSize: '5vw',
              margin: '20px',
            }}
          >
            {trackContents.name}
          </p>
        </Box>
      ) : (
        ''
      )}
      {trackContents
        ? trackContents.tracks.items.map((track: any, index: number) => (
            <Box key={index}>
              <video controls playsInline>
                <source src={track.preview_url} type='video/mp4' />
              </video>
              <p>{track.name}</p>
            </Box>
            // <Link href={track.external_urls.spotify}>{track.name}</Link>
          ))
        : ''}
    </>
  )
}

MusicDetail.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default MusicDetail
