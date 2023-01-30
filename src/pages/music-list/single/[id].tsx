import { css } from '@emotion/react'
import { LinkOff } from '@mui/icons-material'
import { Box } from '@mui/material'
import axios from 'axios'
import { NextPageWithLayout } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { LargeProgress } from '@/components/atoms/Loading/progress'
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
  if (!data) return <LargeProgress />

  const video = css`
    width: 300px;
    height: 50px;
  `
  const music_box = css`
    display: flex;
    align-items: center;
    gap: 15px;
    width: 200px;
    font-size: 1vw;
  `
  const music_container = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
  `
  const music_list = css`
    width: 80%;
    margin: 0 auto;
    max-width: 1440px;
    @media (max-width: 500px) {
      width: 95%;
    }
  `
  const main_img = css`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    max-width: 600px;
  `
  const main_title = css`
    font-size: 3vw;
    margin: 20px auto;
  `
  const main_box = css`
    width: 80vw;
    margin: 60px auto;
    display: flex;
    flex-direction: column;
    maxwidth: 1440px;
  `
  return (
    <>
      <TitleBar>Music List</TitleBar>
      {data ? (
        <Box css={main_box}>
          <Image src={data.images[0].url} width={300} height={300} alt={data.name} css={main_img} />
          <p css={main_title}>{data.name}</p>
        </Box>
      ) : (
        ''
      )}
      <Box css={music_list}>
        {data
          ? data.tracks.items.map((track: any, index: number) => (
              <Box key={index} css={music_container}>
                <Box css={music_box}>
                  <Image
                    src={data.images[0].url}
                    width={50}
                    height={50}
                    alt={data.name}
                    unoptimized
                  />
                  <p>{track.name}</p>
                </Box>
                <video controls playsInline muted css={video}>
                  <source src={track.preview_url} type='video/mp4' />
                </video>
                <Link href={track.external_urls.spotify}>
                  <LinkOff />
                </Link>
              </Box>
            ))
          : ''}
      </Box>
    </>
  )
}

MusicDetail.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default MusicDetail
