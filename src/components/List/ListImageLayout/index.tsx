import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import { useRouter } from 'next/router'
import { ChangeEvent, EventHandler, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from '@/components/List/ListImageLayout/index.module.css'
import { PrimaryButton } from '@/components/atoms/Button'
import { LikeButton, LikedButton } from '@/components/atoms/Button/LikeButton'
import { Heading } from '@/components/atoms/Heading'
import { customSearchEndpoint } from '@/constant/url'
import { getData } from '@/lib/bing-search'
import { GetImg } from '@/lib/img'
import { GetUser } from '@/lib/user'
import { favoriteImgDelete, favoriteImgSave } from '@/redux/imageSlice'
import { GalleryObj } from '@/types/gallery'

// 例 newsobjの型をweb searchにする

type Favorite = {
  name: string
  src: string
}
export const ListImageLayout = () => {
  const user = GetUser().user
  const [data, setData] = useState<Array<GalleryObj>>()
  const [name, setName] = useState<string>(user.first_favorite.name)
  const [offsetCount, setOffsetCount] = useState(1 + Math.floor(Math.random() * 10))
  const unionFavorite = user.favorite.concat(user.first_favorite)
  const dispatch = useDispatch<any>()
  const srcs = GetImg().images.src
  const router = useRouter()
  const url =
    customSearchEndpoint +
    `?key=${process.env.NEXT_PUBLIC_CUSTOM_API_KEY}&cx=${process.env.NEXT_PUBLIC_CUSTOM_ID}&count=10&start=${offsetCount}&searchType=image&q=${name}`
  useEffect(() => {
    const getImage = async () => {
      const data = await getData(url)
      setData(data.data.items)
    }
    getImage()
  }, [name])
  const handleChange = (event: any) => {
    setName(event.target.value as string)
  }
  const prevSet = async () => {
    if (offsetCount == 0) return
    setOffsetCount(offsetCount - 10)
    const data = await getData(url)
    setData(data.data.items)
  }
  const nextSet = async () => {
    setOffsetCount(1 + Math.floor(Math.random() * 100))
    const data = await getData(url)
    setData(data.data.items)
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
                  <button onClick={() => save(user.uid, image.link)} className={styles.button}>
                    <LikeButton />
                  </button>
                ) : (
                  <button onClick={() => Delete(user.uid, image.link)} className={styles.button}>
                    <LikedButton />
                  </button>
                )}
              </li>
            ))
          : ''}
      </ul>
      {data ? (
        <>
          <PrimaryButton
            label='get'
            onClick={prevSet}
            color='#fff'
            background='#ff69b8'
            variant='contained'
          >
            前へ
          </PrimaryButton>
          <PrimaryButton
            label='get'
            onClick={nextSet}
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
