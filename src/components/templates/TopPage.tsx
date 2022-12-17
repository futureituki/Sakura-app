import Image from 'next/image'
import Link from 'next/link'
import { FC, Key, ReactPortal, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BasicTabs } from '../tab/BasicTabs'
import { accessKey, imagesEndpoint, webEndpoint } from '@/constant/url'
import { getData } from '@/lib/bing-search'
import { GetUser } from '@/lib/user'
import { NewsObj } from '@/types/news'
import { User } from '@/types/user'
type Props = {
  blogs: NewsObj[]
}
type Favorite = {
  name: string
  src: string
}
export const TopPage: FC<Props> = ({ blogs }) => {
  const [data, setData] = useState([])
  const [name, setName] = useState<string>()
  const [offsetCount, setOffsetCount] = useState(10)
  const user = GetUser().user.first_favorite as Favorite
  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [])
  const url =
    imagesEndpoint +
    `?count=10&responseFilter=Webpages&offset=${offsetCount}&safeSearch=Strict&q=${name}+site:sakurazaka46.com`
  const Setting = async () => {
    const data = await getData(url, accessKey)
    // setOffsetCount(offsetCount + 10)
    setData(data.value)
  }
  const prevSet = async () => {
    const data = await getData(url, accessKey)
    setOffsetCount(offsetCount - 10)
    setData(data.value)
  }
  const nextSet = async () => {
    const data = await getData(url, accessKey)
    setOffsetCount(offsetCount + 10)
    setData(data.value)
  }
  return (
    <div>
      <div>
        <BasicTabs
          name={name as string}
          news={blogs}
          imageList={data}
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
