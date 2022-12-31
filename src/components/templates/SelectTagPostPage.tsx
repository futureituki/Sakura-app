import { Box } from '@mui/material'
import { collection, where, query, onSnapshot } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { TitleBar } from '@/components/atoms/TitleBar'
import { db } from '@/firebase/firebase'
import { Community } from '@/types/community'

type Props = {
  tagName: string
}
export const SelectTagPostPage: FC<Props> = ({ tagName }) => {
  const [posts, setPosts] = useState<Community[]>()
  useEffect(() => {
    const getData = () => {
      if (tagName) {
        const colRef = collection(db, 'community') // 例
        const q = query(colRef, where('tag', 'array-contains', tagName))
        const unsub = onSnapshot(q, (querySnapshot) => {
          setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data() } as Community)))
          console.log(querySnapshot)
        })
      }
    }
    getData()
  }, [tagName])
  return (
    <Box>
      <TitleBar>{tagName}</TitleBar>
      <Box>
        {posts?.map((post: Community, index: number) => (
          <Box
            key={index}
            sx={{
              margin: '20px 0',
            }}
          >
            <Box>
              <img src={post.url} style={{ width: '40vw' }} />
            </Box>
            <Box>
              <span style={{ fontSize: '3vw' }}>{post.title}</span>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
