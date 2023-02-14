import { css, keyframes } from '@emotion/react'
import { Box } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { CircularProgressWithLabel } from '@/components/atoms/Loading/progress/circle'
import styles from '@/styles/Site.module.css'
gsap.registerPlugin(ScrollTrigger)
export const Section01 = () => {
  const [progress, setProgress] = useState<number>(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10))
    }, 300)
    return () => {
      clearInterval(timer)
    }
  }, [])

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
    tl.to('body', {
      overflow: 'hidden',
    })
      .to('#bg-sand', {
        top: '100%',
        delay: 4,
      })
      .to('#bg-sand', {
        opacity: 0,
      })
      .to('body', {
        overflow: 'auto',
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
    position: fixed;
    top: 0%;
    left: 0%;
    background-image: url('/assets/sand_w.png');
    background-size: cover;
    overflow: hidden;
  `
  const transanimation = keyframes`
  0% {
    transform:translateX(-460%);
  }
  100% {
    transform:translateX(500%);
  }
  `
  const video_area = css`
    position: fixed;
    z-index: 0;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.3;
      z-index: 1;
    }
  `
  const video = css`
    position: absolute;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 177.77777778vh;
    height: 56.25vw;
    min-height: 100%;
    min-width: 100%;
  `
  const login_button = css`
    border-radius: 0.2em;
    border: 1px solid #fff;
    padding: 5px 10px;
    background: #6ed688;
  `
  const register_button = css`
    border-radius: 0.2em;
    border: 1px solid #fff;
    padding: 5px 10px;
    background: orange;
  `
  // animation:10s infinite ${transanimation};
  return (
    <Box css={container} component='div'>
      <Box css={video_area} component='div'>
        <video
          id='video'
          css={video}
          poster='https://coco-factory.jp/ugokuweb/wp-content/themes/ugokuweb/data/6-3-1/img/movie.jpg'
          webkit-playsinline
          muted
          autoPlay
          loop
        >
          <source src='/home.mp4' type='video/mp4' />
        </video>
      </Box>
      <section className={styles.sec_mv} id='sec_mv'>
        <div className={styles.mv_in}>
          <div className={`fadeout ${styles.mv_case}`}>
            <h1 ref={textRef} id='opening-title'>
              櫻坂46
            </h1>
            <div className={styles.button_area} id='button_area'>
              <Link href='/login' css={login_button}>
                ログイン
              </Link>
              <Link href='/login' css={register_button}>
                会員登録
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.button_container}>{/* <PrimaryButton></PrimaryButton> */}</div>
      </section>
      <Box css={bg_sand} id='bg-sand' component='div'>
        <CircularProgressWithLabel value={progress} />
      </Box>
    </Box>
  )
}
