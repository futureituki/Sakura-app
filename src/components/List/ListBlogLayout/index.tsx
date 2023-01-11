import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import styles from '@/components/List/ListBlogLayout/index.module.css'
import { PrimaryButton } from '@/components/atoms/Button'
import { memberSrcMap } from '@/constant/memberSrc'
import { customSearchEndpoint } from '@/constant/url'
import { Getfetcher } from '@/lib/bing-search'
import { BlogObj } from '@/types/blog'

export const ListBlogLayout = () => {
  const [offsetCount, setOffsetCount] = useState<number>(0)
  const url =
    customSearchEndpoint +
    `?key=${process.env.NEXT_PUBLIC_CUSTOM_API_KEY}&cx=${process.env.NEXT_PUBLIC_CUSTOM_ID}&start=${offsetCount}&num=10&sort=date&dateRestrict=m1&q=ブログ`
  const { data, error }: { data: BlogObj[]; error: any } = useSWR(url, Getfetcher)
  if (error)
    return (
      <div>
        今日のブログ配信は終了しました<br></br>また明日の16時にアクセスしてください。
      </div>
    )
  if (!data) return <div>loading...</div>

  return (
    <Box
      sx={{
        width: '90vw',
        margin: '0 auto',
      }}
    >
      <ul className={styles.ul}>
        {data?.map((blog: BlogObj, index: number) => (
          <li key={index} className={styles.blog}>
            {blog.pagemap.hproduct ? (
              <Link href={blog.formattedUrl} target={'_blank'}>
                {blog.pagemap.hproduct[0].photo.indexOf('jpg') !== -1 ? (
                  <Image
                    src={blog.pagemap.hproduct[0].photo}
                    alt=''
                    width={300}
                    height={300}
                    style={{ width: '85vw', margin: '0 auto', height: '100%' }}
                  />
                ) : (
                  ''
                )}
                {blog.pagemap.hproduct[0].photo ? (
                  <Image
                    src={
                      ('/assets/member/' +
                        memberSrcMap?.get(
                          blog.title.replace(/ /g, '').slice(0, blog.title.indexOf('公式') - 1),
                        )?.src) as string
                    }
                    alt='blog'
                    width={100}
                    height={100}
                    style={{ borderRadius: '50%', width: '20vw', height: '20vw' }}
                  />
                ) : (
                  ''
                )}
                <p className={styles.snippet}>
                  {blog.snippet.substring(blog.snippet.indexOf('...') + 3)}
                </p>
              </Link>
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
      {offsetCount != 0 ? (
        <PrimaryButton
          label='prevbutton'
          color='#fff'
          background='#ff69b8'
          variant='contained'
          onClick={() => setOffsetCount(offsetCount - 11)}
        >
          前のページへ
        </PrimaryButton>
      ) : (
        ''
      )}
      <PrimaryButton
        label='nextbutton'
        color='#fff'
        background='#ff69b8'
        variant='contained'
        onClick={() => setOffsetCount(offsetCount + 11)}
      >
        次のページへ
      </PrimaryButton>
    </Box>
  )
}
