import { css } from '@emotion/react'
import { Box, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { Loading } from '@/components/atoms/Loading'
import { LargeProgress } from '@/components/atoms/Loading/progress'
export const ListTweetLayout = () => {
  useEffect(() => {
    // scriptを読み込み
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    document.body.appendChild(script)
    // アンマウント時に一応scriptタグを消しておく
    return () => {
      document.body.removeChild(script)
    }
  }, [])
  // useEffect(() => {
  //   const getTweet = async () => {
  //     const result: TweetObj[] = await axios.get('/api/tweets').then((data) => data.data.resp)
  //     setTweets(result)
  //   }
  //   getTweet()
  // }, [])
  const twitter_box = css`
    width: 100%;
    @media (min-width: 800px) {
      width: 50%;
    }
  `
  return (
    <Box css={twitter_box} component='div'>
      <a
        className='twitter-timeline'
        href='https://twitter.com/sakurazaka46?ref_src=twsrc%5Etfw'
        data-width='100%'
        data-height='700'
        style={{ position: 'relative', pointerEvents: 'none' }}
      >
        <LargeProgress />
      </a>
    </Box>
  )
}
