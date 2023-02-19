import { css } from '@emotion/react'
import { Book, Favorite, MusicNote, Newspaper } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
// Import Swiper React components
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import styles from '@/components/swiper/tutorialSwiper/index.module.css'
// import required modules
type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>
  previousOpen: boolean
  anchorEl: null | HTMLElement
}
export const TutorialSwiper: FC<Props> = ({ setOpen, setAnchorEl, previousOpen, anchorEl }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(1)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen((previousOpen: boolean) => !previousOpen)
  }
  const canBeOpen = previousOpen && Boolean(anchorEl)
  const id = canBeOpen ? 'transition-popper' : undefined
  const text_box = css`
    display: flex;
    gap: 10px;
    margin: 20px 0;
  `
  return (
    <Box
      sx={{
        position: 'relative',
        maxHeight: '800px',
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
                <Book />
                <h4>最新のメンバーブログが見れる！</h4>
              </Box>
              <Box css={text_box} component='div'>
                <MusicNote />
                <h4>音楽が聴ける</h4>
              </Box>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{
              padding: '40px 0',
            }}
          >
            <h2 className={styles.title}>Mypage</h2>
            <Box
              sx={{
                textAlign: 'center',
              }}
              component='div'
            >
              <h4>マイページからメンバーを登録してアプリを有効活用しよう</h4>
            </Box>
          </Box>
          <Box>
            <h2 className={styles.title}>DISCOGRAPHY</h2>
            <Box
              sx={{
                textAlign: 'center',
              }}
              component='div'
            >
              <h4>Spotifyからの楽曲最新ランキングをチェックできます</h4>
            </Box>
          </Box>
          <Box
            sx={{
              padding: '40px 0',
            }}
          >
            <h2 className={styles.title}>Community</h2>
            <Box
              sx={{
                textAlign: 'center',
              }}
              component='div'
            >
              <h4 style={{ margin: '10px 0' }}>他のユーザーが投稿した画像を閲覧できます</h4>
              <h4>自分も櫻坂46のお気に入りの画像を投稿しよう</h4>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{
              padding: '40px 0',
              display: 'grid',
              placeItems: 'center',
              height: '400px',
            }}
            component='div'
          >
            <h2 className={styles.title}>説明はここまで！実際に使ってみよう！！</h2>
          </Box>
        </SwiperSlide>
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
        {currentIndex === 3 ? (
          <button
            style={{ zIndex: 999 }}
            aria-describedby={id}
            onClick={handleClick}
            className={`swiper-button-next ${styles.next}`}
          >
            OK
          </button>
        ) : (
          ''
        )}
        <div id='button_next' className={`swiper-button-next ${styles.next}`}>
          次へ
        </div>
      </Box>
    </Box>
  )
}
