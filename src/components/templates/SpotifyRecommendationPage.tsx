import { Box } from '@mui/material'
import axios from 'axios'
import { FC } from 'react'
import useSWR from 'swr'

type Props = {
  token: string
}
export const SpotifyRecommendationPage: FC<Props> = (token) => {
  const url = ''
  const fetcher = (url: string) => axios.get(url).then((data) => data.data)
  const { data: tracks, error } = useSWR(url, fetcher)
  return <Box component='div'>おすすめページです</Box>
}
