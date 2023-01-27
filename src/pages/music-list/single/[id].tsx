import { Box } from '@mui/material'
import axios from 'axios'
import { NextPageWithLayout } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { TitleBar } from '@/components/atoms/TitleBar'
import { AppLayout } from '@/layout/AppLayout'
import useLoginApi from '@/lib/hook/useLoginApi'
import { Album } from '@/types/spotify'

const MusicDetail: NextPageWithLayout = () => {
  const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi()
  const router = useRouter()
  const id = router.query.id
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + loginData?.accessToken,
        },
      })
      .then((res) => res.data)
  const { data, error }: { data: Album; error: any } = useSWR(
    loginData?.accessToken ? `https://api.spotify.com/v1/albums/${id}` : null,
    fetcher,
  )
  if (error)
    return (
      <div>
        エラーが発生しました<br></br>Spotifyにログインしてください
      </div>
    )
  if (!data) return <div>Loading. . .</div>
  console.log(data)
  return (
    <>
      <TitleBar>Music List</TitleBar>
      {data ? (
        <Box
          sx={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            margin: '40px 0',
          }}
        >
          <Image
            src={data.images[0].url}
            width={300}
            height={300}
            alt={data.name}
            style={{ width: '70vw', height: '100%', margin: '0 auto' }}
          />
          <p
            style={{
              fontSize: '5vw',
              margin: '20px',
            }}
          >
            {data.name}
          </p>
        </Box>
      ) : (
        ''
      )}
      {data
        ? data.tracks.items.map((track: any, index: number) => (
            <Box key={index}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={data.images[0].url}
                  width={50}
                  height={50}
                  alt={data.name}
                  unoptimized
                />
                <p>{track.name}</p>
              </Box>
              <video controls playsInline muted>
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
