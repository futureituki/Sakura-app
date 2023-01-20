import { Box } from '@mui/material'
import { FC } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { TransitionsPopper } from '@/components/popup/index'
type Props = {
  id: string
}
export const YoutubePopUp: FC<Props> = ({ id }) => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    console.log(event)
    event.target.playVideo()
  }

  return (
    <Box>
      <YouTube
        videoId={id}
        style={{
          position: 'relative',
          width: '90vw',
          height: '50vw',
          zIndex: 1000,
          margin: '3vw 0',
        }}
        onReady={onPlayerReady}
      />
    </Box>
  )
}
