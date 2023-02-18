import { css } from '@emotion/react'
import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { TitleBar } from '@/components/atoms/TitleBar'
import { DiscographyLink } from '@/components/discographyLink'
import { music_id } from '@/constant/music-list'
import { Music } from '@/types/spotify'

type Props = {
  list: typeof music_id
}
export const DiscographyListPage: FC<Props> = ({ list }) => {
  const container = css`
    max-width: 1400px;
    margin: 0 auto;
  `
  return (
    <Box css={container} component='div'>
      <TitleBar>DISCOGRAPHY-{list[0].type.toUpperCase()}</TitleBar>
      <DiscographyLink
        links={[
          { name: 'SINGLE', href: '/discography/single' },
          { name: 'ALBUM', href: '/discography/album' },
          { name: 'RANKING', href: '/discography/ranking' },
        ]}
      />
      <Box
        sx={{
          margin: '60px 0',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '40px',
        }}
        component='div'
      >
        {list.map((music: Music, index: number) =>
          music.type !== 'album' ? (
            <Link href={`/discography/single/${music.id}`} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '10px',
                }}
                component='div'
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
                  component='div'
                >
                  <span>{music.type}</span>
                </Box>
                <p style={{ fontSize: '3.4vw' }}>{music.title}</p>
              </Box>
            </Link>
          ) : (
            <Link href={`/discography/album/${music.id}`} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '10px',
                }}
                component='div'
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
                  component='div'
                >
                  <span>{music.type}</span>
                </Box>
                <p style={{ fontSize: '3.4vw' }}>{music.title}</p>
              </Box>
            </Link>
          ),
        )}
      </Box>
    </Box>
  )
}
