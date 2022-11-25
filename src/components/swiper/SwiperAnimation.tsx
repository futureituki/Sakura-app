import React, { useRef, useState } from 'react'
// Import Swiper React components
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from '@/components/swiper/index.module.css'

// export const SwiperItem = () => {
//   return (

//   )
// }
export const SwiperContainer = () => {
  const ref = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState<number>()
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)
  let speed = 3000
  console.log(Swiper)
  return (
    <div className={styles.swiper_in}>
      <Swiper
        loop={true}
        spaceBetween={30}
        navigation={{
          prevEl: '#button_prev',
          nextEl: '#button_next',
        }}
        autoplay={{
          disableOnInteraction: false,
        }}
        onSlideChange={(e) => setCurrentIndex(e.realIndex + 1)}
        onSlideChangeTransitionStart={() => {
          if (ref.current) {
            ref.current.style.transitionDuration = '0s'
            ref.current.style.transform = 'scaleX(0)'
          }
        }}
        onSlideChangeTransitionEnd={() => {
          if (ref.current) {
            ref.current.style.transitionDuration = speed + 'ms'
            ref.current.style.transform = 'scaleX(1)'
          }
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className={styles.swiper}
      >
        <SwiperSlide style={{ width: '100%' }}>
          <img src='https://swiperjs.com/demos/images/nature-1.jpg' />
          <span>ああああ</span>
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-2.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-3.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-4.jpg' />
        </SwiperSlide>
      </Swiper>
      <div className={styles.navigation}>
        <div className={styles.pagination_button}>
          <div id='button_prev' className={`swiper-button-prev ${styles.swiper_prev}`}></div>
          <div id='button_next' className={`swiper-button-next ${styles.swiper_next}`}></div>
        </div>
        <div className={styles.pagination_area}>
          <div className={styles.current_index}>
            <span>0{currentIndex}</span>
          </div>
          <div className={styles.progressbar}>
            <span className={styles.progressbar_in} ref={ref}></span>
          </div>
          <div className={styles.all_index}>
            <span>04</span>
          </div>
        </div>
      </div>
    </div>
  )
}
