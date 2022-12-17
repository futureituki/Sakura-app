import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BasicTabs } from '../tab/BasicTabs'
import { getData } from '@/lib/bing-search'
import { GetUser } from '@/lib/user'
import { GalleryObj } from '@/types/gallery'
import { SearchObj } from '@/types/search'
import { User } from '@/types/user'
import { GetImg } from '@/lib/img'
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
  const [offsetCount, setOffsetCount] = useState(10)
  const user = GetUser().user.first_favorite as Favorite
  const images = GetImg().images.src
  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [])
  const url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBQDRkSqqgoG4rTk9czMdjhW0ElY39QqMo&cx=708d155ae7f0e495c&searchType=image&q=${name}`
  const Setting = async () => {
    const data = await getData(url)
    setOffsetCount(offsetCount + 10)
    setData(data.data.items)
  }
  const prevSet = async () => {
    const data = await getData(url)
    setOffsetCount(offsetCount - 10)
    setData(data.data.items)
  }
  const nextSet = async () => {
    const data = await getData(url)
    setOffsetCount(offsetCount + 10)
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
        {images.map((img:string,index:number) => (
          <img key={index} src={img}/>
        ))}
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
