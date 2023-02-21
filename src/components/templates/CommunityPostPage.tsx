import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import CloseIcon from '@mui/icons-material/Close'
import { LoadingButton } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactNode, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { PrimaryButton } from '../atoms/Button'
import { SmallProgress } from '../atoms/Loading/progress'
import { TitleBar } from '../atoms/TitleBar'
import { CustomizedSelects } from '../form/select'
import { GeneralModal } from '../modal/generalModal'
import styles from '@/components/templates/Community.module.css'
import { memberSrc } from '@/constant/memberSrc'
import { useGetUser } from '@/lib/user'
import { savePhoto } from '@/redux/communitySlice'

type SavePhotoProps = {
  uid: string
  file: File
  url: string
  title: string
  tag: string[]
}
type Post = {
  image: File
  title: string
}
export const CommunityPostPage = () => {
  const refImage = useRef<AvatarEditor>(null)
  const dispatch = useDispatch<any>()
  const user = useGetUser().user
  const router = useRouter()
  const [myFiles, setMyFiles] = useState<File>()
  const [open, setOpen] = useState<boolean>(false)
  const [tag, setTag] = useState<string>('')
  const [addedTag, setAddedTag] = useState<string[]>([])
  const [scale, setScale] = useState<number>(1.5)
  const [preview, setPreview] = useState<string>('')

  const handleChange = (event: { target: { value: string } }) => {
    setTag(event.target.value)
  }
  const addTag = () => {
    if (tag === '') return
    setAddedTag([...addedTag, tag])
    setTag('')
  }
  const sliceTag = (selectTag: string) => {
    setAddedTag(addedTag.filter((tag) => tag !== selectTag))
  }

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Post>()
  const onAccepted = (e: any) => {
    const { files } = e.target
    setMyFiles(files[0])
    setOpen(!open)
  }
  const handleClose = () => {
    setOpen(!open)
  }
  const handleScaleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value))
  }

  const getPropedImage = () => {
    const image = refImage.current?.getImage()
    const canvas = document.createElement('canvas')
    canvas.width = image?.width as number
    canvas.height = image?.height as number
    const cxt = canvas.getContext('2d')
    cxt?.drawImage(image!, 0, 0)

    setPreview(canvas.toDataURL('image/jpeg'))

    setOpen(!open)
  }

  const submit: SubmitHandler<{ title: string }> = async (data: { title: string }) => {
    const props: SavePhotoProps = {
      uid: user.uid,
      title: data.title,
      file: myFiles as File,
      url: preview,
      tag: addedTag,
    }
    await dispatch(savePhoto(props))
    router.push('/community')
  }
  return (
    <>
      <TitleBar>Photo</TitleBar>
      <Box
        sx={{
          width: '80vw',
          margin: '0 auto',
          maxWidth: '1440px',
        }}
        component='div'
      >
        <form onSubmit={handleSubmit(submit)}>
          <Box
            className={styles.input_box}
            sx={{
              width: '50vw',
              height: '50vw',
              background: '#f2f2f2',
              position: 'relative',
              margin: '40px auto',
              maxWidth: '900px',
            }}
            component='div'
          >
            <AddPhotoAlternateIcon
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '5vw',
                height: '5vw',
                transform: 'translate(-50%,-50%)',
              }}
            />
            {preview ? (
              <Image src={preview} width={300} height={300} alt='' className={styles.box_img} />
            ) : (
              ''
            )}
            <input
              {...register('image', {
                required: '画像を入力してください',
              })}
              type='file'
              id='image'
              name='image'
              onChange={onAccepted}
              style={{ width: '100%', height: '100%', opacity: 0 }}
            />
          </Box>
          {errors.image && (
            <Box className={styles.error_area} role='alert' component='div'>
              <Box
                sx={{
                  color: 'red',
                  fontSize: '1vw',
                }}
                component='div'
              >
                {errors.image?.message as ReactNode}
              </Box>
            </Box>
          )}
          <GeneralModal open={open} handleClose={handleClose}>
            {myFiles && (
              <div>
                <AvatarEditor
                  ref={refImage}
                  image={myFiles}
                  width={400}
                  height={400}
                  border={50}
                  color={[255, 255, 255, 0.6]} // RGBA
                  scale={scale}
                  rotate={0}
                  style={{ maxWidth: '900px', width: '80%' }}
                />
                <input
                  type='range'
                  defaultValue={scale}
                  min={0}
                  max={3}
                  step={0.1}
                  onChange={handleScaleChange}
                />
                <button
                  onClick={getPropedImage}
                  className='px-3 py-2 rounded-full bg-blue-400 text-white'
                >
                  保存
                </button>
              </div>
            )}
          </GeneralModal>
          {preview ? <button onClick={() => setPreview('')}>選び直す</button> : ''}
          <Box component='div'>
            <label className={styles.label} htmlFor='password'>
              タイトル
            </label>
            <TextField
              {...register('title', {
                required: 'タイトルを入力してください',
                maxLength: { value: 20, message: '20文字以下入力してください' },
              })}
              margin='normal'
              required
              id='title'
              label='タイトル'
              name='title'
              type='title'
            />
            {errors.title && (
              <Box className={styles.error_area} role='alert' component='div'>
                <Box
                  sx={{
                    color: 'red',
                    fontSize: '1vw',
                  }}
                  component='div'
                >
                  {errors.title?.message as ReactNode}
                </Box>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '15px',
              width: 'fit-content',
              height: '5vw',
              alignItems: 'center',
              margin: '15px 0',
            }}
            component='div'
          >
            <CustomizedSelects value={tag} handle={handleChange} title='タグ'>
              <option aria-label='None' value='' />
              {memberSrc.map((member, index: number) => (
                <option
                  disabled={addedTag.map((tag) => tag).includes(member.name) ? true : false}
                  key={index}
                  value={member.name}
                >
                  {member.name}
                </option>
              ))}
            </CustomizedSelects>
            <PrimaryButton
              label='タグ追加'
              variant='contained'
              color='#fff'
              background='#0067c0'
              onClick={addTag}
              disabled={tag === ''}
            >
              追加
            </PrimaryButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
            component='div'
          >
            {addedTag
              ? addedTag.map((tag: string, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      margin: '20px 0',
                      padding: '5px 10px',
                      background: '#f2f2f2',
                      width: 'fit-content',
                      borderRadius: '10px',
                    }}
                    component='div'
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                      component='div'
                    >
                      <span>{tag}</span>
                      <Box onClick={() => sliceTag(tag)} component='div'>
                        <CloseIcon />
                      </Box>
                    </Box>
                  </Box>
                ))
              : ''}
          </Box>
          <Box
            sx={{
              margin: '40px auto',
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
            }}
            component='div'
          >
            <PrimaryButton
              label='photo'
              variant='contained'
              color='#000'
              background='#f2f2f2'
              onClick={() => router.push('/community')}
            >
              もどる
            </PrimaryButton>
            {isSubmitting ? (
              <PrimaryButton
                label='photo'
                variant='contained'
                color='#fff'
                background='#f2f2f2'
                disabled={true}
              >
                <SmallProgress />
              </PrimaryButton>
            ) : (
              <PrimaryButton label='photo' variant='contained' color='#fff' background='#ff69b8'>
                投稿
              </PrimaryButton>
            )}
          </Box>
        </form>
      </Box>
    </>
  )
}
