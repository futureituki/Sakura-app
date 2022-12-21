import { Box } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { TweetObj } from '@/types/twitter'

export const ListTweetLayout = () => {
  const [tweets, setTweets] = useState<TweetObj[]>()
  useEffect(() => {
    const getTweet = async () => {
      const result: TweetObj[] = await axios.get('/api/tweets').then((data) => data.data.resp)
      setTweets(result)
    }
    getTweet()
  }, [])
  return (
    <>
      <Head>
        <script async src='https://platform.twitter.com/widgets.js'></script>
      </Head>
      <Box>
        <a
          className='twitter-timeline'
          href='https://twitter.com/sakurazaka46?ref_src=twsrc%5Etfw'
        ></a>
        {tweets
          ? tweets.map((tweet: TweetObj, index: number) => <p key={index}>{tweet.text}</p>)
          : ''}
      </Box>
    </>
  )
}
