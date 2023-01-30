import { Box, CircularProgress } from '@mui/material'
import { css } from '@emotion/react'

export const LargeProgress = () => {
  const circular = css`
    width: 70px;
    height: 70px;
  `
  const circular_container = css`
    width: 100%;
    display: grid;
    place-items: center;
  `
  return (
    <Box css={circular_container}>
      <CircularProgress css={circular} />
    </Box>
  )
}
export const SmallProgress = () => {
  const style = css`
    width: 20px;
    height: 20px;
  `
  return <CircularProgress css={style} />
}
