import { Box } from '@mui/material'
import { FC } from 'react'
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube/dist/YouTube'

type Props = {
  id: string
}
export const YoutubePopUp: FC<Props> = ({ id }) => {
  const onPlayerReady: YouTubeProps['onReady'] = (event: YouTubeEvent) => {
    // access to player in all event handlers via event.target
    event.target.isMuted()
    event.target.playVideo()
  }

  return (
    <Box
      sx={{
        position: 'relative',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        maxWidth: '960px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: '0',
          width: '100%',
          position: 'relative',
          paddingBottom: '56.25%',
          overflow: 'hidden',
        }}
      >
        <YouTube
          videoId={id}
          style={{
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            zIndex: 1000,
          }}
          onReady={onPlayerReady}
        />
      </Box>
    </Box>
  )
}
