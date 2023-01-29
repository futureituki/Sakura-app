import MusicNoteIcon from '@mui/icons-material/MusicNote'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import { Box, css } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import { GeneralModal } from '@/components/modal/generalModal'
import { YoutubePopUp } from '@/components/popup/youtube'
import styles from '@/styles/Site.module.css'

gsap.registerPlugin(ScrollTrigger)
export const Section02 = () => {
  const [open, setOpen] = useState<boolean>(false)
  useEffect(() => {
    setupGsap()
  }, [])
  const handleOpen = () => {
    setOpen(!open)
  }
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
  const img = css`
    width: 25vw;
    height: 100%;
    max-width: 400px;
  `
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
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <Image
                src='/assets/live-1.jpeg'
                alt=''
                width={300}
                height={300}
                css={img}
                unoptimized
              />
              <Image
                src='/assets/live-2.jpeg'
                alt=''
                width={300}
                height={300}
                css={img}
                unoptimized
              />
              <Image
                src='/assets/live-3.jpeg'
                alt=''
                width={300}
                height={300}
                css={img}
                unoptimized
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
                margin: '20px 0',
                borderTop: '2px solid #fff',
                borderBottom: '2px solid #fff',
                padding: '20px 0',
              }}
            >
              <GeneralModal open={open} handleClose={handleOpen}>
                <YoutubePopUp id={'uxC0v1902dE'} />
              </GeneralModal>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '90vw',
                  maxWidth: '1300px',
                }}
              >
                <Box>
                  <MusicNoteIcon />
                  <span style={{ fontSize: '2.6vw' }}>条件反射で泣けてくる</span>
                </Box>
                <Box
                  onClick={handleOpen}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    zIndex: open ? 0 : 99999,
                    position: 'relative',
                  }}
                >
                  <PlayCircleFilledWhiteIcon
                    sx={{
                      fontSize: '10vw',
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  margin: '40px 0',
                }}
              >
                <img
                  src={'/assets/slider/slider1.jpeg'}
                  width={500}
                  height={400}
                  alt=''
                  style={{ width: '80vw', height: '100%', maxWidth: '1200px' }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                }}
              ></Box>
            </Box>
          </Box>
        </div>
      </div>
    </section>
  )
}
