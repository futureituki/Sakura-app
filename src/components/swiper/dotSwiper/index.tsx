import { Box } from '@mui/material'
import Image from 'next/image'
import React, { FC, useCallback, useState } from 'react'
// Import Swiper React components
import { EffectFade, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { GeneralModal } from '@/components/modal/generalModal'
import { YoutubePopUp } from '@/components/popup/youtube'
import styles from '@/components/swiper/dotSwiper/index.module.css'

// import required modules
import { sliderVideoSrc } from '@/constant/sliderSrc'

type Props = typeof sliderVideoSrc
type Slider = {
  src: string
  title: string
  id: string
}
export const DotSwiper: FC<{ data: Props }> = ({ data }) => {
  const [name, setName] = useState<string>('')
  const handleOpen = (title: string) => {
    switch (name) {
      case '':
        setName(title)
        break
      default:
        setName('')
        break
    }
  }
  return (
    <Box
      sx={{
        margin: '40px 0',
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
            <Box
              sx={{
                width: '100vw',
              }}
              onClick={() => handleOpen(slide.title)}
            >
              <GeneralModal open={name === slide.title} handleClose={() => handleOpen(slide.title)}>
                <YoutubePopUp id={slide.id} />
              </GeneralModal>
              <Image
                src={slide.src}
                alt=''
                width={1000}
                height={1000}
                className={styles.slide_img}
              />
              <div className={`swiper-slide top_slider ${styles.swiper_title}`}>
                <span>{slide.title}</span>
              </div>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
