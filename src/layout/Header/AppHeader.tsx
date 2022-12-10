import gsap from 'gsap'
import { useEffect, useState } from 'react'
import { Hamburger } from '@/components/molecules/menuBtn/Hamburger'
import { AppNavigation } from '@/components/molecules/menuBtn/Navigation/AppNavigation'
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
      <Hamburger color='#000' open={open} label='メニューボタン' onClick={toggleHandler} />
      <AppNavigation open={open} id='navigation' />
    </header>
  )
}
