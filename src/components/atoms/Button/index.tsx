import { Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { colorTheme } from '@/config/color'

type ButtonProps = {
  children: React.ReactNode
  label: string
  color: string
  background: string
  variant: 'text' | 'outlined' | 'contained' | undefined
  onClick:() => void
}
export type Button = ButtonProps

export const PrimaryButton = ({onClick, children, label, color, background, variant }: Button) => {
  return (
    <Button onClick={onClick} variant={variant} style={{ color: color, background: background }} aria-label={label}>
      {children}
    </Button>
  )
}
