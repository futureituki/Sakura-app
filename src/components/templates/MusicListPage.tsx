import { Container, Box } from '@mui/material'
import { TitleBar } from '../atoms/TitleBar'
import { Music } from '@/components/templates/MusicList'
import { musicList } from '@/constant/music-list'

export const MusicListPage = () => {
  return (
    <Box>
      <TitleBar>Music List</TitleBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
        }}
      >
        {musicList.map((music, index) => (
          <Box key={index}>
            <Music src={music.src} name={music.name} img={music.img} number={music.number} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
