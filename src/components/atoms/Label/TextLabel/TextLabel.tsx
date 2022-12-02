import { Box } from '@mui/material'
import React, { FC } from 'react'
import styles from '@/components/atoms/Label/TextLabel/index.module.css'

type Props = {
  children: React.ReactNode
  color: string
}
export const TextLabel: FC<Props> = ({ children, color }) => {
  return (
    <div className={styles.label_box} style={{ background: color }}>
      <span className={styles.label_text}>{children}</span>
    </div>
  )
}
