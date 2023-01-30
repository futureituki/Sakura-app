import { css } from '@emotion/react'
import { Box } from '@mui/material'
import { collection, getDocs, query, where } from 'firebase/firestore'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { TitleBar } from '../atoms/TitleBar'
import { Heading } from '@/components/atoms/Heading'
import { db } from '@/firebase/firebase'
import { useGetUser } from '@/lib/user'
import { Community } from '@/types/community'

export const MyPostPage = () => {
  const user = useGetUser().user
  const [posts, setPosts] = useState<Community[]>([])
  useEffect(() => {
    const getPost = async () => {
      const ref = collection(db, 'community')
      const q = query(ref, where('uid', '==', user.uid))
      // setPosts(posts)
      const documentSnapshots = await getDocs(q)
      const unsub = setPosts(documentSnapshots.docs.map((doc) => ({ ...doc.data() } as Community)))
    }
    getPost()
  }, [])
  const item_box = css`
    width: 30vw;
    maxwidth: 500px;
    margin: 20px 0;
  `
  const box = css`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  `
  return (
    <>
      <TitleBar>My Post</TitleBar>
      <Box css={box}>
        {posts.map((post: Community, index: number) => (
          <Box key={index} css={item_box}>
            <Image
              src={post.url}
              alt=''
              width={300}
              height={300}
              style={{ width: '100%', height: '100%' }}
            />
            <Heading visualLevel='h5' style={{ color: '#000', fontSize: '3vw' }}>
              {post.title}
            </Heading>
          </Box>
        ))}
      </Box>
    </>
  )
}
