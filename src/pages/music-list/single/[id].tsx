import { Box } from '@mui/material'
import axios from 'axios'
import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { TitleBar } from '@/components/atoms/TitleBar'
import { Member } from '@/components/templates/Member'
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
        <img src={trackContents.images[0].url} style={{ width: '50vw', height: '100%' }} />
      ) : (
        ''
      )}
      {trackContents
        ? trackContents.tracks.items.map((track: any, index: number) => (
            <Box key={index}>
              {track.name}
              <video controls>
                <source src={track.preview_url} type='video/mp4' />
              </video>
            </Box>
            // <Link href={track.external_urls.spotify}>{track.name}</Link>
          ))
        : ''}
    </>
  )
}

MusicDetail.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default MusicDetail
