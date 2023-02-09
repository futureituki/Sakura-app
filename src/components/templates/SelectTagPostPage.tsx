import { css } from '@emotion/react'
import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import { collection, where, query, limit, orderBy, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { LargeProgress } from '../atoms/Loading/progress'
import { Heading } from '@/components/atoms/Heading'
import { TitleBar } from '@/components/atoms/TitleBar'
import { db } from '@/firebase/firebase'
import { Community } from '@/types/community'

type Props = {
  tagName: string
}

export const SelectTagPostPage: FC<Props> = ({ tagName }) => {
  const [posts, setPosts] = useState<Community[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(3)
  const LIMIT = 3
  useEffect(() => {
    const getData = async () => {
      const first = query(
        collection(db, 'community'),
        where('tag', 'array-contains', tagName),
        orderBy('created_at', 'desc'),
        limit(3),
      )
      const documentSnapshots = await getDocs(first)
      const unsub = setPosts(documentSnapshots.docs.map((doc) => ({ ...doc.data() } as Community)))
    }
    getData()
  }, [])
  if (!posts) return <LargeProgress />

  const getPost = async (page: number) => {
    setLoading(true)
    const second = query(
      collection(db, 'community'),
      where('tag', 'array-contains', tagName),
      orderBy('created_at', 'desc'),
      limit(page),
    )
    const documentSnapshots = await getDocs(second)
    const postData = documentSnapshots.docs.map((doc) => ({ ...doc.data() } as Community))
    setPosts(postData)
    setLoading(false)
  }
  const none_text = css`
    text-align: center;
    margin: 20px 0;
  `
  return (
    <Box component='div'>
      <TitleBar>{tagName}</TitleBar>
      {posts?.length === 0 ? (
        <p css={none_text}>投稿はありません</p>
      ) : (
        <>
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
            component='div'
          >
            {posts?.map((post: Community, index: number) => (
              <Box
                key={index}
                sx={{
                  width: '30vw',
                  maxWidth: '350px',
                  height: '100%',
                  '@media screen and (min-width:640)': {},
                }}
                component='div'
              >
                <Image
                  src={post.url}
                  alt=''
                  width={300}
                  height={300}
                  style={{ width: '100%', height: '100%' }}
                />
                <Heading visualLevel='h5' style={{ color: '#000', fontSize: '2vw' }}>
                  {post.title}
                </Heading>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: 'grid',
              placeItems: 'center',
            }}
            component='div'
          >
            <LoadingButton
              onClick={() => getPost(page + LIMIT)}
              loading={loading}
              variant='contained'
            >
              さらに見る
            </LoadingButton>
          </Box>
        </>
      )}
    </Box>
  )
}
