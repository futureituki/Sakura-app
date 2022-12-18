import { Box } from '@mui/material'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import styles from '@/components/List/ListImageLayout/index.module.css'
import { LikeButton, LikedButton } from '@/components/atoms/Button/LikeButton'
import { Heading } from '@/components/atoms/Heading'
import { GetImg } from '@/lib/img'
import { GetUser } from '@/lib/user'
import { favoriteImgDelete, favoriteImgSave } from '@/redux/imageSlice'
import { GalleryObj } from '@/types/gallery'

// 例 newsobjの型をweb searchにする
type Gallery = {
  data: Array<GalleryObj>
  name: string
}
export const ListImageLayout: FC<Gallery> = ({ data, name }) => {
  const dispatch = useDispatch<any>()
  const uid = GetUser().user.uid
  const srcs = GetImg().images.src
  const save = async (uid: string, src: string) => {
    await dispatch(favoriteImgSave({ uid, src, srcs }))
  }
  const Delete = async (uid: string, src: string) => {
    await dispatch(favoriteImgDelete({ uid, src, srcs }))
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
        {data
          ? data.map((image: GalleryObj, index: number) => (
              <li key={index} className={styles.li}>
                <img
                  src={image.link}
                  alt={''}
                  width={image.image.width / 4}
                  height={image.image.height / 4}
                />
                {!srcs.includes(image.link) ? (
                  <button onClick={() => save(uid, image.link)} className={styles.button}>
                    <LikeButton />
                  </button>
                ) : (
                  <button onClick={() => Delete(uid, image.link)} className={styles.button}>
                    <LikedButton />
                  </button>
                )}
              </li>
            ))
          : ''}
      </ul>
    </Box>
  )
}
