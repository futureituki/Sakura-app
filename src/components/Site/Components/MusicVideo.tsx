import { css, keyframes } from '@emotion/react'
import { Box, Button, Typography } from '@mui/material'
import axios from 'axios'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube/dist/YouTube'
import { CommentButton } from '@/components/atoms/Button/CommentButton'
import { ClickPlayButton } from '@/components/atoms/ClickPlayButton'
import { Heading } from '@/components/atoms/Heading'
import { Loading } from '@/components/atoms/Loading'
import { video_disc } from '@/constant/music-list'
import { youtubeEndPoint } from '@/constant/url'
import { Youtube, YoutubeComment } from '@/types/youtube'
gsap.registerPlugin(ScrollTrigger)

export const MusicVideo = () => {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [video, setVideo] = useState<Youtube>()
  const [comments, setComment] = useState<YoutubeComment[]>([])
  const [active, setActive] = useState<boolean>(false)
  const [indexVideo, setIndexVideo] = useState<Youtube>()
  const [selectShow, setSelectShow] = useState<boolean>(false)
  const bgTL = gsap.timeline()
  useEffect(() => {
    const getYoutube = async () => {
      const result = await axios
        .get(
          `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=contentDetails,snippet&playlistId=PL0eK3gfF1BbM6tiu8UThzL9nYNowS8LL2&maxResults=1`,
          {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          },
        )
        .then((data) => {
          return data.data as Youtube
        })
      setVideo(result)
    }
    getYoutube()
  }, [])
  const getNextVideo = async (nextPage: string) => {
    next()
    const result = await axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=contentDetails,snippet&playlistId=PL0eK3gfF1BbM6tiu8UThzL9nYNowS8LL2&maxResults=1&pageToken=${nextPage}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      )
      .then((data) => {
        return data.data as Youtube
      })
    setVideo(result)
    setComment([])
    setShow(false)
  }
  const getPrevVideo = async (prevPage: string) => {
    next()
    const result = await axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=contentDetails,snippet&playlistId=PL0eK3gfF1BbM6tiu8UThzL9nYNowS8LL2&maxResults=1&pageToken=${prevPage}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      )
      .then((data) => {
        return data.data as Youtube
      })
    setVideo(result)
    setComment([])
    setShow(false)
  }
  console.log(video)
  const getVideoComment = async (videoId: string) => {
    // videoのコメントを取得
    // https://www.googleapis.com/youtube/v3/comments
    const result = await axios
      .get(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&videoId=${videoId}&maxResults=10`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      )
      .then((data) => {
        return data.data.items as YoutubeComment[]
      })
    setComment(result)
  }
  const indexSelectYoutube = async (videoName: string) => {
    disc_fadeout()
    const query = encodeURI('櫻坂46' + videoName)
    const result = await axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&playlistId=PL0eK3gfF1BbM6tiu8UThzL9nYNowS8LL2&maxResults=1&q=` +
          query,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      )
      .then((data) => {
        return data.data as Youtube
      })
    setIndexVideo(result)
    indexVideoContainer_fadein()
    // setComment([])
    // setShow(false)
  }
  const changeYoutube = useCallback(() => {
    setLoading(true)
    setShow(true)
  }, [show])
  const changeYoutubeIndex = useCallback(() => {
    setLoading(true)
    setSelectShow(true)
  }, [selectShow])

  const play: YouTubeProps['onReady'] = (event: YouTubeEvent) => {
    // access to player in all event handlers via event.target
    event.target.isMuted()
    event.target.playVideo()
    setLoading(false)
  }
  const loaderBg = () => {
    bgTL
      .to('#bg_animation', {
        x: '100%',
        opacity: 1,
      })
      .to('#bg_animation', {
        opacity: 0,
        duration: 1,
      })
  }
  const next = () => {
    loaderBg()
    bgTL.seek(0)
  }
  const switchToggle = () => {
    setActive(!active)
    dotTrans()
  }
  const dotTrans = () => {
    if (active) {
      gsap.to('#tgl_dot', {
        x: 0,
      })
      gsap.to('#tgl_text', {
        opacity: 0.5,
      })
      gsap.to('#modal', {
        opacity: 0,
        pointerEvents: 'none',
      })
    } else {
      gsap.to('#tgl_dot', {
        x: -33,
      })
      gsap.to('#tgl_text', {
        opacity: 1,
      })
      gsap.to('#modal', {
        opacity: 1,
        pointerEvents: 'auto',
      })
    }
  }
  const disc_fadeout = () => {
    gsap.to('#disc', {
      opacity: 0,
      display: 'none',
    })
  }
  const disc_fadein = () => {
    gsap.to('#disc', {
      opacity: 1,
      display: 'flex',
    })
  }
  const indexVideoContainer_fadein = () => {
    gsap.to('#indexVideoContainer', {
      opacity: 1,
      duration: 1,
      delay: 1,
    })
  }
  const indexVideoContainer_fadeout = () => {
    gsap.to('#indexVideoContainer', {
      opacity: 0,
      duration: 1,
    })
  }
  const back = () => {
    setSelectShow(false)
    setIndexVideo(undefined)
    disc_fadein()
    indexVideoContainer_fadeout()
  }
  // style //
  const container = css`
    position: relative;
    width: 90vw;
    height: 100%;
    margin: 100px auto;
    z-index: 40;
    max-width: 1300px;
  `
  const box = css`
    position: relative;
    max-width: 1300px;
  `
  const button_box = css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    position: absolute;
    width: 80px;
    height: 80px;
    top: 50%;
    left: 50%;
    @media screen and(min-width:500) {
      width: 128px;
      height: 128px;
    }
  `
  const music_box = css`
    position: relative;
    margin: 40px auto;
  `
  const comment_box = css`
    margin: 20px 0;
  `
  const area = css`
    height: 100%;
    margin: 60px auto 20px auto;
  `
  const action_buttons = css`
    position: relative;
    height: 100%;
    margin: 10px 0;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 15px;
  `
  const action_button = css`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #fff;
    color: #fff;
    text-align: center;
  `
  const action_box = css`
    display: flex;
    align-items: center;
    gap: 15px;
  `
  const thumnail_img = css`
    max-width: 900px;
    margin: 0 auto;
    width: 70vw;
    height: 100%;
  `
  const youtube_area = css`
    max-width: 900px;
    margin: 0 auto;
    width: 70vw;
    height: 50vw;
    max-height: 500px;
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
  const slider = css`
    overflow: hidden;
    display: flex;
    & > div : {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
    }
  `
  const video_title = css`
    font-size: 2vw;
    color: #fff;
  `
  const video_published = css`
    font-size: 1.6vw;
    color: #fff;
  `
  const hange_area = css`
    position: relative;
    display: inline-block;
    width: 58px;
    height: 22px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 11px;
    background-color: #000;
    border: 1px solid #fff;
  `
  const switch_box = css`
    display: flex;
    gap: 10px;
    align-items: center;
    position: relative;
    z-index: 109;
  `
  const hange_dot = css`
    position: absolute;
    width: 16px;
    height: 16px;
    top: 2px;
    right: 3px;
    border-radius: 8px;
    background-color: #fff;
  `
  const change_text = css`
    color: #fff;
    opacity: 0.5;
    position: relative;
  `
  const modal_box = css`
    position: absolute;
    width: 100vw;
    height: 100%;
    z-index: 100;
    overflow: scroll;
    background: #000;
    top: 10%;
    left: -5%;
    opacity: 0;
    pointer-events: none;
    max-width: 1400px;
  `
  const disc_container = css`
    width: 90%;
    display: flex;
    gap: 30px;
    margin: 100px auto 0 auto;
    flex-wrap: wrap;
    @media (min-width: 800px) {
      width: 70%;
    }
  `
  const disc_box = css`
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    margin: 10px 0;
    width: 100px;
    height: 100%;
    justify-content: center;
  `
  const disc_img = css`
    width: 100px;
    height: 100px;
    transition: all 0.2s ease;
    transform-origin: center;
    &:hover {
      transform: scale(0.8);
    }
  `
  const disc_text = css`
    color: #fff;
    font-size: 1vw;
    text-align: center;
    feight: bold;
  `
  const selectIndexContainer = css`
    display: grid;
    place-items: center;
    height: 100%;
  `
  const s = css`
    opacity: 0;
  `
  console.log(indexVideo)
  return (
    <Box css={container}>
      <Heading style={{ color: '#fff' }}>Music Video</Heading>
      <Box css={box}>
        <Box css={area}>
          <Box
            css={music_box}
            sx={{
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Box
              sx={{
                position: 'relative',
              }}
            >
              {show ? (
                <YouTube
                  videoId={video?.items[0].snippet.resourceId.videoId}
                  css={youtube_area}
                  onReady={play}
                />
              ) : (
                <Image
                  src={video?.items[0].snippet.thumbnails.standard.url as string}
                  alt=''
                  width={300}
                  height={300}
                  css={thumnail_img}
                  unoptimized
                />
              )}
              <Box css={button_box}>
                {loading ? <Loading /> : <></>}
                {show ? <></> : <ClickPlayButton onClick={changeYoutube} />}
              </Box>
            </Box>
            <Box>
              <p css={video_title}>{video?.items[0].snippet.title}</p>
              <p css={video_title}>
                {video?.items[0].contentDetails.videoPublishedAt.slice(
                  0,
                  video?.items[0].contentDetails.videoPublishedAt.indexOf('T'),
                )}
              </p>
            </Box>
          </Box>
          <Box css={action_box}>
            <Box css={comment_box}>
              <CommentButton
                onClick={() =>
                  getVideoComment(video?.items[0].snippet.resourceId.videoId as string)
                }
              />
            </Box>
            <Box css={action_buttons}>
              {video?.prevPageToken ? (
                <Box
                  component='button'
                  css={action_button}
                  id='button_prev'
                  onClick={() => getPrevVideo(video?.prevPageToken)}
                >
                  <span>prev</span>
                </Box>
              ) : (
                ''
              )}
              <Box
                component='button'
                css={action_button}
                onClick={() => getNextVideo(video?.nextPageToken as string)}
                id='button_next'
              >
                <span>next</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {comments
        ? comments.map((comment: YoutubeComment, index: number) => (
            <p style={{ color: '#fff' }} key={index}>
              {comment.snippet.topLevelComment.snippet.textOriginal}
            </p>
          ))
        : ''}
      <Box css={switch_box} id='tgl_box'>
        <Box css={change_text} id='tgl_text'>
          iNDEX
        </Box>
        <Box css={hange_area} onClick={switchToggle}>
          <Box css={hange_dot} id='tgl_dot'></Box>
        </Box>
      </Box>
      <Box css={bg_caten} id='bg_animation'>
        <Loading />
      </Box>
      <Box css={modal_box} id='modal'>
        <Box css={disc_container} id='disc'>
          {video_disc.map((disc, index) => (
            <Box key={index} css={disc_box} onClick={() => indexSelectYoutube(disc.name)}>
              <Image src={disc.src} alt='' width={0} height={0} css={disc_img} />
              <Typography css={disc_text}>{disc.name}</Typography>
            </Box>
          ))}
        </Box>
        <Box id='indexVideoContainer' css={s}>
          {indexVideo ? (
            <Box css={selectIndexContainer}>
              <Box
                sx={{
                  position: 'relative',
                }}
              >
                {selectShow ? (
                  <YouTube
                    videoId={indexVideo?.items[0].id.videoId as string}
                    css={youtube_area}
                    onReady={play}
                  />
                ) : (
                  <Image
                    src={indexVideo?.items[0].snippet.thumbnails.medium.url as string}
                    alt=''
                    width={300}
                    height={300}
                    css={thumnail_img}
                    unoptimized
                  />
                )}
                <Box css={button_box}>
                  {loading ? <Loading /> : <></>}
                  {selectShow ? <></> : <ClickPlayButton onClick={changeYoutubeIndex} />}
                </Box>
                <Typography css={video_title}>{indexVideo?.items[0].snippet.title}</Typography>
                <Box onClick={back}>
                  <Button>BACK</Button>
                </Box>
              </Box>
              <Box>
                {/* <Typography css={video_title}>
                {indexVideo?.items[0].snippet.publishTime.slice(
                  0,
                  video?.items[0].snippet.publishTime.indexOf('T'),
                )}
              </Typography> */}
              </Box>
            </Box>
          ) : (
            ''
          )}
        </Box>
      </Box>
    </Box>
  )
}
