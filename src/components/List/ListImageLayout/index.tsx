import { Box } from '@mui/material'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import styles from '@/components/List/ListImageLayout/index.module.css'
import { LikeButton } from '@/components/atoms/Button/LikeButton'
import { Heading } from '@/components/atoms/Heading'
import { GetUser } from '@/lib/user'
import { favoriteImgSave } from '@/redux/imageSlice'
import { GalleryObj } from '@/types/gallery'

// 例 newsobjの型をweb searchにする
type Gallery = {
  data: Array<GalleryObj>
  name: string
}
export const ListImageLayout: FC<Gallery> = ({ data, name }) => {
  const dispatch = useDispatch<any>()
  const uid = GetUser().user.uid
  const save = async (uid: string, src: string) => {
    await dispatch(favoriteImgSave({ uid, src }))
  }
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
            <button onClick={() => save(uid, image.contentUrl)}>
              <LikeButton />
            </button>
          </li>
        ))}
      </ul>
    </Box>
  )
}
