import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
// Import Swiper React components
import { EffectFade, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from '@/components/swiper/dotSwiper/index.module.css'

// import required modules
import { sliderVideoSrc } from '@/constant/sliderSrc'

type Props = typeof sliderVideoSrc
type Slider = {
  src: string
  title: string
  url: string
}
export const DotSwiper: FC<{ data: Props }> = ({ data }) => {
  return (
    <Box
      sx={{
        height: '80vw',
      }}
    >
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Pagination]}
        className={styles.mySwiper}
      >
        {data.map((slide: Slider, index: number) => (
          <SwiperSlide key={index}>
            <Link href={slide.url} target='_blank'>
              <Box
                sx={{
                  width: '100vw',
                }}
              >
                <Image
                  src={slide.src}
                  alt=''
                  width={1000}
                  height={1000}
                  style={{ margin: '0 auto', width: '100%', height: '100%' }}
                />
                <p className={`swiper-slide top_slider ${styles.swiper_title}`}>
                  <span>{slide.title}</span>
                </p>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
