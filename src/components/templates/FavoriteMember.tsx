import { Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PrimaryButton } from '../atoms/Button'
import { Heading } from '../atoms/Heading'
import { GeneralModal } from '../modal/generalModal'
import { memberSrc } from '@/constant/memberSrc'
import { AppDispatch } from '@/redux/store'
import { userSaveBookmark } from '@/redux/userSlice'
import styles from '@/styles/Favorite.module.css'
import { User } from '@/types/user'

type SelectedProps = {
  name: string
  src: string
}
export const FavoritePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedImg, setSelectedImg] = useState<SelectedProps>({ name: '', src: '' })
  const handleOpen = useCallback((e: any) => {
    const alt = e.target.alt
    const src = e.target.src
    console.log(e.target.alt.slice(0, e.target.alt.indexOf('の')))
    const name = alt.slice(0, e.target.alt.indexOf('の'))
    let img_src = src.substr(src.indexOf('2F') + 20)
    img_src = img_src.substr(0, img_src.indexOf('jpeg') + 4)
    setSelectedImg({ name: name, src: img_src })
    setOpen(true)
  }, [])
  const handleClose = () => setOpen(false)
  const user = useSelector((state: any) => state.user.user as User)
  const router = useRouter()
  // useEffect(() => {
  //   if (user.uid === '') {
  //     router.push('/login')
  //   }
  // }, [])
  const handleClick = () => {
    const userInfo = {
      id: user.uid,
      favorite: selectedImg.name,
    }
    dispatch(userSaveBookmark(userInfo))
  }
  return (
    <div>
      <div className={styles.favorite_container}>
        <Heading
          level={2}
          style={{ textAlign: 'center', color: '#000', fontSize: '1.4rem', margin: '20px 0' }}
        >
          気になるメンバーを決めよう！
        </Heading>
        <GeneralModal open={open} handleClose={handleClose}>
          <Image
            className={styles.member_img}
            src={`/assets/member/${selectedImg.src}`}
            alt={'member_img'}
            width={150}
            height={150}
          />
          <div className={styles.favorite_modal}>
            <Typography variant='h4'>{selectedImg.name}</Typography>
            <PrimaryButton
              label='button'
              color='#fff'
              background='#ff69b8'
              variant='contained'
              onClick={handleClick}
            >
              このメンバーにする
            </PrimaryButton>
          </div>
        </GeneralModal>
        <div className={styles.favorite_members}>
          {memberSrc.map((member, index) => (
            <div className={styles.member} key={index}>
              <Image
                onClick={(e) => handleOpen(e)}
                height={110}
                width={100}
                src={member.src}
                alt={member.name + 'の画像'}
                className={styles.member_img}
                defaultValue={member.name}
              />
              <p className={styles.member_name}>{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
