import { css } from '@emotion/react'
import { Box } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import styles from '@/styles/Site.module.css'
import '@/components/Site/Components/section.module.css'
gsap.registerPlugin(ScrollTrigger)
export const Section01 = () => {
  const textRef = useRef<HTMLHeadingElement>(null)
  const router = useRouter()
  const tl = gsap.timeline()

  let jsText: HTMLHeadingElement
  useEffect(() => {
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
    tl.to('#bg-sand', {
      top: '100%',
    })
      .to('#bg-sand', {
        opacity: 0,
      })
      .to(
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
      .to('#button_area', {
        opacity: 1,
        y: -5,
      })
      .to('#glitch', {
        opacity: 1,
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
      .to('body', {
        overflow: 'scroll',
      })
    setupGsap()
  }, [])
  const setupGsap = () => {
    gsap.to('main', {
      scrollTrigger: {
        trigger: '#sec_mv',
        start: 'top+=40%',
        end: 'bottom+=20000 top',
        scrub: true,
        onEnter: () =>
          gsap.to('.fadeout', {
            opacity: 0,
            y: -100,
            position: 'relative',
            zIndex: -999,
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
            position: 'relative',
            zIndex: -999,
          }),
        onLeaveBack: () =>
          gsap.to('.fadeout', {
            opacity: 1,
            y: 0,
          }),
      },
    })
  }
  const container = css`
    overflow: hidden;
  `
  const bg_sand = css`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
    background-image: url('/assets/sand_w.png');
    background-size: cover;
  `
  return (
    <Box css={container}>
      <section className={styles.sec_mv} id='sec_mv'>
        <div className={styles.mv_in}>
          <div className={`fadeout ${styles.mv_case}`}>
            <h1 ref={textRef} id='opening-title'>
              櫻坂46
            </h1>
            <h2 className={styles.tx} style={{ opacity: 0 }} id='opening-sub'>
              櫻坂46を応援する非公式アプリ
            </h2>
            <div className={styles.button_area} id='button_area'>
              <Link href='/login'>ログイン</Link>
              <Link href='/login'>会員登録</Link>
            </div>
          </div>
        </div>
        <div className={styles.button_container}>{/* <PrimaryButton></PrimaryButton> */}</div>
      </section>
      <Box css={bg_sand} id='bg-sand'></Box>
    </Box>
  )
}
