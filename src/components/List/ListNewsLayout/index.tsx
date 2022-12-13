import { Box } from '@mui/material'
import Link from 'next/link'
import { FC } from 'react'
import { NewsObj } from '@/types/news'

// 例 newsobjの型をweb searchにする
type List = {
  data: NewsObj[]
}
export const ListNewsLayout: FC<List> = ({ data }) => {
  console.log(data)
  return (
    <Box>
      <ul>
        {data.map((list: NewsObj, index) => (
          <li key={index}>
            <Link href={list.url} target={'_blank'}>
              {list.name !== '櫻坂46公式サイト' ? list.name : ''}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  )
}
