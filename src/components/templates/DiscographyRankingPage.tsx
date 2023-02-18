import { css } from '@emotion/react'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import { Box, Typography } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import Error from 'next/error'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import useSWR from 'swr'
import { LargeProgress } from '@/components/atoms/Loading/progress'
import { TitleBar } from '@/components/atoms/TitleBar'
import { DiscographyLink } from '@/components/discographyLink'
import { Ranking } from '@/types/spotify'

type Props = {
  token: string
}
export const DiscographyRankingPage: FC<Props> = (token) => {
  // artists/{id}/top-tracks
  const today = moment().format('YYYY年MM月DD日 ddd')
  const ARTISTS_NUMBER = '0Ti7MfCiVVQAK8zLSiqlto'
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + token.token,
        },
      })
      .then((res) => res.data)
  const { data: tracks, error } = useSWR(
    token ? `https://api.spotify.com/v1/artists/${ARTISTS_NUMBER}/top-tracks?market=JP` : null,
    fetcher,
  )
  if (error)
    return (
      <div>
        エラーが発生しました<br></br>Spotifyにログインしてください
      </div>
    )
  if (!tracks) return <LargeProgress />
  const top_tracks = tracks.tracks.filter((track: Ranking, index: number) => index < 3)
  console.log(top_tracks)
  const container = css`
    max-width: 1400px;
    margin: 0 auto;
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
  const top_music_box = css`
    display: flex;
    align-items: center;
    gap: 15px;
    width: 70%;
    max-width: 450px;
    font-size: 1vw;
    flex-direction: column;
    margin: 60px auto;
  `
  const music_box = css`
    display: flex;
    align-items: center;
    gap: 20px;
    width: 70%;
    max-width: 450px;
    font-size: 1vw;
    margin: 20px 0;
  `
  const ranking_text = css`
    display: grid;
    place-items: center;
    margin: 40px 0;
  `
  const top_container = css`
    max-width: 1440px;
    width: 80%;
    margin: 30px auto;
    @media (min-width: 600px) {
      display: flex;
      justify-content: center;
      gap: 20px;
    }
  `
  const ranking_top_img = css`
    width: 100%;
    height: 100%;
  `
  const ranking_img = css`
    width: 20vw;
    height: 100%;
    max-width: 100px;
    max-height: 100px;
  `
  const ranking_first = css`
    font-size: 2.4vw;
    color: #e6b422;
  `
  const ranking_second = css`
    font-size: 2vw;
    color: #808080;
  `
  const ranking_third = css`
    font-size: 1.6vw;
    color: #c47222;
  `
  const ranking_fourth = css`
    width: 20px;
    font-size: 1.2vw;
  `
  const ranking_box = css`
    max-width: 1440px;
    width: 80%;
    margin: 0 auto;
  `
  const top_music_information = css`
    display: flex;
    gap: 20px;
  `
  return (
    <Box component='div' css={container}>
      <TitleBar>DISCOGRAPHY-RANKING</TitleBar>
      <DiscographyLink
        links={[
          { name: 'SINGLE', href: '/discography/single' },
          { name: 'ALBUM', href: '/discography/album' },
          { name: 'RANKING', href: '/discography/ranking' },
        ]}
      />
      <Typography css={ranking_text}>{today}時点のランキング</Typography>
      <Box component='div'>
        <Box component='div' css={music_list}>
          <Box component='div' css={top_container}>
            {top_tracks.map((track: Ranking, index: number) => (
              <Box css={top_music_box} key={index} component='div'>
                {index + 1 === 1 ? <Typography css={ranking_first}>１位</Typography> : ''}
                {index + 1 === 2 ? <Typography css={ranking_second}>２位</Typography> : ''}
                {index + 1 === 3 ? <Typography css={ranking_third}>３位</Typography> : ''}
                <Image
                  src={track.album.images[0].url}
                  width={300}
                  height={300}
                  alt={track.name}
                  css={ranking_top_img}
                  unoptimized
                />
                <Box css={top_music_information} component='div'>
                  <Typography>{track.name}</Typography>
                  <Link href={track.uri}>
                    <InsertLinkIcon />
                  </Link>
                </Box>
              </Box>
            ))}
          </Box>
          <Box css={ranking_box} component='div'>
            {tracks.tracks.map((track: Ranking, index: number) =>
              index + 1 >= 4 ? (
                <Box css={music_box} key={index} component='div'>
                  <Typography css={ranking_fourth}>{index + 1}</Typography>
                  <Image
                    src={track.album.images[0].url}
                    width={300}
                    height={300}
                    alt={track.name}
                    css={ranking_img}
                    unoptimized
                  />
                  <Typography>{track.name}</Typography>
                  <Link href={track.uri}>
                    <InsertLinkIcon />
                  </Link>
                </Box>
              ) : (
                ''
              ),
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
