import { css } from '@emotion/react'
import { Box } from '@mui/material'
import { FC } from 'react'
type Props = {
  background?: string
  color?: string
  className?: string
  onClick: () => void
}
export const ClickPlayButton: FC<Props> = ({
  background = '#000',
  color = '#fff',
  className = '',
  onClick,
}) => {
  const container = css`
    width: fit-content;
    background: ${background};
    display: grid;
    place-items: center;
    color: ${color};
    border-radius: 50%;
    border: 1px solid #fff;
    padding: 20px 10px;
    text-align: center;
  `
  const button = css`
    font-size: 16px;
  `
  const span = css`
    font-size: 24px;
    display: block;
  `
  return (
    <Box css={container}>
      <button onClick={onClick} css={button}>
        CLICK TO <span css={span}>PLAY!</span>
      </button>
    </Box>
  )
}
