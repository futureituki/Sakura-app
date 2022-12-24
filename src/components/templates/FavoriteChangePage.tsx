import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { PrimaryButton } from '../atoms/Button'
import { TitleBar } from '../atoms/TitleBar'
import { GeneralModal } from '../modal/generalModal'
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
  const [open, setOpen] = useState<boolean>(false)
  const user = GetUser().user
  useEffect(() => {
    if (!router.query.name) {
      router.push('/change_oshimen')
    }
  })
  const handleClose = () => {
    setOpen(!open)
  }
  const handleSubmit = async () => {
    const data = {
      id: user.uid,
      first_favorite: favorite,
      selectData: router.query as Favorite,
      favorite: user.favorite,
    }
    if (router.query.name !== user.first_favorite.name) {
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
      <TitleBar>推しメン変更画面</TitleBar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '40px 0',
          color: '#666',
          fontSize: '3vw',
        }}
      >
        登録する枠をタップしてください
      </Box>
      <Box
        sx={{
          background: '#f2f2f2',
          padding: '20px 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            padding: '20px 0',
          }}
        >
          <p style={{ fontSize: '2vw' }}>
            現在の{router.query.name == user.first_favorite.name ? '「推しメン」' : '「気になる」'}
          </p>
          <Image
            src={`/assets/member/${router.query.src}`}
            alt={router.query.name as string}
            width={100}
            height={100}
            style={{ width: '24vw', height: '24vw', borderRadius: '50%' }}
          />
          <p style={{ fontSize: '5vw' }}>{router.query.name}</p>
        </Box>
        <FormLabel id='demo-controlled-radio-buttons-group'>
          {router.query.name == user.first_favorite.name ? '「推しメン」' : '「気になる」'}
          に選択するメンバーを決めてください
        </FormLabel>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
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
                    width: '80vw',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    alignItems: 'center',
                    background: '#fff',
                    border: '1px solid #000',
                    padding: '15px 0',
                  }}
                >
                  <FormControlLabel
                    value={member.name}
                    disabled={
                      member.name == user.first_favorite.name ||
                      user.favorite
                        .map((favoriteMember) => favoriteMember.name)
                        .includes(member.name)
                        ? true
                        : false
                    }
                    control={<Radio />}
                    label={''}
                  />
                  <Image
                    src={member.src}
                    alt={member.name}
                    width={100}
                    height={100}
                    style={{ width: '20vw', height: '20vw', borderRadius: '50%' }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px',
                      alignItems: 'center',
                      width: '20vw',
                    }}
                  >
                    {user.favorite.map((favoriteMember: Favorite, index: number) =>
                      favoriteMember.name == member.name ? (
                        <p
                          key={index}
                          style={{
                            fontSize: '1.4vw',
                            border: '1px solid #000',
                            borderRadius: '2.5em',
                            padding: '5px 10px',
                          }}
                        >
                          気になる
                        </p>
                      ) : (
                        ''
                      ),
                    )}
                    {user.first_favorite.name == member.name ? (
                      <p
                        style={{
                          fontSize: '1.4vw',
                          border: '1px solid #000',
                          borderRadius: '2.5em',
                          padding: '5px 10px',
                        }}
                      >
                        推しメン
                      </p>
                    ) : (
                      ''
                    )}
                    <p>{member.name}</p>
                  </Box>
                </Box>
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            alignItems: 'center',
            gap: '20px',
            margin: '20px 0',
          }}
        >
          <PrimaryButton
            label='sign'
            color={`${router.query.name != favorite.name ? '#fff' : '#ccc'}`}
            background={`${router.query.name != favorite.name ? '#ff69b8' : '#f2f2f2'}`}
            disabled={router.query.name != favorite.name ? false : true}
            variant='contained'
            onClick={() => setOpen(!open)}
          >
            登録確認
          </PrimaryButton>
          <PrimaryButton
            label='sign'
            color='#fff'
            background='#ccc'
            variant='contained'
            onClick={() => router.push('/change_oshimen')}
          >
            もどる
          </PrimaryButton>
        </Box>
      </Box>
      <GeneralModal open={open} handleClose={handleClose}>
        <p style={{ fontSize: '4vw' }}>
          {router.query.name == user.first_favorite.name ? '「推しメン」' : '「気になる」'}
        </p>
        <Image
          src={`/assets/member/${favorite.src}`}
          alt={favorite.name}
          width={100}
          height={100}
          style={{ width: '30vw', height: '30vw', borderRadius: '50%' }}
        />
        <p style={{ fontSize: '5vw' }}>{favorite.name}</p>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            margin: '20px 0',
          }}
        >
          <PrimaryButton
            label='sign'
            color='#fff'
            background='#ff69b8'
            variant='contained'
            onClick={handleSubmit}
          >
            登録確認
          </PrimaryButton>
          <PrimaryButton
            label='sign'
            color='#fff'
            background='#ccc'
            variant='contained'
            onClick={handleClose}
          >
            閉じる
          </PrimaryButton>
        </Box>
      </GeneralModal>
    </Box>
  )
}
