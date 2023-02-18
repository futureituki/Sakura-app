import { Box, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ListNewsLayout } from '@/components/List/ListNewsLayout'
import { PrimaryButton } from '@/components/atoms/Button'
import { LargeProgress } from '@/components/atoms/Loading/progress'
import { InductionButtons } from '@/components/molecules/InductionButtons'
import { TransitionsPopper } from '@/components/popup'
import { DotSwiper } from '@/components/swiper/dotSwiper'
import { TutorialSwiper } from '@/components/swiper/tutorialSwiper'
import { BasicTabs } from '@/components/tab/TopTab'
import { sliderVideoSrc } from '@/constant/sliderSrc'
import useLoginApi from '@/lib/hook/useLoginApi'
import { useGetUser } from '@/lib/user'
import { userLogout } from '@/redux/userSlice'
type SwiperProps = typeof sliderVideoSrc

type Favorite = {
  name: string
  src: string
}
export const TopPage = () => {
  const dispatch = useDispatch<any>()
  const [name, setName] = useState<string>()
  const user = useGetUser().user.first_favorite as Favorite
  const users = useGetUser().user
  const router = useRouter()
  if (user.name === '') router.push('/favorite')
  console.log(user)
  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [])
  const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi()
  if (!loginData) return <LargeProgress />
  const spotify_button = async () => {
    await axios.post('/api/auth/authorize')
    router.push('/discography')
  }
  const logoutCheck = async () => {
    await dispatch(userLogout())
    router.push('/login')
  }
  return (
    <div>
      {router.query.first_come ? (
        <TransitionsPopper>
          <TutorialSwiper />
        </TransitionsPopper>
      ) : (
        ''
      )}
      <div>
        <BasicTabs name={name as string} />
        <Box
          sx={{
            fontSize: '3vw',
            display: 'grid',
            placeItems: 'center',
            padding: '20px 0',
          }}
          component='div'
        >
          <h2>Video</h2>
        </Box>
        <DotSwiper data={sliderVideoSrc as SwiperProps} />
        <ListNewsLayout />
      </div>
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          margin: '20px 0',
        }}
        component='div'
      >
        <Typography sx={{ margin: '20px 0', fontSize: '2rem' }}>
          櫻坂46の楽曲をもっと知ろう
        </Typography>
        <PrimaryButton
          variant='contained'
          label='discography'
          color='#fff'
          background='#1BD760'
          onClick={() => spotify_button()}
        >
          with Discography
        </PrimaryButton>
        {/* )} */}
      </Box>
      <Box
        sx={{
          margin: '60px 0 40px 0',
        }}
        component='div'
      >
        <InductionButtons logoutHandle={logoutCheck} handle={() => router.push('/mypage')} />
      </Box>
    </div>
  )
}
