import { Box } from '@mui/material'
import { collection, where, query, onSnapshot } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { Heading } from '@/components/atoms/Heading'
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
        })
      }
    }
    getData()
  }, [tagName])
  return (
    <Box>
      <TitleBar>{tagName}</TitleBar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          flexWrap: 'wrap',
          gap: '20px',
          margin: '50px 0',
          '@media screen and (min-width:1200px)': {
            justifyContent: 'center',
          },
        }}
      >
        {posts?.map((post: Community, index: number) => (
          <Box
            key={index}
            sx={{
              width: '30vw',
              '@media screen and (min-width:640)': {},
            }}
          >
            <img src={post.url} style={{ width: '100%' }} />
            <Heading visualLevel='h5' style={{ color: '#000', fontSize: '3vw' }}>
              {post.title}
            </Heading>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
