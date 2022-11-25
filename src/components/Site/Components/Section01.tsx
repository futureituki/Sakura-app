import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect, useRef } from 'react'
import styles from '@/styles/Site.module.css'
import '@/components/Site/Components/section.module.css'

gsap.registerPlugin(ScrollTrigger)
export const Section01 = () => {
  const textRef = useRef<HTMLHeadingElement>(null)
  const tl = gsap.timeline()
  let jsText: HTMLHeadingElement
  useEffect(() => {
    gsap.set('#glitch', { scale: 0 })
    if (textRef.current) {
      jsText = textRef.current
      let newText = ''
      const text = jsText.textContent
      if (text == null) return
      const result = text.split('')
      for (let i = 0; i < result.length; i++) {
        newText += `<span style='opacity:0'>` + result[i] + '</span>'
      }
      jsText.innerHTML = newText
    }
    tl.to(
      '#opening-title span',
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: {
          amount: 1,
          from: 'start',
        },
      },
      1,
    )
      .to(
        '#opening-sub',
        {
          opacity: 1,
          y: -5,
          stagger: {
            amount: 1,
            from: 'start',
          },
        },
        4,
      )
      .to('#glitch', {
        opacity: 0,
        delay: 0.1,
        width: '100vw',
        transformOrigin: '50% 50%',
        duration: 0.4,
      })
      .to(
        '#top_curtain',
        {
          y: -1000,
          opacity: 0,
          stagger: {
            amount: 1,
            from: 'start',
          },
        },
        5,
      )
      .to(
        '#bottom_curtain',
        {
          y: 1000,
          opacity: 0,
          stagger: {
            amount: 1,
            from: 'start',
          },
        },
        5,
      )
    setupGsap()
  }, [])
  const setupGsap = () => {
    gsap.to('main', {
      scrollTrigger: {
        trigger: '#sec_mv',
        start: 'top+=40%',
        end: 'bottom+=8000 top',
        scrub: true,
        onEnter: () =>
          gsap.to('.fadeout', {
            opacity: 0,
            y: -100,
          }),
        onLeave: () =>
          gsap.to('.fadeout', {
            opacity: 1,
            y: 0,
          }),
        onEnterBack: () =>
          gsap.to('.fadeout', {
            opacity: 0,
            y: -100,
          }),
        onLeaveBack: () =>
          gsap.to('.fadeout', {
            opacity: 1,
            y: 0,
          }),
      },
    })
  }
  return (
    <section className={styles.sec_mv} id='sec_mv'>
      <div className={styles.top_loader_bg} id='top_curtain'>
        <span className={`${styles.glitch_red}`} id='glitch'></span>
        <span className={`${styles.glitch_blue}`} id='glitch'></span>
        <span className={`${styles.glitch_green}`} id='glitch'></span>
      </div>
      <div className={styles.bottom_loader_bg} id='bottom_curtain'>
        <span className={`${styles.glitch_red_bottom}`} id='glitch'></span>
        <span className={`${styles.glitch_blue_bottom}`} id='glitch'></span>
        <span className={`${styles.glitch_green_bottom}`} id='glitch'></span>
      </div>
      <div className={styles.mv_bg}>
        <video
          className='mainPath'
          id='bg-video-start'
          loop
          autoPlay
          muted
          src='/main.mp4'
          style={{ opacity: 1 }}
        ></video>
      </div>
      <div className={styles.mv_in}>
        <div className={`fadeout ${styles.mv_case}`}>
          <h1 ref={textRef} id='opening-title'>
            櫻坂46
          </h1>
          <h2 className={styles.tx} style={{ opacity: 0 }} id='opening-sub'>
            櫻坂46を応援する非公式アプリ
          </h2>
        </div>
      </div>
      <div className={styles.button_container}>{/* <PrimaryButton></PrimaryButton> */}</div>
    </section>
  )
}
