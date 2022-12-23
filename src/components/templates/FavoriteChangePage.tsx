import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { memberSrc, memberSrcMap } from '@/constant/memberSrc'
import { GetUser } from '@/lib/user'
import { saveFavorite, saveFirstFavorite } from '@/redux/userSlice'

type Favorite = {
  name: string
  src: string
}
export const FavoriteChangePage = () => {
  const router = useRouter()
  const dispatch = useDispatch<any>()
  const [value, setValue] = useState<string>(router.query.name as string)
  const [favorite, setFavorite] = useState<Favorite>({
    name: router.query.name as string,
    src: router.query.src as string,
  })
  console.log(favorite)
  const user = GetUser().user
  useEffect(() => {
    if (!router.query.name) {
      router.push('/change_oshimen')
    }
  })
  const handleSubmit = async () => {
    const data = {
      id: user.uid,
      first_favorite: favorite,
      selectData: router.query as Favorite,
      favorite: user.favorite,
    }
    if (router.query.name !== user.first_favorite.name) {
      console.log(favorite, user, favorite)
      await dispatch(saveFavorite(data))
      router.push('/mypage')
    } else {
      await dispatch(saveFirstFavorite(data))
      router.push('/mypage')
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value
    console.log(target)
    const selectMember: Favorite = memberSrcMap.get(target) as Favorite
    setValue(target)
    setFavorite(selectMember)
  }
  return (
    <Box>
      現在の{router.query.name == user.first_favorite.name ? '「推しメン」' : '「気になる」'}
      <Box>
        <Image
          src={`/assets/member/${router.query.src}`}
          alt={router.query.name as string}
          width={150}
          height={150}
        />
        <p>{router.query.name}</p>
      </Box>
      <FormLabel id='demo-controlled-radio-buttons-group'>
        {router.query.name == user.first_favorite.name ? '「推しメン」' : '「気になる」'}
        に選択するメンバーを決めてください
      </FormLabel>
      <FormControl>
        <RadioGroup
          aria-labelledby='demo-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
          value={value}
          onChange={handleChange}
        >
          {memberSrc.map((member: Favorite, index: number) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                value={member.name}
                disabled={member.name == user.first_favorite.name || user.favorite.map((favoriteMember) => favoriteMember.name).includes(member.name) ? true : false}
                control={<Radio />}
                label={member.name}
              />
              <Box
                sx={{
                  display: 'flex',
                  gap: '15px',
                  alignItems: 'center',
                }}
              >
                {user.favorite.map((favoriteMember) => favoriteMember.name == member.name ? '気になる' : '')}
                {user.first_favorite.name == member.name ? '推しメン' : ''}
                <Image src={member.src} alt={member.name} width={100} height={100} />
              </Box>
            </Box>
          ))}
        </RadioGroup>
      </FormControl>
      <button onClick={handleSubmit}>登録する</button>
    </Box>
  )
}
