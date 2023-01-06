import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import { Avatar, Box, CircularProgress, TextField } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { userSignUp } from '@/redux/userSlice'
import styles from '@/styles/Form.module.css'
import { User } from '@/types/user'
interface LoginForm {
  username: string
  email: string
  password: string
}

const SignUp: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const user = useSelector((state: User) => state)
  const router = useRouter()
  console.log(user)
  const isValid: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    const userInfo = {
      username: data.username,
      email: data.email,
      password: data.password,
    }
    setLoading(true)
    const user = await dispatch(userSignUp(userInfo))
    if (user) {
      router.push({ pathname: '/favorite', query: { sign: true } })
    }
    // if(user == undefined || user || null) retur
  }
  const isInValid: SubmitErrorHandler<LoginForm> = (errors: any) => {
    console.log(errors)
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
          sx={{
            marginTop: '10px',
          }}
        >
          <Avatar sx={{ m: 4, bgcolor: '#000' }}>
            <AssignmentIndIcon fontSize='large' />
          </Avatar>
        </Box>
        <form
          onSubmit={handleSubmit(isValid, isInValid)}
          className='flex w-full  flex-col items-center space-y-5 '
        >
          <div className='flex w-full flex-col space-y-2'>
            <label className={styles.label} htmlFor='username'>
              ユーザー名
            </label>
            <input
              {...register('username', { required: 'ユーザー名' })}
              className='rounded-md border px-3 py-2 focus:border-2 focus:border-teal-500 focus:outline-none'
              type='username'
              name='username'
            />
            {errors.username && (
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
                <div className={styles.error}>{errors.username.message}</div>
              </div>
            )}
          </div>
          <div className='flex w-full flex-col space-y-2'>
            <label className={styles.label} htmlFor='email'>
              メールアドレス
            </label>
            <input
              {...register('email', { required: 'emailを入力してください' })}
              className='rounded-md border px-3 py-2 focus:border-2 focus:border-teal-500 focus:outline-none'
              type='email'
              name='email'
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
          </div>
          <Box
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
          <button
            className={styles.button}
            style={loading ? { background: '#ccc' } : { background: '#ff69b8' }}
            type='submit'
          >
            {loading ? <CircularProgress style={{ width: '30px', height: '30px' }} /> : '登録'}
          </button>
        </form>
        <div className={styles.after_error} ref={ref}></div>
      </div>
    </div>
  )
}

export default SignUp
