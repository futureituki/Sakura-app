import React, { useRef, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Navigation, Pagination } from "swiper"
// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/navigation"
import "swiper/css/pagination"
import styles from '@/components/swiper/index.module.css'
// export const SwiperItem = () => {
//   return (

//   )
// }

export const SwiperContainer = () => {
  return (
    <div className={styles.swiper_in}>
    <Swiper
          spaceBetween={30}
          effect={"fade"}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination]}
          className={styles.swiper}
        >
          <SwiperSlide style={{width:'100%'}}>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
            <span>ああああ</span>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          </SwiperSlide>
          <div className="swiper-pagination"></div>
        </Swiper>
    </div>
  )
}