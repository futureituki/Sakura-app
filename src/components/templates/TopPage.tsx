import { Box } from '@mui/material'
import axios from 'axios'
import { FontLoaderManifestPlugin } from 'next/dist/build/webpack/plugins/font-loader-manifest-plugin'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { PrimaryButton } from '../atoms/Button'
import { LargeProgress } from '../atoms/Loading/progress'
import { InductionButtons } from '../molecules/InductionButtons'
import { ListNewsLayout } from '@/components/List/ListNewsLayout'
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
    router.push('/logout')
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
      <InductionButtons logoutHandle={logoutCheck} handle={() => router.push('/mypage')} />
      <Box sx={{}} component='div'>
        {/* {loginData.access_token !== undefined ? (
            <PrimaryButton
                    variant='contained'
                    label='discography'
                    color='#fff'
                    background='#1BD760'
                    onClick={() => router.push('/discography')}
                  >
                    Discography
                  </PrimaryButton>
        ) : ( */}
        <PrimaryButton
          variant='contained'
          label='discography'
          color='#fff'
          background='#1BD760'
          onClick={spotify_button}
        >
          with Discography
        </PrimaryButton>
        {/* )} */}
      </Box>
    </div>
  )
}
