import { Box } from '@mui/material'
import gsap from 'gsap'
import Image from 'next/image'
import { createRef, RefObject, useEffect, useRef, useState } from 'react'
import { Heading } from '@/components/atoms/Heading'
import { MusicAudio } from '@/components/templates/Music'
import { musicThumbnailList, music_id } from '@/constant/music-list'

export const Section04Sounds = () => {
  const [readyState, setReadyState] = useState('')
  const [audioCtx, setAudioCtx] = useState<HTMLAudioElement>()
  const fruitRefs = useRef<RefObject<HTMLInputElement>[]>([])
  music_id.forEach((_, index: number) => {
    fruitRefs.current[index] = createRef<HTMLInputElement>()
  })
  useEffect(() => {
    setupGsap()
  }, [])
  const setupGsap = () => {}
  const gsapClick = (e: any) => {
    const src = e.target.src
    const targetSrc = src.slice(src.indexOf('thum_') + 5, src.indexOf('.jpeg'))
    if (targetSrc === 'nobodysfault') {
      const ref1 = fruitRefs.current[4]
      const ref2 = fruitRefs.current[3]
      if (fruitRefs.current[0].current) {
        gsap.to('#box4', {
          zIndex: 9,
          onUpdate: function () {
            if (ref1.current) {
              var p = ref1.current.style.transform
              ref1.current.style.transform = 'translate3d(0, -15%, 0) scale(0.9) rotate(18deg)'
            }
            gsap.to('#text0', {
              opacity: 0,
            })
            gsap.to('#text1', {
              opacity: 0,
            })
            gsap.to('#text2', {
              opacity: 0,
            })
            gsap.to('#text4', {
              opacity: 0,
            })
            gsap.to('#text3', {
              opacity: 1,
            })
            gsap.to('#box3', {
              zIndex: 16,
              onUpdate: function () {
                if (ref2.current) {
                  ref2.current.style.transform = 'translate3d(0, 0%, 0) scale(0.9) rotate(-13deg)'
                }
              },
            })
          },
        })
      }
    }
    if (targetSrc === 'ban') {
      const ref1 = fruitRefs.current[3]
      const ref2 = fruitRefs.current[2]
      if (fruitRefs.current[0].current) {
        gsap.to('#box3', {
          zIndex: 9,
          onUpdate: function () {
            if (ref1.current) {
              var p = ref1.current.style.transform
              ref1.current.style.transform = 'translate3d(0, -15%, 0) scale(0.9) rotate(-21deg)'
            }
            gsap.to('#text3', {
              opacity: 0,
            })
            gsap.to('#text4', {
              opacity: 0,
            })
            gsap.to('#text0', {
              opacity: 0,
            })
            gsap.to('#text1', {
              opacity: 0,
            })
            gsap.to('#box2', {
              zIndex: 16,
              onUpdate: function () {
                if (ref2.current) {
                  ref2.current.style.transform = 'translate3d(0, 0%, 0) scale(0.9) rotate(-12deg)'
                }
              },
            })
            gsap.to('#text2', {
              opacity: 1,
            })
          },
        })
      }
    }
    if (targetSrc === 'nagaredama') {
      const ref1 = fruitRefs.current[2]
      const ref2 = fruitRefs.current[1]
      if (fruitRefs.current[0].current) {
        gsap.to('#box2', {
          zIndex: 9,
          onUpdate: function () {
            if (ref1.current) {
              var p = ref1.current.style.transform
              ref1.current.style.transform = 'translate3d(0, -15%, 0) scale(0.9) rotate(16deg)'
            }
            gsap.to('#text0', {
              opacity: 0,
            })
            gsap.to('#text2', {
              opacity: 0,
            })
            gsap.to('#text3', {
              opacity: 0,
            })
            gsap.to('#text4', {
              opacity: 0,
            })
            gsap.to('#box1', {
              zIndex: 16,
              onUpdate: function () {
                if (ref2.current) {
                  ref2.current.style.transform = 'translate3d(0, 0%, 0) scale(0.9) rotate(-23deg)'
                }
              },
            })
            gsap.to('#text1', {
              opacity: 1,
            })
          },
        })
      }
    }
    if (targetSrc === 'samidareyo') {
      const ref1 = fruitRefs.current[1]
      const ref2 = fruitRefs.current[0]
      if (fruitRefs.current[0].current) {
        gsap.to('#box1', {
          zIndex: 9,
          onUpdate: function () {
            if (ref1.current) {
              var p = ref1.current.style.transform
              ref1.current.style.transform = 'translate3d(0, -15%, 0) scale(0.9) rotate(-12deg)'
            }
            gsap.to('#text1', {
              opacity: 0,
            })
            gsap.to('#text2', {
              opacity: 0,
            })
            gsap.to('#text3', {
              opacity: 0,
            })
            gsap.to('#text4', {
              opacity: 0,
            })
            gsap.to('#box0', {
              zIndex: 16,
              onUpdate: function () {
                if (ref2.current) {
                  ref2.current.style.transform = 'translate3d(0, 0%, 0) scale(0.9) rotate(-18deg)'
                }
              },
            })
            gsap.to('#text0', {
              opacity: 1,
            })
          },
        })
      }
    }
    if (targetSrc === 'asyouknow') {
      const ref1 = fruitRefs.current[0]
      const ref2 = fruitRefs.current[4]
      if (fruitRefs.current[0].current) {
        gsap.to('#box0', {
          zIndex: 9,
          onUpdate: function () {
            if (ref1.current) {
              var p = ref1.current.style.transform
              ref1.current.style.transform = 'translate3d(0, -15%, 0) scale(0.9) rotate(7deg)'
            }
            gsap.to('#text0', {
              opacity: 0,
            })
            gsap.to('#text1', {
              opacity: 0,
            })
            gsap.to('#text2', {
              opacity: 0,
            })
            gsap.to('#text3', {
              opacity: 0,
            })
            gsap.to('#box4', {
              zIndex: 11,
              onUpdate: function () {
                if (ref2.current) {
                  ref2.current.style.transform = 'translate3d(0, 0%, 0) scale(0.9) rotate(-15deg)'
                }
              },
            })
            gsap.to('#text4', {
              opacity: 1,
            })
          },
        })
      }
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 1000,
        width: '90vw',
        margin: '0 auto',
        height: '90vh',
        maxWidth: '1400px',
        '@media screen and (min-width:900px)': {
          height: '50vh',
        },
      }}
      component='div'
    >
      <Box
        sx={{
          padding: '0px 0 70px 0',
        }}
        component='div'
      >
        <Heading style={{ fontSize: '5vw' }}>Sounds</Heading>
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '80vw',
          height: '80vh',
          margin: '0 auto',
          maxWidth: '1440px',
          '@media screen and (min-width:900px)': {
            height: '40vh',
          },
        }}
        component='div'
      >
        {musicThumbnailList.map((music, index: number) => (
          <Box
            key={index}
            sx={{
              width: '80vw',
              margin: '0 auto',
            }}
            component='div'
          >
            <Box
              ref={fruitRefs.current[index]}
              id={`box${index}`}
              style={{
                position: 'absolute',
                transform:
                  index % 2 === 0
                    ? `translate3d(0, -10%, 0) scale(0.9) rotate(-${index * 2}deg)`
                    : `translate3d(0, -10%, 0) scale(0.9) rotate(${index * 2}deg)`,
                transition: 'all 1s ease',
                zIndex: index !== 4 ? 9 : 10,
              }}
              onClick={(e) => gsapClick(e)}
              component='div'
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                }}
                component='div'
              >
                <MusicAudio src={music.music_src} />
              </Box>
              <Image src={`${music.img_src}`} alt='' width={300} height={300} unoptimized />
            </Box>
            <Box
              id={`text${index}`}
              sx={{
                position: 'absolute',
                opacity: index === 4 ? 1 : 0,
                color: '#fff',
                zIndex: 10,
                bottom: '40%',
                fontSize: '3.4vw',
                textAlign: 'left',
                '@media screen and (min-width:900px)': {
                  right: '15%',
                  top: '10%',
                },
              }}
              component='div'
            >
              <p>{music.title}</p>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
