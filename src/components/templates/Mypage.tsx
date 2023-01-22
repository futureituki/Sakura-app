import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SwiperSlide } from 'swiper/react'
import { TextLabel } from '../atoms/Label/TextLabel/TextLabel'
import { TitleBar } from '../atoms/TitleBar'
import { InductionButtons } from '../molecules/InductionButtons'
import { SwiperInfinitLoop } from '../swiper/infinitloopSwiper/SwiperInfinitLoop'
import { GetUser } from '@/lib/user'
import { userLogout } from '@/redux/userSlice'
import styles from '@/styles/Mypage.module.css'
import { UserReducer } from '@/types/user'

type User = {
  uid: string
  username: string
  first_favorite: {
    name: string
    src: string
  }
}
type Favorite = {
  name: string
  src: string
}
export const MyPage = () => {
  const router = useRouter()
  const dispatch = useDispatch<any>()
  const user: UserReducer = GetUser().user

  // useEffect(() => {
  //   if (user.uid === '') {
  //     router.push('/login')
  //   }
  // }, [])
  const logoutCheck = async () => {
    await dispatch(userLogout())
    router.push('/logout')
  }
  return (
    <div>
      <TitleBar>MyPage</TitleBar>
      <Box
        sx={{
          '@media screen and (min-width:960px)': {
            width: '960px',
            margin: '40px auto',
          },
        }}
      >
        <Box
          sx={{
            '@media screen and (min-width:960px)': {
              width: '50%',
              height: '50%',
              margin: '40px auto',
            },
          }}
        >
          <Image
            src={`/assets/member_list/${
              user.first_favorite.src.substring(0, user.first_favorite.src.indexOf('_')) + '.jpeg'
            }`}
            alt='image'
            width={300}
            height={400}
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
        <p>{user.first_favorite.name}</p>
        <div className={styles.user_area}>{user.username}</div>
        <Box
          sx={{
            margin: '40px 0',
            background: '#f2f2f2',
          }}
        >
          <SwiperInfinitLoop>
            <SwiperSlide style={{ width: '56%' }}>
              <Link href='/change_oshimen'>
                <div className={styles.member_box}>
                  <Image
                    height={110}
                    width={100}
                    src={`/assets/member/${user.first_favorite.src}`}
                    alt={'の画像'}
                    className={styles.member_img}
                  />
                  <div className={styles.member_information}>
                    <TextLabel color='#ff69b8'>推しメン</TextLabel>
                    <Typography fontSize={14}>{user.first_favorite.name}</Typography>
                  </div>
                  <Link href={`/blog/${user.first_favorite.name}`}>Blog</Link>
                </div>
              </Link>
            </SwiperSlide>
            {user.favorite
              ? user.favorite.map((member: Favorite, index: number) => (
                  <SwiperSlide style={{ width: '56%' }} key={index}>
                    <Link href='/change_oshimen'>
                      <div className={styles.member_box}>
                        <Image
                          height={110}
                          width={100}
                          src={`/assets/member/${member.src}`}
                          alt={'の画像'}
                          className={styles.member_img}
                        />
                        <div className={styles.member_information}>
                          <TextLabel color='#ccc'>気になる</TextLabel>
                          <Typography fontSize={14}>{member.name}</Typography>
                        </div>
                        <Link href={`/blog/${member.name}`}>Blog</Link>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              : ''}
          </SwiperInfinitLoop>
        </Box>
      </Box>
      <InductionButtons logoutHandle={logoutCheck} handle={() => console.log('push')} />
    </div>
  )
}
