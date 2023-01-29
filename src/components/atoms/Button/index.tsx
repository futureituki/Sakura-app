import { Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { colorTheme } from '@/config/color'

type ButtonProps = {
  children: React.ReactNode
  label: string
  color?: string
  background: string
  size?: string
  padding?: string
  variant: 'text' | 'outlined' | 'contained' | undefined
  onClick?: () => void
  disabled?: boolean
}
export type Button = ButtonProps

export const PrimaryButton = ({
  onClick,
  children,
  label,
  color = '#fff',
  size = '1.2vw',
  padding = '.3vw',
  background,
  variant,
  disabled = false,
}: Button) => {
  return (
    <Button
      onClick={onClick}
      type='submit'
      variant={variant}
      style={{ color: color, background: background }}
      aria-label={label}
      disabled={disabled}
      sx={{
        width: 'fit-content',
      }}
    >
      <span style={{ fontSize: size, padding: padding }}>{children}</span>
    </Button>
  )
}
