import { Box } from '@mui/material'
import { TitleBar } from '../atoms/TitleBar'
import { Music } from '@/components/templates/MusicList'
import { musicList } from '@/constant/music-list'
import { MusicObj } from '@/types/constant/music'

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
        {musicList.map((music: MusicObj, index: number) => (
          <Box key={index}>
            <Music src={music.src} name={music.name} img={music.img} number={music.release} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
