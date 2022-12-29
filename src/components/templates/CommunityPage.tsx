import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { PrimaryButton } from '../atoms/Button'
import { TitleBar } from '../atoms/TitleBar'
import { Heading } from '@/components/atoms/Heading'
import { Community } from '@/types/community'

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
          <img src={data.url} />
          <Heading visualLevel='h5' style={{ color: '#000' }}>
            {data.title}
          </Heading>
        </Box>
      ))}
    </>
  )
}
