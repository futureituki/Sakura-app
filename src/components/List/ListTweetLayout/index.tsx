import { css } from '@emotion/react'
import { Box, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { Loading } from '@/components/atoms/Loading'

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
  const box = css`
    margin: 60px 0;
  `
  const loading_box = css`
    position: absolute;
    left: 50%;
    width: 100%;
  `
  return (
    <Box>
      <a
        className='twitter-timeline'
        href='https://twitter.com/sakurazaka46?ref_src=twsrc%5Etfw'
        style={{ position: 'relative' }}
      >
        <CircularProgress style={{ width: '70px', height: '70px' }} />
      </a>
    </Box>
  )
}
