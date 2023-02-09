import { css } from '@emotion/react'
import { Box } from '@mui/material'
import { CircleProgress } from '@/components/atoms/Loading/progress/circle'
export const LoadingContainer = () => {
  const container = css`
    position: relative;
    width: 100vw;
    height: 100vh;
    background: #fff;
  `
  const box = css`
    position: fixed;
    top: 0%;
    left: 0%;
  `
  return (
    <Box component='div' css={container}>
      <Box component='div' css={box}>
        <CircleProgress />
      </Box>
    </Box>
  )
}
