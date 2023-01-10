import { SwiperSlide } from 'swiper/react'
import { SwiperContainer } from '@/components/swiper/animationSwiper/SwiperAnimation'
import { sliderSrc } from '@/constant/sliderSrc'
import styles from '@/styles/Site.module.css'
import { SliderObj } from '@/types/constant/slider'
const Section04 = () => {
  return (
    <section className={styles.sec_in_move}>
      <SwiperContainer>
        {sliderSrc.map((video: SliderObj, index: number) => (
          <SwiperSlide key={index}>
            <div className={styles.video_wrapper}>
              <video preload='none' loop autoPlay muted playsInline className={styles.swiper_video}>
                <source src={video.src} />
              </video>
              <p className='swiper-slide'>{video.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </section>
  )
}

export default Section04
