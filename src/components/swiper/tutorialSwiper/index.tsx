import { css } from '@emotion/react'
import { Favorite, MusicNote, Newspaper } from '@mui/icons-material'
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
  const text_box = css`
    display: flex;
    gap: 10px;
    margin: 20px 0;
  `
  return (
    <Box
      sx={{
        position: 'relative',
        maxHeight: '600px',
        height: '100%',
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
              <Box css={text_box} component='div'>
                <Newspaper />
                <h4>最新のニュースが見れる！</h4>
              </Box>
              <Box css={text_box} component='div'>
                <Favorite />
                <h4>画像いいね機能</h4>
              </Box>
              <Box css={text_box} component='div'>
                <Favorite />
                <h4>最新のメンバーブログが見れる！</h4>
              </Box>
              <Box css={text_box} component='div'>
                <MusicNote />
                <h4>音楽が聴ける</h4>
              </Box>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
      <Box
        sx={{
          margin: '100px 0 0 0',
        }}
      >
        <div id='button_prev' className={`swiper-button-prev ${styles.prev}`}>
          前へ
        </div>
        <div className={styles.index} style={{ bottom: '10%' }}>
          {currentIndex}/3
        </div>
        <div id='button_next' className={`swiper-button-next ${styles.next}`}>
          次へ
        </div>
      </Box>
    </Box>
  )
}
