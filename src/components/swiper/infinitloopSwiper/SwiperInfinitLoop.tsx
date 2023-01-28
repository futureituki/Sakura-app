import React, { FC } from 'react'
import { Pagination, Navigation } from 'swiper'
import { Swiper } from 'swiper/react'
// Import Swiper React components

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import styles from '@/components/swiper/infinitloopSwiper/index.module.css'

// import required modules

type Props = {
  children: React.ReactNode
}
export const SwiperInfinitLoop: FC<Props> = ({ children }) => {
  return (
    <>
      <Swiper
        slidesPerView='auto'
        centeredSlides={true}
        spaceBetween={40}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          550: {
            slidesPerView: 3,
          },
        }}
        modules={[Pagination, Navigation]}
        className={styles.mySwiper}
      >
        {children}
      </Swiper>
    </>
  )
}
