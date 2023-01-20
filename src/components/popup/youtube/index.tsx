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
        width: '100%',
      }}
    >
      <Box
        sx={{
          height: '0',
          width: '100vw',
          position: 'relative',
          paddingBottom: '56.25%',
          overflow: 'hidden',
          '@media screen and (min-width:800px)': {
            width: '800px',
            margin: '0 auto',
          },
        }}
      >
        <YouTube
          videoId={id}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: 1000,
          }}
          onReady={onPlayerReady}
        />
      </Box>
    </Box>
  )
}
