import { css } from '@emotion/react'
import { SwiperSlide } from 'swiper/react'
import { SwiperContainer } from '@/components/swiper/animationSwiper/SwiperAnimation'
import { sliderSrc } from '@/constant/sliderSrc'
import styles from '@/styles/Site.module.css'
import { SliderObj } from '@/types/constant/slider'
const Section04 = () => {
  const v = css`
    position: absolute;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    height: 64.25vw;
    min-height: 100%;
    min-width: 100%;
  `
  return (
    <section className={styles.sec_in_move}>
      <SwiperContainer>
        {sliderSrc.map((video: SliderObj, index: number) => (
          <SwiperSlide key={index} style={{ width: '100vw' }}>
            <div className={styles.video_wrapper}>
              <video preload='none' loop autoPlay muted playsInline css={v}>
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
