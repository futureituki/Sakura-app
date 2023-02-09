import { Box } from '@mui/material'
import { TitleBar } from '../atoms/TitleBar'
import { Music } from '@/components/templates/Music'
import { musicList } from '@/constant/music-list'
import { MusicObj } from '@/types/constant/music'

export const MusicListPage = () => {
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
      </Box>
    </Box>
  )
}
