import { css } from '@emotion/react'
import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { TitleBar } from '@/components/atoms/TitleBar'
import { music_id } from '@/constant/music-list'
import { Music } from '@/types/spotify'
export const SpotifySinglePage = () => {
  const links_box = css`
    display: flex;
    gap: 40px;
    justify-content: center;
    margin: 60px 0;
  `
  const container = css`
    max-width: 1400px;
    margin: 0 auto;
  `
  return (
    <Box css={container}>
      <Box css={links_box}>
        <Box>
          <Link href='/spotify/single'>シングル</Link>
        </Box>
        <Box>
          <Link href='/spotify/ranking'>ランキング</Link>
        </Box>
      </Box>
      <Box
        sx={{
          margin: '60px 0',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        {music_id.map((music: Music, index: number) =>
          music.type !== 'album' ? (
            <Link href={`/spotify/single/${music.id}`} key={index}>
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
          ) : (
            ''
          ),
        )}
      </Box>
    </Box>
  )
}