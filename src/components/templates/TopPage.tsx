import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { BasicTabs } from '../tab/BasicTabs'
import { accessKey, webEndpoint } from '@/constant/url'
import { getData } from '@/lib/bing-search'
import { NewsObj } from '@/types/news'
import { User } from '@/types/user'
type Props = {
  blogs: NewsObj[]
}
export const TopPage: FC<Props> = ({ blogs }) => {
  console.log(blogs)
  const [data, setData] = useState([])
  const [offsetCount, setOffsetCount] = useState(10)
  const user = useSelector((state: any) => state.user.user as User)
  const accessKey = '3f8aa7601e214f869f13df2cb3927744' // Azureで取得したkeyを指定してください
  const endpoint = 'https://api.bing.microsoft.com/v7.0/search'
  // const url = endpoint + `?count=0&responseFilter=Webpages&offset=${offsetCount}&safeSearch=Strict&q=森田ひかる+もりたひかる+site:sakurazaka46.com`
  // const Setting = async() => {
  //   const data = await getData(url,accessKey)
  //   console.log(data)
  //   // setOffsetCount(offsetCount + 10)
  //   setData(data.webPages.value)
  // }
  // const prevSet = async() => {
  //   const data = await getData(url,accessKey)
  //   setOffsetCount(offsetCount - 10)
  //   setData(data.value)
  // }
  // const nextSet = async() => {
  //   const data = await getData(url,accessKey)
  //   setOffsetCount(offsetCount + 10)
  //   setData(data.value)
  // }
  return (
    <div>
      <div>
        <BasicTabs news={blogs} imageList={data} />
        {/* <div>
          {data.map((image,index) => (
            <div>
              {index}
              <img src={image.contentUrl} alt=""  width={200} height={250}/>
            </div>
          ))}
          <button onClick={prevSet}>前へ</button>
          <button onClick={Setting}>画像取得</button>
          <button onClick={nextSet}>次へ</button>
        </div> */}
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
      {/* <button onClick={Setting}>検索する</button> */}
    </div>
  )
}
