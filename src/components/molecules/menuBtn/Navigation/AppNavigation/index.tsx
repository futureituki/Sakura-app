// import gsap from 'gsap'
import { FC, useEffect } from 'react'
import styles from '@/components/molecules/menuBtn/Navigation/AppNavigation/index.module.css'

type Props = {
  open: boolean
  id: string
}

export const AppNavigation: FC<Props> = ({ open, id }) => {
  // useEffect(() => {
  //   setupGsap()
  // }, [open])
  // const setupGsap = () => {
  //   if (open === true) {
  //     gsap.to('nav ul li', {
  //       opacity: 1,
  //       y: 0,
  //       stagger: {
  //         amount: 1,
  //         from: 'start',
  //       },
  //     })
  //   } else {
  //     gsap.to('nav ul li', {
  //       opacity: 0,
  //       y: 20,
  //       stagger: {
  //         amount: 1,
  //         from: 'start',
  //       },
  //     })
  //   }
  // }
  return (
    <nav id={id} aria-hidden={!open} className={styles.navigation}>
      <ul>
        <li>Music</li>
        <li>Mypage</li>
        <li>Contact</li>
      </ul>
    </nav>
  )
}
