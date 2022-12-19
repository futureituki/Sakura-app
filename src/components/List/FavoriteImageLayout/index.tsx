import { Box } from '@mui/material'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import styles from '@/components/List/FavoriteImageLayout/index.module.css'
import { LikedButton } from '@/components/atoms/Button/LikeButton'
import { GetImg } from '@/lib/img'
import { GetUser } from '@/lib/user'
import { favoriteImgDelete, favoriteImgSave } from '@/redux/imageSlice'
import { GalleryObj } from '@/types/gallery'
export const FavoriteImageLayout = () => {
  const srcs = GetImg().images.src
  const dispatch = useDispatch<any>()
  const uid = GetUser().user.uid
  console.log(srcs)
  const save = async (uid: string, src: string) => {
    await dispatch(favoriteImgSave({ uid, src, srcs }))
  }
  const Delete = async (uid: string, src: string) => {
    await dispatch(favoriteImgDelete({ uid, src, srcs }))
  }
  return (
    <Box>
      <ul>
        {srcs.map((src: string, index: number) => (
          <li className={styles.li} key={index}>
            {/* <Image src={src} alt="" width={300} height={300} style={{width:"100%",height:"100%"}}/> */}
            <img src={src} alt='' />
            <button onClick={() => Delete(uid, src)} className={styles.button}>
              <LikedButton />
            </button>
          </li>
        ))}
      </ul>
    </Box>
  )
}
