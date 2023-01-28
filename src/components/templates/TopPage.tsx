import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { InductionButtons } from '../molecules/InductionButtons'
import { ListNewsLayout } from '@/components/List/ListNewsLayout'
import { TransitionsPopper } from '@/components/popup'
import { DotSwiper } from '@/components/swiper/dotSwiper'
import { TutorialSwiper } from '@/components/swiper/tutorialSwiper'
import { BasicTabs } from '@/components/tab/TopTab'
import { sliderVideoSrc } from '@/constant/sliderSrc'
import { GetUser } from '@/lib/user'
import { userLogout } from '@/redux/userSlice'
import { SearchObj } from '@/types/search'
type Props = {
  searchs: SearchObj[]
}

type SwiperProps = typeof sliderVideoSrc

type Favorite = {
  name: string
  src: string
}
export const TopPage: FC<Props> = ({ searchs }) => {
  const dispatch = useDispatch<any>()
  const [name, setName] = useState<string>()

  const user = GetUser().user.first_favorite as Favorite
  const users = GetUser().user
  const router = useRouter()
  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [])

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
        >
          <h2>Video</h2>
        </Box>
        <DotSwiper data={sliderVideoSrc as SwiperProps} />
        <ListNewsLayout data={searchs} />
      </div>
      <InductionButtons logoutHandle={logoutCheck} handle={() => router.push('/mypage')} />
    </div>
  )
}
