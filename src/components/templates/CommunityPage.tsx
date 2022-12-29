import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { Box } from '@mui/material'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { PrimaryButton } from '../atoms/Button'
import { TitleBar } from '../atoms/TitleBar'
import { GeneralModal } from '../modal/generalModal'
import styles from '@/components/templates/Community.module.css'
import { GetUser } from '@/lib/user'
import { savePhoto } from '@/redux/communitySlice'

type SavePhotoProps = {
  uid: string
  file: File
  url: string
  title: string
  tag: string[]
}
export const CommunityPage = () => {
  const [myFiles, setMyFiles] = useState<File>()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<File>()
  const [scale, setScale] = useState<number>(1.5)
  const [preview, setPreview] = useState<string>('')
  const refImage = useRef<AvatarEditor>(null)
  const [src, setSrc] = useState('')
  const user = GetUser().user
  const dispatch = useDispatch<any>()
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
  } = useForm()
  const onDropAccepted = useCallback((accetedFile: File[]) => {
    console.log
    setMyFiles(accetedFile[0])
    setOpen(!open)
  }, [])
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDropAccepted,
    accept: {
      'image/png': [],
      'image/jpeg': [],
    },
  })
  const handleClose = () => {
    setOpen(!open)
  }
  const handleScaleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value))
  }

  const getPropedImage = () => {
    const image = refImage.current?.getImage()
    console.log(image)
    const canvas = document.createElement('canvas')
    canvas.width = image?.width as number
    canvas.height = image?.height as number
    const cxt = canvas.getContext('2d')
    cxt?.drawImage(image!, 0, 0)

    setPreview(canvas.toDataURL('image/jpeg'))

    setOpen(!open)
  }
  const submit = async () => {
    if (preview.match(/^data:/)) {
      const data: SavePhotoProps = {
        uid: user.uid,
        title: 'test',
        file: myFiles as File,
        url: preview,
        tag: ['テスト', '藤吉'],
      }
      dispatch(savePhoto(data))
    }
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
            {...getRootProps()}
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
            <input
              name='userPhoto'
              {...getInputProps}
              className='hidden'
              style={{ overflow: 'hidden' }}
            />
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
          <Box
            sx={{
              margin: '40px auto',
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
            }}
          >
            <PrimaryButton label='photo' variant='contained' color='#000' background='#f2f2f2'>
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
