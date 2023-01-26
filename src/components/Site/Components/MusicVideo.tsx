import { css, keyframes } from '@emotion/react'
import { Box } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import { useState } from 'react'
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube/dist/YouTube'
import { EffectFade, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { CommentButton } from '@/components/atoms/Button/CommentButton'
import { ClickPlayButton } from '@/components/atoms/ClickPlayButton'
import { Heading } from '@/components/atoms/Heading'
import { Loading } from '@/components/atoms/Loading'
gsap.registerPlugin(ScrollTrigger)

export const MusicVideo = () => {
  const [show, setShow] = useState({
    nobodys_show: false,
    ban_show: false,
    nagaredama_show: false,
    samidareyo_show: false,
    masatu_show: false,
  })
  const [loading, setLoading] = useState(false)
  const bgTL = gsap.timeline()
  const changeYoutube = (name: string) => {
    switch (name) {
      case 'Nobody`s fault':
        const showsVal_1 = {
          masatu_show: false,
          ban_show: false,
          samidareyo_show: false,
          nagaredama_show: false,
        }
        setShow({ ...showsVal_1, nobodys_show: true })
        break
      case 'BAN':
        const showsVal_2 = {
          masatu_show: false,
          nobodys_show: false,
          samidareyo_show: false,
          nagaredama_show: false,
        }
        setShow({ ...showsVal_2, ban_show: true })
        break
      case '流れ弾':
        setShow({ ...show, nagaredama_show: true })
        break
      case '五月雨よ':
        setShow({ ...show, samidareyo_show: true })
        break
      case '摩擦係数':
        setShow({ ...show, masatu_show: true })
        break
      default:
        break
    }
    setLoading(true)
  }
  const play: YouTubeProps['onReady'] = (event: YouTubeEvent) => {
    // access to player in all event handlers via event.target
    event.target.isMuted()
    event.target.playVideo()
    setLoading(false)
  }
  const loaderBg = () => {
    bgTL.to('#bg_animation', {
      x: '100%',
      duration: 1.2,
    })
    bgTL.to('#bg_animation', {
      opacity: 0,
      duration: 1,
      delay: 1,
    })
  }
  const next = () => {
    loaderBg()
    bgTL.seek(0)
  }

  // style //
  const container = css`
    position: relative;
  `
  const box = css`
    position: relative;
    width: 100vw;
    height: 100%;
    margin: 100px auto 0 auto;
    z-index: 40;
  `
  const button_box = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  `
  const music_box = css`
    position: relative;
    width: 70vw;
    margin: 40px auto;
  `
  const img = css`
    width: 100%;
    height: 100%;
  `
  const comment_box = css`
    margin: 20px 0;
  `
  const area = css`
    width: 80vw;
    height: 100%;
    margin: 60px auto;
  `
  const action_buttons = css`
    position: relative;
    height: 100%;
    margin: 10px 0;
    width: 100%;
    display: flex;
    align-items: center;
  `
  const action_button = css`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #fff;
    color: #fff;
    text-align: center;
  `
  const loop = keyframes`
  0% {
    transform: translateX(200%) rotate(15deg);
  }
  to {
    transform: translateX(-100%) rotate(15deg);
  }
  `
  const loop2 = keyframes`
  0% {
    transform: translateX(200%) rotate(15deg);
  }
  to {
    transform: translateX(-200%) rotate(15deg);
  }
  `
  const animation_text = css`
  width:fit-content;
  height:fit-content;
  transform:rotate(15deg);
  color:#fff;
  font-size:7vw;
  letter-spacing:3px;
  animation:${loop} 8s 100s linear infinite;
  }
  `
  const animation_text2 = css`
    width: fit-content;
    height: fit-content;
    transform: rotate(15deg);
    color: #fff;
    font-size: 7vw;
    letter-spacing: 3px;
    animation: ${loop2} 8s linear infinite;
  `
  const animation_text_container = css`
    position: absolute;
    top: 15%;
    display: flex;
    width: 100vw;
    height: 100%;
    overflow: hidden;
  `
  const action_box = css`
    display: flex;
    align-items: center;
  `
  const bg_caten = css`
    position: absolute;
    opacity: 1;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 100;
    display: grid;
    place-items: center;
    pointer-events: none;
  `

  return (
    <Box css={box}>
      <Heading style={{ color: '#fff' }}>Music Video</Heading>
      <Swiper
        loop={true}
        spaceBetween={50}
        navigation={{
          prevEl: '#button_prev',
          nextEl: '#button_next',
        }}
        slidesPerView={1}
        speed={3000}
        modules={[EffectFade, Navigation, Pagination]}
      >
        <SwiperSlide>
          <Box css={container}>
            <Box css={animation_text_container}>
              <Box css={animation_text}>Nobody`s fault</Box>
              <Box css={animation_text2}>Nobody`s fault</Box>
            </Box>
            <Box css={area}>
              <Box
                css={music_box}
                sx={{
                  height: '50vw',
                  '& > img': {
                    width: '100%',
                    height: '100%',
                  },
                }}
              >
                <Box css={button_box}>
                  {loading ? <Loading /> : <></>}
                  {show.nobodys_show ? (
                    <></>
                  ) : (
                    <ClickPlayButton onClick={() => changeYoutube('Nobody`s fault')} />
                  )}
                </Box>
                {show.nobodys_show ? (
                  <YouTube
                    videoId='fagRTasDcKo'
                    style={{
                      height: '100%',
                      width: '100%',
                      position: 'relative',
                      zIndex: 100,
                    }}
                    onReady={play}
                    // onPlay={play}
                  />
                ) : (
                  <Image
                    src='/assets/photo/discography_1th_main.jpeg'
                    alt=''
                    width={300}
                    height={300}
                  />
                )}
              </Box>
              <Box css={action_box}>
                <Box css={action_buttons}>
                  <Box component='button' css={action_button} id='button_prev'>
                    <span>prev</span>
                  </Box>
                  <Box component='button' css={action_button} onClick={next} id='button_next'>
                    <span>next</span>
                  </Box>
                </Box>
                <Box css={comment_box}>
                  <CommentButton onClick={() => console.log('push')} />
                </Box>
              </Box>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box css={container}>
            <Box css={animation_text_container}>
              <Box css={animation_text}>BAN</Box>
              <Box css={animation_text2}>BAN</Box>
            </Box>
            <Box css={area}>
              <Box
                css={music_box}
                sx={{
                  height: '50vw',
                  '& > img': {
                    width: '100%',
                    height: '100%',
                  },
                }}
              >
                <Box css={button_box}>
                  {loading ? <Loading /> : <></>}
                  {show.ban_show ? <></> : <ClickPlayButton onClick={() => changeYoutube('BAN')} />}
                </Box>
                {show.ban_show ? (
                  <YouTube
                    videoId='fPZ37t3nvco'
                    style={{
                      height: '100%',
                      width: '100%',
                      position: 'relative',
                      zIndex: 100,
                    }}
                    onReady={play}
                    // onPlay={play}
                  />
                ) : (
                  <Image
                    src='/assets/photo/discography_2th_main.jpeg'
                    alt=''
                    width={300}
                    height={300}
                  />
                )}
              </Box>
              <Box css={action_box}>
                <Box css={action_buttons}>
                  <Box component='button' css={action_button} id='button_prev'>
                    <span>prev</span>
                  </Box>
                  <Box component='button' css={action_button} onClick={next} id='button_next'>
                    <span>next</span>
                  </Box>
                </Box>
                <Box css={comment_box}>
                  <CommentButton onClick={() => console.log('push')} />
                </Box>
              </Box>
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
      <Box css={bg_caten} id='bg_animation'></Box>
    </Box>
  )
}
