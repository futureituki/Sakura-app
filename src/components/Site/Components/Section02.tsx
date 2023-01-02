import MusicNoteIcon from '@mui/icons-material/MusicNote'
import { Box } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import { useEffect } from 'react'
import Youtube from 'react-youtube'
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
            一曲一曲に命を懸けるかのような、迫力
            <br />
            そして心を奪われるパフォーマンス
          </p>
          <Box
            sx={{
              margin: '20px 0',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
              }}
            >
              <Image
                src='/assets/live-1.jpeg'
                alt=''
                width={300}
                height={300}
                style={{ width: '30vw', height: '100%' }}
              />
              <Image
                src='/assets/live-2.jpeg'
                alt=''
                width={300}
                height={300}
                style={{ width: '30vw', height: '100%' }}
              />
              <Image
                src='/assets/live-3.jpeg'
                alt=''
                width={300}
                height={300}
                style={{ width: '30vw', height: '100%' }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              margin: '4vw 0',
            }}
          >
            <h3 style={{ fontSize: '2vw' }}>
              興味が湧いてもらえたら、下のライブ映像を見てほしい
              <br />
              僕は、アイドルという常識が覆りました。
            </h3>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Youtube
                videoId='uxC0v1902dE'
                style={{
                  position: 'relative',
                  width: '90vw',
                  height: '50vw',
                  zIndex: 1000,
                  margin: '3vw 0',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                }}
              >
                <MusicNoteIcon />
                <span style={{ fontSize: '2.6vw' }}>条件反射で泣けてくる</span>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </section>
  )
}
