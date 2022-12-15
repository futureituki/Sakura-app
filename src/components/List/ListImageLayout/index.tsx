import { Box } from '@mui/material'
import { FC } from 'react'
import ContentLoader from 'react-content-loader'
import styles from '@/components/List/ListImageLayout/index.module.css'
import { Heading } from '@/components/atoms/Heading'
import { GalleryObj } from '@/types/gallery'

// 例 newsobjの型をweb searchにする
type Gallery = {
  data: Array<GalleryObj>
  name: string
}
export const ListImageLayout: FC<Gallery> = ({ data, name }) => {
  return (
    <Box
      sx={{
        width: '90vw',
        margin: '40px auto',
      }}
    >
      <Heading style={{ color: '#000' }}>Gallery</Heading>
      <p>{name}</p>
      <ul className={styles.image}>
        {data.map((image: GalleryObj, index: number) => (
          <li key={index}>
            <img src={image.contentUrl} alt={''} width={300} height={250} />
          </li>
        ))}
      </ul>
    </Box>
  )
}
