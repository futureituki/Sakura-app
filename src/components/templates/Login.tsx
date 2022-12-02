import { CircularProgress } from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { userLogin } from '@/redux/userSlice'
import styles from '@/styles/Form.module.css'

interface LoginForm {
  email: string
  password: string
}

const LoginPage: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const isValid: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    setLoading(true)
    const userInfo = {
      email: data.email,
      password: data.password,
    }
    const user = await dispatch(userLogin(userInfo))
    console.log(user.payload)
    if (user.payload === false) {
      console.log('false')
      if (ref.current) {
        ref.current.innerHTML = 'メールアドレスかパスワードが違います。'
        setLoading(false)
      }
      return
    }
    setTimeout(() => {
      router.push('/mypage')
    }, 3000)
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
        <Image
          src='/cat.jpg'
          width={60}
          height={60}
          layout='fixed'
          className='rounded-full shadow-lg'
          alt='profile'
        />
        <form
          onSubmit={handleSubmit(isValid, isInValid)}
          className='flex w-full  flex-col items-center space-y-5 '
        >
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
          <div className='flex w-full flex-col space-y-2'>
            <label className={styles.label} htmlFor='password'>
              パスワード
            </label>
            <input
              {...register('password', {
                required: 'passwordを入力してください',
                minLength: { value: 8, message: '8文字以上入力してください' },
              })}
              className='rounded-md border px-3 py-2 focus:border-2 focus:border-teal-500 focus:outline-none'
              type='password'
              name='password'
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
          </div>
          <button className={styles.button} type='submit'>
            {loading ? <CircularProgress style={{ width: '30px', height: '30px' }} /> : 'Login'}
          </button>
        </form>
        <div className={styles.after_error} ref={ref}></div>
      </div>
    </div>
  )
}

export default LoginPage
