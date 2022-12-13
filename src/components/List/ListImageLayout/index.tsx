import { Box } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'
import { GalleryObj } from '@/types/gallery'

// 例 newsobjの型をweb searchにする
type Gallery = {
  data: Array<GalleryObj>
}
export const ListImageLayout: FC<Gallery> = ({ data }) => {
  return (
    <Box>
      <ul>
        {data.map((image: GalleryObj, index: number) => (
          <li key={index}>
            <Image src={image.contentUrl} alt={''} width={300} height={250} />
          </li>
        ))}
      </ul>
    </Box>
  )
}
