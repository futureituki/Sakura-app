import { FC, useEffect, useState } from 'react'
import { BasicTabs } from '@/components/tab/TopTab'
import { customSearchEndpoint } from '@/constant/url'
import { getData } from '@/lib/bing-search'
import { GetUser } from '@/lib/user'
import { GalleryObj } from '@/types/gallery'
import { SearchObj } from '@/types/search'
type Props = {
  searchs: SearchObj[]
}
type Favorite = {
  name: string
  src: string
}
export const TopPage: FC<Props> = ({ searchs }) => {
  const [data, setData] = useState<Array<GalleryObj>>()
  const [name, setName] = useState<string>()
  const [offsetCount, setOffsetCount] = useState(0)
  const user = GetUser().user.first_favorite as Favorite
  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [])
  const url = customSearchEndpoint + `?key=${process.env.NEXT_PUBLIC_API_KEY}&cx=${process.env.NEXT_PUBLIC_CUSTOM_ID}&count=10&start=${offsetCount}&searchType=image&q=${name}`
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
  return (
    <div>
      <div>
        <BasicTabs
          name={name as string}
          searchResult={searchs}
          imageList={data as Array<GalleryObj>}
          onClick={Setting}
          prev={prevSet}
          next={nextSet}
        />
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
    </div>
  )
}
