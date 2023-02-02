import { css } from '@emotion/react'
import styles from '@/layout/Footer/index.module.css'
export const Footer = () => {
  const footer = css`
    height: 50px;
    background: #000;
    color: #fff;
    padding: 30px 0;
    position: relative;
  `
  return (
    <footer css={footer}>
      <small className={styles.copyright}>copyright 2022-2023 sato-itsuki</small>
    </footer>
  )
}
