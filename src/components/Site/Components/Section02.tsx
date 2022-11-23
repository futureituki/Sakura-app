import { PrimaryButton } from '@/components/atoms/Button'
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import styles from '@/styles/Site.module.css'
import { useEffect } from 'react'
gsap.registerPlugin(ScrollTrigger)
export const Section02 = () => {
   useEffect(() => {
    setupGsap()
  }, [])
  const setupGsap = () => {
    gsap.to('main', {
      scrollTrigger: {
        trigger: '#overlay-on',
        start: 'top center',
        scrub: true, 
        onEnter: () => gsap.to('.overlay-cover', {
          opacity: 1,
          visibility:"visible",
          duration: 1.4
        }),
        onLeave: () => gsap.to('.overlay-cover', {
          opacity: 0,
          visibility:"hidden",
          duration: 1.4
        }),
        onEnterBack: () => gsap.to('.overlay-cover', {
          opacity: 1,
          visibility:"visible",
          duration: 1.4
        }),
        onLeaveBack: () => gsap.to('.overlay-cover', {
          opacity: 0,
          visibility:"hidden",
          duration: 1.4
        }),
      },
    })
  }
  return (
    <section className={styles.sec_cont} id="overlay-on">
      <div className={`overlay-cover ${styles.overlay}`}></div>

    </section>
  )
}