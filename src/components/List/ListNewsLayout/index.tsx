import { Box } from '@mui/material'
import Link from 'next/link'
import { FC } from 'react'
import { SearchObj } from '@/types/search'

// 例 newsobjの型をweb searchにする
type List = {
  data: SearchObj[]
}
export const ListNewsLayout: FC<List> = ({ data }) => {
  console.log(data)
  return (
    <Box>
      <ul>
        {data.map((list: SearchObj, index) => (
          <li key={index}>
            <Link href={list.formattedUrl} target={'_blank'}>
              {list.title}
              {list.pagemap.hproduct?.[0].fn}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  )
}
