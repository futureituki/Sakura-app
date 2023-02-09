import { Box } from '@mui/material'
import React from 'react'

export const AudioBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        width: '100vw',
        padding: '10px 0',
        height: '100%',
        background: '#000',
      }}
      component='div'
    >
      <Box
        sx={{
          width: '90vw',
          margin: '0 auto',
        }}
        component='div'
      >
        {children}
      </Box>
    </Box>
  )
}
