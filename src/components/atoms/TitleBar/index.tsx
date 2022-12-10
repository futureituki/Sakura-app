import React, { FC } from 'react'
import styles from '@/components/atoms/TitleBar/index.module.css'
type Props = {
  children: React.ReactNode
}

export const TitleBar: FC<Props> = ({ children }) => {
  return (
    <div className={styles.bar}>
      <span className={styles.bar_text}>{children}</span>
    </div>
  )
}
