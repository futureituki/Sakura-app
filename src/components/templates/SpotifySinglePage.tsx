import { css } from '@emotion/react'
import { LinkOff } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import useSWR from 'swr'
import { TitleBar } from '../atoms/TitleBar'
import { LargeProgress } from '@/components/atoms/Loading/progress'
import { Album } from '@/types/spotify'

type Props = {
  token: string
}
export const SpotifySinglePage: FC<Props> = (token) => {
  const router = useRouter()
  const id = router.query.id
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + token.token,
        },
      })
      .then((res) => res.data)
  const { data: tracks, error }: { data: Album; error: any } = useSWR(
    token ? `https://api.spotify.com/v1/albums/${id}?market=JP` : null,
    fetcher,
  )
  if (error)
    return (
      <div>
        エラーが発生しました<br></br>Spotifyにログインしてください
      </div>
    )
  if (!tracks) return <LargeProgress />
  console.log(tracks)
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
      <TitleBar>{tracks.name}</TitleBar>
      <Box css={main_box}>
        <Image
          src={tracks.images[0].url}
          width={300}
          height={300}
          alt={tracks.name}
          css={main_img}
        />
        <p css={main_title}>{tracks.name}</p>
      </Box>
      <Box css={music_list}>
        {tracks.tracks.items.map((track: any, index: number) => (
          <Box key={index} css={music_container}>
            <Box css={music_box}>
              <Image
                src={tracks.images[0].url}
                width={50}
                height={50}
                alt={tracks.name}
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
        ))}
      </Box>
    </>
  )
}
