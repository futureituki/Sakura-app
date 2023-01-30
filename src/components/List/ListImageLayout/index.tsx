import { LoadingButton } from '@mui/lab'
import { Box, InputLabel, MenuItem, FormControl, Select, CircularProgress } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'
import styles from '@/components/List/ListImageLayout/index.module.css'
import { PrimaryButton } from '@/components/atoms/Button'
import { LikeButton, LikedButton } from '@/components/atoms/Button/LikeButton'
import { Heading } from '@/components/atoms/Heading'
import { customSearchEndpoint } from '@/constant/url'
import { Getfetcher } from '@/lib/bing-search'
import { useGetImg } from '@/lib/img'
import { useGetUser } from '@/lib/user'
import { favoriteImgDelete, favoriteImgSave } from '@/redux/imageSlice'
import { GalleryObj } from '@/types/gallery'
import { LargeProgress } from '@/components/atoms/Loading/progress'

// 例 newsobjの型をweb searchにする

type Favorite = {
  name: string
  src: string
}
export const ListImageLayout = () => {
  const user = useGetUser().user
  const unionFavorite = user.favorite.concat(user.first_favorite)
  const dispatch = useDispatch<any>()
  const srcs = useGetImg().images.src
  const [name, setName] = useState<string>(user.first_favorite.name)
  const [offsetCount, setOffsetCount] = useState<number>(
    1 + Math.floor(Math.random() * Math.random()),
  )
  const url =
    customSearchEndpoint +
    `?key=${process.env.NEXT_PUBLIC_CUSTOM_API_KEY}&cx=${process.env.NEXT_PUBLIC_CUSTOM_ID}&count=10&start=${offsetCount}&searchType=image&q=${name}`
  const { data, error }: { data: GalleryObj[]; error: any } = useSWR(url, Getfetcher)
  if (error)
    return (
      <div>
        今日のブログ配信は終了しました<br></br>また明日の16時にアクセスしてください。
      </div>
    )
  if (!data) return <LargeProgress />

  const handleChange = (event: any) => {
    setName(event.target.value as string)
  }

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
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>メンバー選択</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={name}
          label='Age'
          onChange={handleChange}
        >
          {unionFavorite.map((member: Favorite, index: number) => (
            <MenuItem value={member.name} key={index}>
              {member.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ul className={styles.image}>
        {data?.map((image: GalleryObj, index: number) => (
          <li key={index} className={styles.li}>
            <Image
              src={image.link}
              alt={''}
              width={image.image.width / 4}
              height={image.image.height / 4}
              unoptimized
            />
            {!srcs.includes(image.link) ? (
              <button onClick={() => save(user.uid, image.link)} className={styles.button}>
                <LikeButton />
              </button>
            ) : (
              <button onClick={() => Delete(user.uid, image.link)} className={styles.button}>
                <LikedButton />
              </button>
            )}
          </li>
        ))}
      </ul>
      {data ? (
        <>
          <PrimaryButton
            label='get'
            onClick={() => setOffsetCount(1 + Math.floor(Math.random() * 100))}
            color='#fff'
            background='#ff69b8'
            variant='contained'
          >
            次へ
          </PrimaryButton>
        </>
      ) : (
        ''
      )}
    </Box>
  )
}
