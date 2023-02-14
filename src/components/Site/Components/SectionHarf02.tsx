import { css } from '@emotion/react'
import { Box } from '@mui/material'
import Image from 'next/image'
import { Heading } from '@/components/atoms/Heading'
export const SectionHarf02 = () => {
  const group_name = css`
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0 3px;
  `
  const blockquote_text = css`
    color: #fff;
    font-size: 1.4vw;
    line-height: 1.75;
    letter-spacing: 1px;
  `
  return (
    <section style={{ position: 'relative', zIndex: 100 }}>
      <Box
        sx={{
          width: '90vw',
          margin: '40px auto',
          maxWidth: '1400px',
        }}
        component='div'
      >
        <Heading
          level={2}
          visualLevel={1}
          style={{ color: '#fff', position: 'relative', fontSize: '5vw' }}
        >
          櫻坂46とは
        </Heading>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
          component='div'
        >
          <blockquote css={blockquote_text}>
            <p>
              2015年8月に乃木坂46に続く「坂道シリーズ」第2弾グループとなる
              <span css={group_name}>欅坂46</span>として誕生。
            </p>
            <p>2016年4月6日、1stシングル「サイレントマジョリティー」でデビュー。</p>
            <p>
              2020年7月に配信ライブを開催し、同公演内で10月のラストライブをもって欅坂46の活動休止と改名を発表。
            </p>
            <p>
              2020年9月に新グループ名が<span css={group_name}>櫻坂46</span>
              になることが、発表された。
            </p>
          </blockquote>
          <Image
            src='/assets/about-logo.svg'
            alt=''
            width={200}
            height={200}
            style={{ width: '25vw', height: '25vw' }}
          />
        </Box>
      </Box>
    </section>
  )
}
