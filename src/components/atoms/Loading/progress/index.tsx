import { css } from '@emotion/react'
import { Box, CircularProgress } from '@mui/material'

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
    <Box css={circular_container} component='div'>
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
