import { Box } from '@mui/material'
import axios from 'axios'
import {
  collection,
  where,
  query,
  onSnapshot,
  limit,
  startAt,
  orderBy,
  getDocs,
  startAfter,
  endBefore,
} from 'firebase/firestore'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import useSWR from 'swr'
import { Heading } from '@/components/atoms/Heading'
import { TitleBar } from '@/components/atoms/TitleBar'
import { db } from '@/firebase/firebase'
import { Community } from '@/types/community'
type Props = {
  tagName: string
}
export const SelectTagPostPage: FC<Props> = ({ tagName }) => {
  const [posts, setPosts] = useState<Community[]>()
  const [snap, setSnap] = useState<any>()
  const [page, setPage] = useState<number>(1)
  useEffect(() => {
    const getData = async () => {
      const first = query(
        collection(db, 'community'),
        where('tag', 'array-contains', tagName),
        orderBy('created_at', 'desc'),
        limit(3),
      )
      const documentSnapshots = await getDocs(first)
      setSnap(documentSnapshots)
      const unsub = setPosts(documentSnapshots.docs.map((doc) => ({ ...doc.data() } as Community)))
    }
    getData()
  }, [tagName])
  if (!posts) return <div>Loading...</div>
  // Construct a new query starting at this document,
  // get the next 25 cities.
  const getNext = async () => {
    setPage((prev) => prev + 1)
    const next = query(
      collection(db, 'community'),
      where('tag', 'array-contains', tagName),
      orderBy('created_at', 'desc'),
      startAfter(snap.docs[posts?.length - 1]),
      limit(3),
    )
    const documentSnapshots = await getDocs(next)
    setSnap(documentSnapshots)
    const unsub = setPosts(documentSnapshots.docs.map((doc) => ({ ...doc.data() } as Community)))
  }
  const getPrev = async () => {
    setPage((prev) => prev - 1)
    const prev = query(
      collection(db, 'community'),
      where('tag', 'array-contains', tagName),
      orderBy('created_at', 'desc'),
      endBefore(snap.docs[0]),
      limit(3),
    )
    const documentSnapshots = await getDocs(prev)
    setSnap(documentSnapshots)
    const unsub = setPosts(documentSnapshots.docs.map((doc) => ({ ...doc.data() } as Community)))
  }
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
            <Image
              src={post.url}
              alt=''
              width={300}
              height={300}
              style={{ width: '30vw', height: '30vw' }}
            />
            <Heading visualLevel='h5' style={{ color: '#000', fontSize: '3vw' }}>
              {post.title}
            </Heading>
          </Box>
        ))}
      </Box>
      <button
        style={{ background: page === 1 ? '#f2f2f2' : '#1BD760' }}
        onClick={getPrev}
        disabled={page === 1}
      >
        前へ
      </button>
      <button
        style={{ background: posts.length !== 3 ? '#f2f2f2' : '#1BD760' }}
        onClick={getNext}
        disabled={posts.length !== 3}
      >
        次へ
      </button>
    </Box>
  )
}
