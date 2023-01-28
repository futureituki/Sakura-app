import { Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { PrimaryButton } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { SelectModal } from '@/components/modal/selectModal'
import { memberSrc } from '@/constant/memberSrc'
import { GetImg } from '@/lib/img'
import { GetUser } from '@/lib/user'
import { setImages } from '@/redux/imageSlice'
import { userSaveBookmark } from '@/redux/userSlice'
import styles from '@/styles/Favorite.module.css'
import { UserReducer } from '@/types/user'

type SelectedProps = {
  name: string
  src: string
}
type Props = {
  id: string
  first_favorite: {
    name: string
    src: string
  }
}
export const FavoritePage = () => {
  const dispatch = useDispatch<any>()
  const [open, setOpen] = useState<boolean>(false)
  const images = GetImg().images.src
  const [selectedImg, setSelectedImg] = useState<SelectedProps>({ name: '', src: '' })
  const handleOpen = useCallback((e: any) => {
    const alt = e.target.alt
    const src = e.target.src
    const name = alt.slice(0, e.target.alt.indexOf('の'))
    let img_src = src.substr(src.indexOf('assets') - 1)
    setSelectedImg({ name: name, src: img_src })
    setOpen(true)
  }, [])
  const handleClose = () => setOpen(false)
  const user: UserReducer = GetUser().user
  const router = useRouter()
  useEffect(() => {
    if (router.query.sign) {
      toast.success('会員登録に成功しました！')
    }
  }, [])
  const handleClick = async () => {
    const userInfo: Props = {
      id: user.uid,
      first_favorite: { name: selectedImg.name, src: selectedImg.src },
    }
    dispatch(userSaveBookmark(userInfo))
    await dispatch(setImages({ uid: userInfo.id, sign: true }))
    router.push({ pathname: '/top', query: { first_come: true } })
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
        <SelectModal open={open} handleClose={handleClose}>
          <Image
            className={styles.member_img}
            src={`${selectedImg.src}`}
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
        </SelectModal>
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
