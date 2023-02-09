import { Box } from '@mui/material'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import styles from '@/components/List/FavoriteImageLayout/index.module.css'
import { LikedButton } from '@/components/atoms/Button/LikeButton'
import { useGetImg } from '@/lib/img'
import { useGetUser } from '@/lib/user'
import { favoriteImgDelete, favoriteImgSave } from '@/redux/imageSlice'
import { GalleryObj } from '@/types/gallery'
export const FavoriteImageLayout = () => {
  const srcs = useGetImg().images.src
  const dispatch = useDispatch<any>()
  const uid = useGetUser().user.uid

  const save = async (uid: string, src: string) => {
    await dispatch(favoriteImgSave({ uid, src, srcs }))
  }
  const Delete = async (uid: string, src: string) => {
    await dispatch(favoriteImgDelete({ uid, src, srcs }))
  }
  return (
    <Box component='div'>
      <ul className={styles.ul}>
        {srcs.map((src: string, index: number) => (
          <li className={styles.li} key={index}>
            <Image
              src={src}
              alt=''
              width={300}
              height={300}
              style={{ width: '100%', height: '100%' }}
            />
            <button onClick={() => Delete(uid, src)} className={styles.button}>
              <LikedButton />
            </button>
          </li>
        ))}
      </ul>
    </Box>
  )
}
