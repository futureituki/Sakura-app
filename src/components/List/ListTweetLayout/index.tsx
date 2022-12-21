import { Box } from '@mui/material'
import axios from 'axios'
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
    <Box>
      {tweets
        ? tweets.map((tweet: TweetObj, index: number) => <p key={index}>{tweet.text}</p>)
        : ''}
    </Box>
  )
}
