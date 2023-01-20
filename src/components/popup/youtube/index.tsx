import { Box } from '@mui/material'
import { FC } from 'react'
import YouTube from 'react-youtube'
import { TransitionsPopper } from '@/components/popup/index'
type Props = {
  id: string
}
export const YoutubePopUp: FC<Props> = ({ id }) => {
  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  return (
    <Box>
      <YouTube
        videoId={id}
        opts={opts}
        style={{
          position: 'relative',
          width: '90vw',
          height: '50vw',
          zIndex: 1000,
          margin: '3vw 0',
        }}
      />
    </Box>
  )
}
