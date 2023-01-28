import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from '@/components/List/ListNewsLayout/index.module.css'
import { Heading } from '@/components/atoms/Heading'
import { SearchObj } from '@/types/search'

// 例 newsobjの型をweb searchにする
type List = {
  data: SearchObj[]
}
export const ListNewsLayout: FC<List> = ({ data }) => {
  return (
    <Box
      sx={{
        width: '95vw',
        margin: '20px auto',
      }}
    >
      <Heading style={{ color: '#000' }}>NEWS</Heading>
      <Box
        sx={{
          width: '90vw',
          margin: '20px auto',
        }}
      >
        <ul>
          {data.map((list: SearchObj, index: number) => (
            <li key={index} className={styles.news_title}>
              {list.title.indexOf('日向坂') ? (
                <Link href={list.formattedUrl} target={'_blank'}>
                  {list.title}
                </Link>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  )
}
