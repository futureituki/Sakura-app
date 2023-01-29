import { Box, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import styles from '@/components/List/ListBlogLayout/index.module.css'
import { PrimaryButton } from '@/components/atoms/Button'
import { memberSrc, memberSrcMap } from '@/constant/memberSrc'
import { customSearchEndpoint } from '@/constant/url'
import { Getfetcher } from '@/lib/bing-search'
import { BlogObj } from '@/types/blog'
import { MemberObj, MemberSrc } from '@/types/constant/member'
export const BlogHomePage = () => {
  const [offsetCount, setOffsetCount] = useState<number>(0)
  const [name, setName] = useState<string>('')
  let url =
    customSearchEndpoint +
    `?key=${process.env.NEXT_PUBLIC_CUSTOM_API_KEY}&cx=${process.env.NEXT_PUBLIC_CUSTOM_ID}&start=${offsetCount}&num=10&sort=date&dateRestrict=m1&q=ブログ`
  let memberUrl =
    customSearchEndpoint +
    `?key=${process.env.NEXT_PUBLIC_CUSTOM_API_KEY}&cx=${process.env.NEXT_PUBLIC_CUSTOM_ID}&start=${offsetCount}&num=10&sort=date&dateRestrict=y2&q=${name}`
  const { data, error }: { data: BlogObj[]; error: any } = useSWR(
    name !== '' ? memberUrl : url,
    Getfetcher,
    {
      refreshInterval: 300,
    },
  )
  console.log(data)
  const handleChange = (event: any) => {
    setName(event.target.value)
  }
  // const handleChange = (e) => {
  //   setName(e.target.value)
  // }
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
        width: '80vw',
        margin: '0 auto',
        '@media screen and (min-width:900px)': {
          width: '94vw',
        },
      }}
    >
      <FormControl
        sx={{
          width: '300px',
        }}
      >
        <InputLabel id='blog-select'>メンバー選択</InputLabel>
        <Select
          labelId='blog-select-label'
          id='blog-select'
          value={name}
          label='メンバー選択'
          onChange={handleChange}
        >
          {memberSrc.map((member: MemberSrc, index: number) => (
            <MenuItem key={index} value={member.name}>
              {member.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <p>{name}関連のブログが表示されます</p>
      <Box
        sx={{
          '@media screen and (min-width:900px)': {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
          },
        }}
      >
        {data?.map((blog: BlogObj, index: number) => (
          <>
            {blog.pagemap.hproduct ? (
              <Box
                key={index}
                sx={{
                  borderTop: '1px solid #ccc',
                  borderBottom: '1px solid #ccc',
                  padding: '40px 0',
                  '@media screen and (min-width:900px)': {
                    borderTop: 'none',
                    borderBottom: 'none',
                    width: '18vw',
                    margin: '0',
                  },
                }}
              >
                <Link href={blog.formattedUrl} target={'_blank'} className={styles.link}>
                  {blog.pagemap.hproduct[0].photo.indexOf('jpg') !== -1 ? (
                    <Image
                      src={blog.pagemap.hproduct[0].photo}
                      alt=''
                      width={300}
                      height={300}
                      className={styles.blog_img}
                      unoptimized
                    />
                  ) : (
                    ''
                  )}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px',
                      justifyContent: 'center',
                      margin: '3vw 0',
                    }}
                  >
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
                        className={styles.icon}
                      />
                    ) : (
                      ''
                    )}
                    {/* <p>{blog.}</p> */}
                    <p className={styles.name}>
                      {
                        memberSrcMap?.get(
                          blog.title.replace(/ /g, '').slice(0, blog.title.indexOf('公式') - 1),
                        )?.name
                      }
                    </p>
                  </Box>
                  <p className={styles.snippet}>
                    {blog.snippet.substring(blog.snippet.indexOf('...') + 3)}
                  </p>
                </Link>
              </Box>
            ) : (
              ''
            )}
          </>
        ))}
      </Box>
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
