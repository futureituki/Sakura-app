import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { InductionButtons } from '../molecules/InductionButtons'
import { TransitionsPopper } from '../popup'
import { ListNewsLayout } from '@/components/List/ListNewsLayout'
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
  console.log(users)
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
        <DotSwiper data={sliderVideoSrc as SwiperProps} />
        <ListNewsLayout data={searchs} />
        {/* {data.map((news,index) => (
          <div>
            <img src={news.image?.thumbnail.contentUrl} alt="" />
            <p>
              {index}
              <Link href={news.url} target={"_blank"}>
                {news.snippet}
              </Link>
            </p>
          </div>
        ))} */}
      </div>
      <InductionButtons logoutHandle={logoutCheck} handle={() => router.push('/mypage')} />
    </div>
  )
}
