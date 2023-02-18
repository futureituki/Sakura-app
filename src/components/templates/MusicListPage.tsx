import { css } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { TitleBar } from '../atoms/TitleBar'
import { PrimaryButton } from '@/components/atoms/Button'
import { Music } from '@/components/templates/Music'
import { musicList } from '@/constant/music-list'
import { MusicObj } from '@/types/constant/music'
export const MusicListPage = () => {
  const router = useRouter()
  const spotify_button = async () => {
    await axios.post('/api/auth/authorize')
    router.push('/discography')
  }
  const dic_button = css``
  const dic_text = css`
    text-align: center;
    margin: 20px 0;
  `
  return (
    <Box component='div'>
      <TitleBar>Music List</TitleBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
        }}
        component='div'
      >
        {musicList.map((music: MusicObj, index: number) => (
          <Box
            key={index}
            sx={{
              maxWidth: '1400px',
            }}
            component='div'
          >
            <Music
              src={music.src}
              name={music.name}
              img={music.img}
              number={music.release}
              time={music.time}
            />
          </Box>
        ))}
        <Box css={dic_button} component='div'>
          <Typography css={dic_text}>さらに詳しく！</Typography>
          <PrimaryButton
            variant='contained'
            label='login'
            color='#fff'
            background='#1BD760'
            onClick={spotify_button}
          >
            DISCOGRAPHY
          </PrimaryButton>
        </Box>
      </Box>
    </Box>
  )
}
