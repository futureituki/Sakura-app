import { Box } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import { useEffect } from 'react'
import { SectionImg } from '@/components/Site/Components/Section-Img'
import { Heading } from '@/components/atoms/Heading'
import { photoSrc } from '@/constant/photoSrc'
import styles from '@/styles/Site.module.css'

gsap.registerPlugin(ScrollTrigger)
export const Section05 = () => {
  useEffect(() => {
    setupGsap()
  }, [])
  const setupGsap = () => {
    gsap.to('#BAN-title', {
      scrollTrigger: {
        trigger: '#triggerBAN',
        start: 'top-=40%',
        scrub: true,
        onEnter: () =>
          gsap.to('#BAN-title', {
            opacity: 1,
          }),
        onLeave: () =>
          gsap.to('#BAN-title', {
            opacity: 0,
          }),
        onEnterBack: () =>
          gsap.to('#BAN-title', {
            opacity: 1,
          }),
        onLeaveBack: () =>
          gsap.to('#BAN-title', {
            opacity: 0,
          }),
      },
    })
    gsap.to('#nagaredama-title', {
      scrollTrigger: {
        trigger: '#triggernagaredama',
        start: 'top-=40%',
        scrub: true,
        onEnter: () =>
          gsap.to('#nagaredama-title', {
            opacity: 1,
          }),
        onLeave: () =>
          gsap.to('#nagaredama-title', {
            opacity: 0,
          }),
        onEnterBack: () =>
          gsap.to('#nagaredama-title', {
            opacity: 1,
          }),
        onLeaveBack: () =>
          gsap.to('#nagaredama-title', {
            opacity: 0,
          }),
      },
    })
    gsap.to('#samidareyo-title', {
      scrollTrigger: {
        trigger: '#triggersamidareyo',
        start: 'top-=40%',
        scrub: true,
        onEnter: () =>
          gsap.to('#samidareyo-title', {
            opacity: 1,
          }),
        onLeave: () =>
          gsap.to('#samidareyo-title', {
            opacity: 0,
          }),
        onEnterBack: () =>
          gsap.to('#samidareyo-title', {
            opacity: 1,
          }),
        onLeaveBack: () =>
          gsap.to('#samidareyo-title', {
            opacity: 0,
          }),
      },
    })
    gsap.to('#nobodysfault-title', {
      scrollTrigger: {
        trigger: '#triggernobodysfault',
        start: 'top-=40%',
        scrub: true,
        onEnter: () =>
          gsap.to('#nobodysfault-title', {
            opacity: 1,
          }),
        onLeave: () =>
          gsap.to('#nobodysfault-title', {
            opacity: 0,
          }),
        onEnterBack: () =>
          gsap.to('#nobodysfault-title', {
            opacity: 1,
          }),
        onLeaveBack: () =>
          gsap.to('#nobodysfault-title', {
            opacity: 0,
          }),
      },
    })
    gsap.to('#masatu-title', {
      scrollTrigger: {
        trigger: '#triggermasatu',
        start: 'top-=40%',
        scrub: true,
        onEnter: () =>
          gsap.to('#masatu-title', {
            opacity: 1,
          }),
        onLeave: () =>
          gsap.to('#masatu-title', {
            opacity: 0,
          }),
        onEnterBack: () =>
          gsap.to('#masatu-title', {
            opacity: 1,
          }),
        onLeaveBack: () =>
          gsap.to('#masatu-title', {
            opacity: 0,
          }),
      },
    })
  }
  return (
    <section className={styles.sec_photo}>
      <Heading level={2} visualLevel={1}>
        Photo
      </Heading>
      {photoSrc.map((photo, index) => (
        <Box
          key={index}
          id={photo.viewTitle !== '' ? `trigger${photo.viewTitle}` : ''}
          sx={{
            width: '80vw',
            margin: '40px 0',
            position: 'relative',
            '@media screen and (min-width:900px)': {
              width: '70vw',
            },
          }}
        >
          <Image
            src={photo.src}
            alt=''
            width={300}
            height={250}
            style={{ width: '100%', height: '100%', margin: '0 auto' }}
          />
          {photo.viewTitle !== '' ? (
            <span
              id={`${photo.viewTitle}-title`}
              style={{
                color: '#fff',
                opacity: 0,
                position: 'absolute',
                letterSpacing: '2px',
                writingMode: 'vertical-lr',
                margin: '0 10px',
                fontSize: '4vw',
                width: '100%',
              }}
            >
              {photo.name}
            </span>
          ) : (
            ''
          )}
        </Box>
      ))}
    </section>
  )
}
