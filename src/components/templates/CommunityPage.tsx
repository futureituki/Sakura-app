import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { PrimaryButton } from '../atoms/Button'
import { TitleBar } from '../atoms/TitleBar'
import { Heading } from '@/components/atoms/Heading'
import { Community } from '@/types/community'
import Link from 'next/link'

type Props = {
  communitys: Community[]
}
export const CommunityPage: FC<Props> = ({ communitys }) => {
  const router = useRouter()
  return (
    <>
      <TitleBar>Community</TitleBar>
      <PrimaryButton
        label='photo'
        size='1.2vw'
        padding=''
        variant='contained'
        color='#fff'
        onClick={() => router.push('/community/post')}
        background='#ff69b8'
      >
        写真を投稿する
      </PrimaryButton>
      {communitys.map((data: Community, index: number) => (
        <Box key={index}>
          <img src={data.url} style={{ width: '50vw' }} />
          <Heading visualLevel='h5' style={{ color: '#000', fontSize: '3vw' }}>
            {data.title}
          </Heading>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {data.tag?.map((tagName: string, index: number) => (
              <Link key={index} href={`community/posts/${tagName}`}>
                <Box
                  key={index}
                  sx={{
                    margin: '20px 0',
                    padding: '5px 10px',
                    background: '#f2f2f2',
                    width: 'fit-content',
                    borderRadius: '10px',
                  }}
                >
                  <span>{tagName}</span>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      ))}
    </>
  )
}
