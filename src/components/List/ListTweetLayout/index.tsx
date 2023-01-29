import { Box } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Loading } from '@/components/atoms/Loading'
import { TweetObj } from '@/types/twitter'

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
  return (
    <Box>
      <a
        className='twitter-timeline'
        href='https://twitter.com/sakurazaka46?ref_src=twsrc%5Etfw'
      ></a>
    </Box>
  )
}
