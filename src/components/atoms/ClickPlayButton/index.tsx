import { css } from '@emotion/react'
import { Box } from '@mui/material'
import { FC } from 'react'
type Props = {
  onClick: () => void
}
export const ClickPlayButton: FC<Props> = ({ onClick }) => {
  const container = css`
    width: 100%;
    height: 100%;
  `

  const y_playBg = css`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url(/assets/y_playBg.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  `
  const y_playMark = css`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url(/assets/y_play.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  `
  return (
    <Box css={container}>
      <button onClick={onClick}>
        <Box css={y_playBg} />
        <Box css={y_playMark} />
      </button>
    </Box>
  )
}
