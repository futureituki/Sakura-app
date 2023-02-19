import LoginIcon from '@mui/icons-material/Login'
import { Avatar, CircularProgress, TextField } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setImages } from '@/redux/imageSlice'
import { userLogin } from '@/redux/userSlice'
import styles from '@/styles/Form.module.css'

interface LoginForm {
  email: string
  password: string
}

const LoginPage: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const isValid: SubmitHandler<LoginForm> = async (data: LoginForm, e: any) => {
    e?.preventDefault()
    setLoading(true)
    const userInfo = {
      email: data.email,
      password: data.password,
    }
    const user = await dispatch(userLogin(userInfo))
    if (!user.payload) {
      if (ref.current) {
        toast.error('ログインに失敗しました。')
        ref.current.innerHTML = 'メールアドレスかパスワードが違います。'
        setLoading(false)
      }
      return
    }
    const uid = user.payload.uid as string
    await dispatch(setImages({ uid: uid, sign: false }))
    router.push('/top')
  }
  const isInValid: SubmitErrorHandler<LoginForm> = (errors: any) => {
    toast.error('ログインに失敗しました。')
    console.log('Fail Login')
  }
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()
  return (
    <div className={styles.form}>
      <div className={styles.form_container}>
        <Box
          component='div'
          sx={{
            marginTop: '10px',
          }}
        >
          <Avatar sx={{ m: 4, bgcolor: '#000' }}>
            <LoginIcon fontSize='medium' />
          </Avatar>
        </Box>
        <form onSubmit={handleSubmit(isValid, isInValid)}>
          <Box
            component='div'
            sx={{
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'column',
              width: '280px',
            }}
          >
            <label className={styles.label} htmlFor='email'>
              メールアドレス
            </label>
            <TextField
              {...register('email', { required: 'メールアドレスを入力してください' })}
              margin='normal'
              required
              fullWidth
              id='email'
              label='メールアドレス'
              name='email'
              type='email'
              autoComplete='email'
              autoFocus
            />
            {errors.email && (
              <div className={styles.error_area} role='alert'>
                <svg
                  className={styles.svg}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <div className={styles.error}>{errors.email.message}</div>
              </div>
            )}
          </Box>
          <Box
            component='div'
            sx={{
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <label className={styles.label} htmlFor='password'>
              パスワード
            </label>
            <TextField
              {...register('password', {
                required: 'パスワードを入力してください',
                minLength: { value: 8, message: '8文字以上入力してください' },
              })}
              margin='normal'
              required
              fullWidth
              id='password'
              label='パスワード'
              name='password'
              type='password'
              autoComplete='password'
              autoFocus
            />
            {errors.password && (
              <div className={styles.error_area} role='alert'>
                <svg
                  className={styles.svg}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <div className={styles.error}>{errors.password.message}</div>
              </div>
            )}
          </Box>
          <Box
            component='div'
            sx={{
              marginTop: '16px',
              fontSize: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Link href='/reset'>パスワードをお忘れの方</Link>
            <Link href='/sign'>会員登録はこちらから</Link>
          </Box>
          <button
            className={styles.button}
            style={loading ? { background: '#ccc' } : { background: '#ff69b8' }}
            type='submit'
            disabled={loading}
          >
            {loading ? <CircularProgress style={{ width: '20px', height: '20px' }} /> : 'ログイン'}
          </button>
        </form>
        <div className={styles.after_error} ref={ref}></div>
      </div>
    </div>
  )
}

export default LoginPage
