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
  onClick?: () => void
  disabled?: boolean
}
export type Button = ButtonProps

export const PrimaryButton = ({
  onClick,
  children,
  label,
  color,
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
      <span style={{ fontSize: '2.4vw', padding: '1vw 1.6vw' }}>{children}</span>
    </Button>
  )
}
