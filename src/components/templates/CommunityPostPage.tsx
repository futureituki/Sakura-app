import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import CloseIcon from '@mui/icons-material/Close'
import { Box, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactNode, useCallback, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { useDropzone } from 'react-dropzone'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { PrimaryButton } from '../atoms/Button'
import { TitleBar } from '../atoms/TitleBar'
import { CustomizedSelects } from '../form/select'
import { GeneralModal } from '../modal/generalModal'
import styles from '@/components/templates/Community.module.css'
import { memberSrc } from '@/constant/memberSrc'
import { GetUser } from '@/lib/user'
import { savePhoto } from '@/redux/communitySlice'

type SavePhotoProps = {
  uid: string
  file: File
  url: string
  title: string
  tag: string[]
}
export const CommunityPostPage = () => {
  const refImage = useRef<AvatarEditor>(null)
  const dispatch = useDispatch<any>()
  const router = useRouter()
  const [myFiles, setMyFiles] = useState<File>()
  const [open, setOpen] = useState<boolean>(false)
  const [tag, setTag] = useState<string>('')
  const [addedTag, setAddedTag] = useState<string[]>([])
  const [scale, setScale] = useState<number>(1.5)
  const user = GetUser().user
  const [preview, setPreview] = useState<string>('')

  const handleChange = (event: { target: { value: string } }) => {
    setTag(event.target.value)
  }
  const addTag = () => {
    setAddedTag([...addedTag, tag])
    setTag('')
  }
  // useEffect(() => {
  //   const gsReference = ref(
  //     storage,
  //     "gs://portofolio-fb1b5.appspot.com/images/wZXFmIP6MlVqAxBb5gar1Tkb7U22/9bdrcx1g.jpeg"
  //   )
  //   getDownloadURL(gsReference)
  // .then(url => {
  //   setImage(url)
  // })
  // })
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ title: string }>()
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
        }}
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
            }}
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
            {preview ? <img src={preview} className={styles.box_img} /> : ''}
            <input type='file' onChange={onAccepted} style={{ width: '100%' }} />
          </Box>
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
                />
                <input
                  type='range'
                  defaultValue={scale}
                  min={1}
                  max={2}
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
          <Box>
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
              <Box className={styles.error_area} role='alert'>
                <Box
                  sx={{
                    color: 'red',
                    fontSize: '1vw',
                  }}
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
            }}
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
              size='1vw'
              padding=''
              onClick={addTag}
              label='photo'
              variant='contained'
              color='#fff'
              background='#ff69b8'
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
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <span>{tag}</span>
                      <CloseIcon />
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
            <PrimaryButton label='photo' variant='contained' color='#fff' background='#ff69b8'>
              投稿
            </PrimaryButton>
          </Box>
        </form>
      </Box>
    </>
  )
}
