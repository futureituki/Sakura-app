import Box from '@mui/material/Box'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress' // eslint-disable-line
import Typography from '@mui/material/Typography'
import * as React from 'react'

export const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
  return (
    <Box
      sx={{ position: 'relative', display: 'inline-flex', top: '50%', left: '50%' }}
      component='div'
    >
      <CircularProgress variant='determinate' {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        component='div'
      >
        <Typography variant='caption' component='div' color='text.secondary'>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  )
}
