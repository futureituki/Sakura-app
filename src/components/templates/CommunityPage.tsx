import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { PrimaryButton } from '../atoms/Button'
import { TitleBar } from '../atoms/TitleBar'
import { Heading } from '@/components/atoms/Heading'
import Pagination from '@/components/pagination'
import { Community } from '@/types/community'

type Props = {
  communitys: Community[]
}
export const CommunityPage: FC<Props> = ({ communitys }) => {
  const router = useRouter()
  return (
    <>
      <TitleBar>Community</TitleBar>
      <Box
        sx={{
          margin: '20px 0',
        }}
      >
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
      </Box>
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
        {communitys.map((data: Community, index: number) => (
          <Box
            key={index}
            sx={{
              width: '30vw',
              '@media screen and (min-width:640)': {},
            }}
          >
            <Image
              src={data.url}
              alt=''
              width={300}
              height={300}
              style={{ width: '30vw', height: '30vw' }}
            />
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
                <Link key={index} href={`/community/tag/${tagName}`}>
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
      </Box>
    </>
  )
}
