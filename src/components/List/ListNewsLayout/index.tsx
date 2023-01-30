import { css } from '@emotion/react'
import { Box } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import useSWR from 'swr'
import { Heading } from '@/components/atoms/Heading'
import { customSearchEndpoint } from '@/constant/url'
import { SearchObj } from '@/types/search'

export const ListNewsLayout = () => {
  const url =
    customSearchEndpoint +
    `?key=${process.env.NEXT_PUBLIC_CUSTOM_API_KEY}&cx=${process.env.NEXT_PUBLIC_CUSTOM_ID}&sort=date&dateRestrict=d6&q=ニュース`
  const fetcher = async (url: string) => {
    return await axios.get(url).then((data) => {
      return data.data.items
    })
  }
  const { data: news, error }: { data: SearchObj[]; error: any } = useSWR(url, fetcher)
  if (error) return <div>Error News取得に失敗しました。</div>
  if (!news) return <div>Loading...</div>
  const news_text = css`
    border-bottom: 1px solid #000;
    margin: 10px 0;
    width: fit-content;
  `
  const container = css`
    width: 95vw;
    margin: 20px auto;
    maxwidth: 1440px;
  `
  const content_box = css`
    width: 90vw;
    margin: 20px auto;
    maxwidth: 1440px;
  `
  return (
    <Box css={container}>
      <Heading style={{ color: '#000' }}>NEWS</Heading>
      <Box css={content_box}>
        <ul>
          {news.map((list: SearchObj, index: number) => (
            <li key={index} css={news_text}>
              {list.title.indexOf('日向坂') ? (
                <Link href={list.formattedUrl} target={'_blank'}>
                  {list.title}
                </Link>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  )
}
