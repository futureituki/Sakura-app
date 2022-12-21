import { FC, useEffect, useState } from 'react'
import { BasicTabs } from '@/components/tab/TopTab'
import { getData } from '@/lib/bing-search'
import { GetImg } from '@/lib/img'
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
  console.log(name)
  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [])
  const url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBQDRkSqqgoG4rTk9czMdjhW0ElY39QqMo&cx=708d155ae7f0e495c&count=10&start=${offsetCount}&searchType=image&q=${name}`
  const Setting = async () => {
    const data = await getData(url)
    setData(data.data.items)
  }
  console.log(offsetCount)
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
