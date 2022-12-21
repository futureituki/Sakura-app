import { Box } from '@mui/material'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import styles from '@/components/List/ListBlogLayout/index.module.css'
import { customSearchEndpoint } from '@/constant/url'
import { getData } from '@/lib/bing-search'
import { BlogObj } from '@/types/blog'

export const ListBlogLayout = () => {
  const [blogs, setBlogs] = useState<BlogObj[]>()
  useEffect(() => {
    const getBlogs = async () => {
      const url =
        customSearchEndpoint +
        `?key=${process.env.NEXT_PUBLIC_CUSTOM_API_KEY}&cx=${process.env.NEXT_PUBLIC_CUSTOM_ID}&sort=date&dateRestrict=m5&q=藤吉 夏鈴公式ブログ`
      const result: BlogObj[] = await getData(url).then((data) => data.data.items)
      console.log(result)
      setBlogs(result)
    }
    getBlogs()
  }, [])
  return (
    <Box
      sx={{
        width: '90vw',
        margin: '0 auto',
      }}
    >
      <ul className={styles.ul}>
        {blogs?.map((list: BlogObj, index: number) => (
          <li key={index} className={styles.blog}>
            {list.pagemap.hproduct ? (
              <Link href={list.formattedUrl} target={'_blank'}>
                {list.pagemap.hproduct ? (
                  <img
                    src={list.pagemap.hproduct[0].photo}
                    alt=''
                    width={300}
                    height={300}
                    style={{ width: '85vw', margin: '0 auto', height: '100%' }}
                  />
                ) : (
                  ''
                )}
                <p className={styles.snippet}>
                  {list.snippet.substring(list.snippet.indexOf('...') + 3)}
                </p>
              </Link>
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
    </Box>
  )
}
