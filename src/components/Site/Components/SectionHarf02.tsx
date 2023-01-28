import { Box } from '@mui/material'
import Image from 'next/image'
import { Heading } from '@/components/atoms/Heading'

export const SectionHarf02 = () => {
  return (
    <section style={{ position: 'relative', zIndex: 100 }}>
      <Box
        sx={{
          width: '90vw',
          margin: '0 auto',
          maxWidth: '1300px',
        }}
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
        >
          <blockquote style={{ color: '#fff', fontSize: '2vw', lineHeight: '1.75' }}>
            <p>
              2015年8月に乃木坂46に続く「坂道シリーズ」第2弾グループとなる
              <span style={{ color: 'red' }}>欅坂46</span>として誕生。
            </p>
            <p>2016年4月6日、1stシングル「サイレントマジョリティー」でデビュー。</p>
            <p>
              2020年7月に配信ライブを開催し、同公演内で10月のラストライブをもって欅坂46の活動休止と改名を発表。
            </p>
            <p>
              2020年9月に新グループ名が<span style={{ color: 'red' }}>櫻坂46</span>
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
