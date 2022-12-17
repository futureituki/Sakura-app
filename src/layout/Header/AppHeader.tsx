import gsap from 'gsap'
import { useEffect, useState } from 'react'
import { AppMenu } from '@/components/molecules/menuBtn/AppMenu/menu'
import styles from '@/layout/Header/index.module.css'

export const AppHeader = () => {
  useEffect(() => {
    setUpGsap()
  }, [])
  const setUpGsap = () => {
    gsap.to('header', {
      opacity: 1,
      y: 10,
      delay: 5,
    })
  }
  const [open, setOpen] = useState<boolean>(false)
  const toggleHandler = () => {
    setOpen(!open)
  }
  return (
    <header className={styles.app_header}>
      <div className={styles.app_menu}>
        <AppMenu />
      </div>
    </header>
  )
}
