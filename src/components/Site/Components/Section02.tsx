import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect } from 'react'
import styles from '@/styles/Site.module.css'
gsap.registerPlugin(ScrollTrigger)
export const Section02 = () => {
  useEffect(() => {
    setupGsap()
  }, [])
  const setupGsap = () => {
    gsap.to('#overlay-on', {
      scrollTrigger: {
        trigger: '#sec_mv',
        start: 'top+=40%',
        end: 'bottom+=20000',
        scrub: true,
        onEnter: () =>
          gsap.to('.overlay-cover', {
            opacity: 1,
            visibility: 'visible',
            duration: 0.6,
          }),
        onLeave: () =>
          gsap.to('.overlay-cover', {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.6,
          }),
        onEnterBack: () =>
          gsap.to('.overlay-cover', {
            opacity: 1,
            visibility: 'visible',
            duration: 0.6,
          }),
        onLeaveBack: () =>
          gsap.to('.overlay-cover', {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.6,
          }),
      },
    })
  }
  return (
    <section className={styles.sec_rea} id='overlay-on'>
      <div className={`overlay-cover ${styles.overlay}`}></div>
      <div className={styles.rea_in}>
        <div className={styles.rea_case}>
          <p className={styles.read_tx}>制作理由</p>
          <p className={styles.tx} id='tx_on'>
            櫻坂46というグループをもっと色々な人に
            <br />
            知ってもらいたかったからです。
          </p>
          <p className={styles.tx} id='tx_on'>
            このパフォーマンス力と表現力
          </p>
        </div>
      </div>
    </section>
  )
}
