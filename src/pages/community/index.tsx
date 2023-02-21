import { css } from '@emotion/react'
import { Box } from '@mui/material'
import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { PrimaryButton } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { TitleBar } from '@/components/atoms/TitleBar'
import { AppLayout } from '@/layout/AppLayout'
const Community: NextPageWithLayout = () => {
  const router = useRouter()
  const title = css`
    color: #000;
    font-size: 4vw;
  `
  const button_box = css`
    display: flex;
    gap: 15px;
  `
  const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
    margin: 40px 0;
  `
  const text = css`
    margin: 20px 0;
  `
  return (
    <>
      <TitleBar>Community</TitleBar>
      <Box css={container} component='div'>
        <h1 css={title}>投稿しよう！</h1>
        <p css={text}>櫻坂46のお気に入り写真を投稿したり、櫻坂46愛をみんなで共有しよう！！</p>
        <Box css={button_box} component='div'>
          <PrimaryButton
            variant='contained'
            label='posts'
            background='#0067c0'
            onClick={() => router.push('/community/posts')}
          >
            投稿を見る
          </PrimaryButton>
          <PrimaryButton
            variant='contained'
            label='posts'
            background='#ff69b8'
            onClick={() => router.push('/community/post')}
          >
            投稿をする
          </PrimaryButton>
        </Box>
      </Box>
    </>
  )
}
Community.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Community
