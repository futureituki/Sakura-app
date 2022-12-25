import { Alert } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { InductionButtons } from '../molecules/InductionButtons'
import { TransitionsPopper } from '../popup'
import { DotSwiper } from '../swiper/dotSwiper'
import { TutorialSwiper } from '../swiper/tutorialSwiper'
import { ListNewsLayout } from '@/components/List/ListNewsLayout'
import { BasicTabs } from '@/components/tab/TopTab'
import { sliderSrc, sliderVideoSrc } from '@/constant/sliderSrc'
import { customSearchEndpoint } from '@/constant/url'
import { getData } from '@/lib/bing-search'
import { GetUser } from '@/lib/user'
import { userLogout } from '@/redux/userSlice'
import { GalleryObj } from '@/types/gallery'
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
  const [data, setData] = useState<Array<GalleryObj>>()
  const [name, setName] = useState<string>()
  const [offsetCount, setOffsetCount] = useState(1 + Math.floor(Math.random() * 10))
  const user = GetUser().user.first_favorite as Favorite
  const router = useRouter()
  console.log(router)
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
