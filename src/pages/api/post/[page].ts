// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { AdminDB } from '@/firebase/server'
import { Community } from '@/types/community'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { page } = req.query
  const LIMIT = 3
  const pageNum = page as unknown as number
  const order = (pageNum - 1) * LIMIT // page は 1 以上の整数
  const communitySnap = await AdminDB.collection(`community`)
    .orderBy('created_at', 'desc')
    .limit(3)
    .offset(order)
    .get()
  const communitys = communitySnap.docs.map((doc) => doc.data() as Community)
  const community = JSON.parse(JSON.stringify(communitys))
  res.status(200).json(community)
}
