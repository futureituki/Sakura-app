import { SwiperSlide } from 'swiper/react'
import { SwiperContainer } from '@/components/swiper/SwiperAnimation'
import { sliderSrc } from '@/constant/sliderSrc'
import styles from '@/styles/Site.module.css'
export const Section04 = () => {
  return (
    <section className={styles.sec_in_move}>
      <SwiperContainer>
        {sliderSrc.map((video, index) => (
          <SwiperSlide key={index}>
            <div className={styles.video_wrapper}>
              <video loop autoPlay muted playsInline className={styles.swiper_video}>
                <source src={video.src} />
              </video>
            <p className="swiper-slide">{video.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </section>
  )
}
