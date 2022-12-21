import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { InductionButtons } from '../molecules/InductionButtons'
import { DotSwiper } from '../swiper/dotSwiper'
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
  const [offsetCount, setOffsetCount] = useState(0)
  const user = GetUser().user.first_favorite as Favorite
  const router = useRouter()
  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [])
  const url =
    customSearchEndpoint +
    `?key=${process.env.NEXT_PUBLIC_CUSTOM_API_KEY}&cx=${process.env.NEXT_PUBLIC_CUSTOM_ID}&count=10&start=${offsetCount}&searchType=image&q=${name}`
  const Setting = async () => {
    const data = await getData(url)
    setData(data.data.items)
  }
  const prevSet = async () => {
    if (offsetCount == 0) return
    setOffsetCount(offsetCount - 10)
    console.log('test')
    const data = await getData(url)
    setData(data.data.items)
  }
  const nextSet = async () => {
    setOffsetCount(offsetCount + 10)
    const data = await getData(url)
    setData(data.data.items)
  }
  const logoutCheck = async () => {
    await dispatch(userLogout())
    router.push('/logout')
  }
  return (
    <div>
      <div>
        <BasicTabs
          name={name as string}
          imageList={data as Array<GalleryObj>}
          onClick={Setting}
          prev={prevSet}
          next={nextSet}
        />
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
      <InductionButtons logoutHandle={logoutCheck} handle={() => console.log('push')} />
    </div>
  )
}
