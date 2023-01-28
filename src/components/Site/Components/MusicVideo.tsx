import { css, keyframes } from '@emotion/react'
import { Box } from '@mui/material'
import axios from 'axios'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube/dist/YouTube'
import { CommentButton } from '@/components/atoms/Button/CommentButton'
import { ClickPlayButton } from '@/components/atoms/ClickPlayButton'
import { Heading } from '@/components/atoms/Heading'
import { Loading } from '@/components/atoms/Loading'
import { youtubeEndPoint } from '@/constant/url'
import { Youtube, YoutubeComment } from '@/types/youtube'
gsap.registerPlugin(ScrollTrigger)

export const MusicVideo = () => {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [video, setVideo] = useState<Youtube>()
  const [comments, setComment] = useState<YoutubeComment[]>([])
  const bgTL = gsap.timeline()
  let url =
    youtubeEndPoint +
    `/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&playlistId=PL0eK3gfF1BbM6tiu8UThzL9nYNowS8LL2&maxResults=1`
  useEffect(() => {
    const getYoutube = async () => {
      const result = await axios
        .get(
          `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&playlistId=PL0eK3gfF1BbM6tiu8UThzL9nYNowS8LL2&maxResults=1`,
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
    setLoading(true)
    next()
    const result = await axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&playlistId=PL0eK3gfF1BbM6tiu8UThzL9nYNowS8LL2&maxResults=1&pageToken=${nextPage}`,
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
    setLoading(false)
    setShow(false)
  }
  const getPrevVideo = async (prevPage: string) => {
    setLoading(true)
    next()
    const result = await axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&playlistId=PL0eK3gfF1BbM6tiu8UThzL9nYNowS8LL2&maxResults=1&pageToken=${prevPage}`,
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
    setLoading(false)
    setShow(false)
  }
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
  const changeYoutube = () => {
    setLoading(true)
    setShow(true)
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
    max-width: 1300px;
  `
  const box = css`
    position: relative;
    width: 90vw;
    height: 100%;
    margin: 100px auto 0 auto;
    z-index: 40;
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
  const action_box = css`
    display: flex;
    align-items: center;
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
  return (
    <Box css={box}>
      <Heading style={{ color: '#fff' }}>Music Video</Heading>
      <Box css={container}>
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
                  // onPlay={play}
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
          </Box>
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
      {comments
        ? comments.map((comment: YoutubeComment, index: number) => (
            <p style={{ color: '#fff' }} key={index}>
              {comment.snippet.topLevelComment.snippet.textOriginal}
            </p>
          ))
        : ''}
      <Box css={bg_caten} id='bg_animation'></Box>
    </Box>
  )
}
