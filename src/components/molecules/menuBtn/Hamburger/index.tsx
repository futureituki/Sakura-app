import { FC, MouseEventHandler } from "react"
import styles from '@/components/molecules/menuBtn/Hamburger/index.module.css'
type HamburgerProps = {
  open:boolean,
  label:string,
  onClick:MouseEventHandler
}
export const Hamburger:FC<HamburgerProps> = ({open,label,onClick}) => {
  return (
    <button
    aria-expanded={open}
    aria-label={label}
    onClick={onClick}
    className={styles.toggleButton}
  >
    <div className={styles.hamburgerBox}>
      <span className={styles.line1}></span>
      <span className={styles.line2}></span>
      <span className={styles.line3}></span>
    </div>
  </button>
  )
}