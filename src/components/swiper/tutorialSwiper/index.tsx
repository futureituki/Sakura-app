import { Favorite, Newspaper } from '@mui/icons-material'
import { Box } from '@mui/material'
import React, { useState } from 'react'
// Import Swiper React components
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import styles from '@/components/swiper/tutorialSwiper/index.module.css'
// import required modules

export const TutorialSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState<number>()
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '600px',
      }}
      component='div'
    >
      <Swiper
        modules={[Navigation]}
        onSlideChange={(e) => setCurrentIndex(e.realIndex + 1)}
        navigation={{
          // パラメータを設定
          prevEl: '#button_prev',
          nextEl: '#button_next',
        }}
        className='mySwiper'
      >
        <SwiperSlide>
          <Box
            sx={{
              padding: '40px 0',
            }}
            component='div'
          >
            <h2 className={styles.title}>Welcome</h2>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              component='div'
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '10px',
                }}
                component='div'
              >
                <Newspaper />
                <h4>最新情報</h4>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '10px',
                }}
                component='div'
              >
                <Favorite />
                <h4>いいね機能</h4>
              </Box>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
      <div id='button_prev' className={`swiper-button-prev ${styles.prev}`}>
        前へ
      </div>
      <div className={styles.index}>{currentIndex}/4</div>
      <div id='button_next' className={`swiper-button-next ${styles.next}`}>
        次へ
      </div>
    </Box>
  )
}
