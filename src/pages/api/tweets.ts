import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'twitter-api-sdk'
import { searchByTweet } from '@/lib/tweets'

export default async function getTweet(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client(process.env.NEXT_PUBLIC_BEARER_TOKEN as string)
  try {
    const resp = await searchByTweet(client, '櫻坂46公式サイト')
    res.status(200).json({ resp })
  } catch (e) {
    console.log(e)
  }
}
