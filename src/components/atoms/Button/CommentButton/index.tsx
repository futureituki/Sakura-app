import { css } from '@emotion/react'
import CommentIcon from '@mui/icons-material/Comment'
import { Box } from '@mui/material'
import { FC } from 'react'
type Props = {
  background?: string
  color?: string
  className?: string
  onClick: () => void
}
export const CommentButton: FC<Props> = ({
  background = '#000',
  color = '#fff',
  className = '',
  onClick,
}) => {
  const button = css`
    display: block;
    width: fit-content;
    background: ${background};
    color: ${color};
    display: grid;
    place-items: center;
    border: 3px solid #fff;
    padding: 10px;
    border-radius: 50%;
    position: relative;
    margin: 0 0 0 auto;
  `
  const icon = css`
    font-size: 4vw;
    text-align: center;
    color: #fff;
  `
  return (
    <Box component='button' css={button} onClick={onClick}>
      <CommentIcon css={icon} />
    </Box>
  )
}
