import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import styles from '@/components/List/ListBlogLayout/index.module.css'
import { PrimaryButton } from '@/components/atoms/Button'
import { memberSrcMap } from '@/constant/memberSrc'
import { customSearchEndpoint } from '@/constant/url'
import { getData } from '@/lib/bing-search'
import { BlogObj } from '@/types/blog'

export const ListBlogLayout = () => {
  const [blogs, setBlogs] = useState<BlogObj[]>()
  const [offsetCount, setOffsetCount] = useState<number>(0)
  let url =
    customSearchEndpoint +
    `?key=${process.env.NEXT_PUBLIC_CUSTOM_API_KEY}&cx=${process.env.NEXT_PUBLIC_CUSTOM_ID}&start=${offsetCount}&num=10&sort=date&dateRestrict=w1&q=ブログ`
  useEffect(() => {
    const getBlogs = async () => {
      const result: BlogObj[] = await getData(url).then((data) => data.data.items)
      console.log(result)
      setBlogs(result)
    }
    getBlogs()
  }, [])
  const nextSet = async () => {
    setOffsetCount(offsetCount + 11)
    const result: BlogObj[] = await getData(url).then((data) => data.data.items)
    console.log(result)
    setBlogs(result)
  }
  const prevSet = async () => {
    setOffsetCount(offsetCount - 11)
    const result: BlogObj[] = await getData(url).then((data) => data.data.items)
    setBlogs(result)
  }
  return (
    <Box
      sx={{
        width: '90vw',
        margin: '0 auto',
      }}
    >
      <ul className={styles.ul}>
        {blogs?.map((blog: BlogObj, index: number) => (
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
          onClick={prevSet}
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
        onClick={nextSet}
      >
        次のページへ
      </PrimaryButton>
    </Box>
  )
}
