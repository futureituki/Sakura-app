import { Container, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SwiperSlide } from 'swiper/react'
import { TextLabel } from '../atoms/Label/TextLabel/TextLabel'
import { TitleBar } from '../atoms/TitleBar'
import { SwiperInfinitLoop } from '../swiper/infinitloopSwiper/SwiperInfinitLoop'
import styles from '@/styles/Mypage.module.css'
import { User } from '@/types/user'
export const MyPage = () => {
  const user = useSelector((state: any) => state.user.user as User)
  console.log(user)
  const router = useRouter()
  // useEffect(() => {
  //   if (user.uid === '') {
  //     router.push('/login')
  //   }
  // }, [])
  return (
    <div>
      <TitleBar>MyPage</TitleBar>
      <Image
        src='/assets/member/fujiyoshi_main_visual.jpeg'
        alt='image'
        width={300}
        height={400}
        style={{ width: '100%', height: '100%' }}
      />
      <div className={styles.user_area}>aaa</div>
      <div className={styles.swiper_container}>
        <SwiperInfinitLoop>
          <SwiperSlide style={{ width: '56%' }}>
            <div className={styles.member_box}>
              <Image
                height={110}
                width={100}
                src={'/assets/member/fujiyoshi_main_visual.jpeg'}
                alt={'の画像'}
                className={styles.member_img}
              />
              <div className={styles.member_information}>
                <TextLabel color='#ff69b8'>推しメン</TextLabel>
                <Typography fontSize={14}>藤吉夏鈴</Typography>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ width: '56%' }}>
            <div className={styles.member_box}>
              <Image
                height={110}
                width={100}
                src={'/assets/member/fujiyoshi_main_visual.jpeg'}
                alt={'の画像'}
                className={styles.member_img}
              />
              <div className={styles.member_information}>
                <TextLabel color='#ccc'>気になる</TextLabel>
                <Typography fontSize={14}>藤吉夏鈴</Typography>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ width: '56%' }}>
            <div className={styles.member_box}>
              <Image
                height={110}
                width={100}
                src={'/assets/member/fujiyoshi_main_visual.jpeg'}
                alt={'の画像'}
                className={styles.member_img}
              />
              <div className={styles.member_information}>
                <TextLabel color='#ff69b8'>推しメン</TextLabel>
                <Typography fontSize={14}>藤吉夏鈴</Typography>
              </div>
            </div>
          </SwiperSlide>
        </SwiperInfinitLoop>
      </div>
    </div>
  )
}
