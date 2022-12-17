import { Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SwiperSlide } from 'swiper/react'
import { TextLabel } from '../atoms/Label/TextLabel/TextLabel'
import { TitleBar } from '../atoms/TitleBar'
import { InductionButtons } from '../molecules/InductionButtons'
import { SwiperInfinitLoop } from '../swiper/infinitloopSwiper/SwiperInfinitLoop'
import { logout } from '@/firebase/firestore'
import { GetUser } from '@/lib/user'
import styles from '@/styles/Mypage.module.css'
import { UserReducer } from '@/types/user'
import { userLogout } from '@/redux/userSlice'

type User = {
  uid: string
  username: string
  first_favorite: {
    name: string
    src: string
  }
}

export const MyPage = () => {
  const router = useRouter()
  const dispatch = useDispatch<any>()
  const user: UserReducer = GetUser().user
  let name = ''
  let src = ''
  if (user.first_favorite) {
    name = user.first_favorite.name
    src = user.first_favorite.src
  }
  useEffect(() => {
    if (user.uid === '') {
      router.push('/login')
    }
  }, [])
  const logoutCheck = async () => {
    await dispatch(userLogout())
    router.push('/logout')
  }
  return (
    <div>
      <TitleBar>MyPage</TitleBar>
      <Image
        src={`/assets/member/${src}`}
        alt='image'
        width={300}
        height={400}
        style={{ width: '100%', height: '100%' }}
      />
      <p>{name}</p>
      <div className={styles.user_area}>{user.username}</div>
      <div className={styles.swiper_container}>
        <SwiperInfinitLoop>
          <SwiperSlide style={{ width: '56%' }}>
            <div className={styles.member_box}>
              <Image
                height={110}
                width={100}
                src={`/assets/member/${src}`}
                alt={'の画像'}
                className={styles.member_img}
              />
              <div className={styles.member_information}>
                <TextLabel color='#ff69b8'>推しメン</TextLabel>
                <Typography fontSize={14}>{name}</Typography>
              </div>
            </div>
          </SwiperSlide>
          {/* {user.favorite.map((member,index) => (
            <SwiperSlide style={{ width: '56%' }}>
              <div className={styles.member_box}>
                <Image
                  height={110}
                  width={100}
                  // src={`${member['src' as any] ? member['src'] : '/no-image-person'}`}
                  src={`/no-image-person.jpeg`}
                  alt={'の画像'}
                  className={styles.member_img}
                />
                <div className={styles.member_information}>
                  <TextLabel color='#ccc'>気になる</TextLabel>
                  <Typography fontSize={14}>藤吉夏鈴</Typography>
                </div>
              </div>
            </SwiperSlide>
          ))} */}
          <SwiperSlide style={{ width: '56%' }}>
            <div className={styles.member_box}>
              <Image
                height={110}
                width={100}
                src={`/no-image-person.jpeg`}
                alt={'の画像'}
                className={styles.member_img}
              />
              <div className={styles.member_information}>
                <TextLabel color='#ccc'>気になる</TextLabel>
                <Typography fontSize={14}>藤吉夏鈴</Typography>
              </div>
            </div>
          </SwiperSlide>
        </SwiperInfinitLoop>
      </div>
      <InductionButtons logoutHandle={logoutCheck} handle={() => console.log('push')} />
    </div>
  )
}
