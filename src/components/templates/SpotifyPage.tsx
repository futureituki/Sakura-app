import { css } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { music_id } from '@/constant/music-list'
import { Music } from '@/types/spotify'

export const SpotifyPage = () => {
  const container = css`
    max-width: 1400px;
    margin: 0 auto;
  `
  const link = css``
  const links_box = css`
    display: flex;
    gap: 40px;
    justify-content: center;
    margin: 60px 0;
  `
  const main_img = css`
    width: 40vw;
    height: 100%;
    max-width: 500px;
    display: block;
  `
  const type_text = css`
    border: 1px solid #f2f2f2;
    border-radius: 2.5em;
    padding: 5px 15px;
    width: fit-content;
    font-size: 1.6vw;
  `
  const title_text = css`
    font-size: 2.2vw;
  `
  const music_box = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  `
  const music_area = css`
    margin: 60px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
  `
  return (
    <Box css={container}>
      <Box css={links_box}>
        <Box css={link}>
          <Link href='/spotify/single'>シングル</Link>
        </Box>
        <Box css={link}>
          <Link href='/spotify/ranking'>ランキング</Link>
        </Box>
      </Box>
      <Box css={music_area}>
        {music_id.map((music: Music, index: number) => (
          <Link href={`/spotify/single/${music.id}`} key={index}>
            <Box css={music_box}>
              <Image
                src={`/assets/${music.src}`}
                alt={music.title}
                width={400}
                height={400}
                css={main_img}
              />
              <Box css={type_text}>
                <Typography>{music.type}</Typography>
              </Box>
              <Typography css={title_text}>{music.title}</Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  )
}
