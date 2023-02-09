import { css } from '@emotion/react'
import { Box } from '@mui/material'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const CircleProgress = () => {
  const percentage = 66
  const box = css`
    width: 200px;
    height: 200px;
  `
  return (
    <Box css={box} component='div'>
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </Box>
  )
}
