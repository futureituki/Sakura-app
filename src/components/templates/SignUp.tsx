import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { userSignUp } from '@/redux/userSlice'
import { User } from '@/types/user'

interface LoginForm {
  username: string
  email: string
  password: string
}

const SignUp: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: User) => state)
  const router = useRouter()
  console.log(user)
  const isValid: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    const userInfo = {
      username: data.username,
      email: data.email,
      password: data.password,
    }
    const user = dispatch(userSignUp(userInfo))
    // if(user == undefined || user || null) retur
    router.push('/mypage')
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
    <div className='mx-auto w-full max-w-lg'>
      <div className='flex w-full flex-col items-center justify-center p-10'>
        <Image
          src='/cat.jpg'
          width={130}
          height={130}
          layout='fixed'
          className='rounded-full shadow-lg'
          alt='profile'
        />
        <form
          onSubmit={handleSubmit(isValid, isInValid)}
          className='flex w-full  flex-col items-center space-y-5 '
        >
          <div className='flex w-full flex-col space-y-2'>
            <label className='text-sm text-gray-800' htmlFor='username'>
              {user.email}
            </label>
            <input
              {...register('username', { required: 'ユーザーネームを入力してください' })}
              className='rounded-md border px-3 py-2 focus:border-2 focus:border-teal-500 focus:outline-none'
              type='username'
              name='username'
            />
            {errors.username && (
              <div className='flex rounded-lg bg-red-100 p-4 dark:bg-red-200' role='alert'>
                <svg
                  className='h-5 w-5 flex-shrink-0 text-red-700 dark:text-red-800'
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
                <div className='mt-1 ml-3 text-sm font-medium text-red-700 dark:text-red-800'>
                  {errors.username.message}
                </div>
              </div>
            )}
          </div>
          <div className='flex w-full flex-col space-y-2'>
            <label className='text-sm text-gray-800' htmlFor='email'>
              Email
            </label>
            <input
              {...register('email', { required: 'emailを入力してください' })}
              className='rounded-md border px-3 py-2 focus:border-2 focus:border-teal-500 focus:outline-none'
              type='email'
              name='email'
            />
            {errors.email && (
              <div className='flex rounded-lg bg-red-100 p-4 dark:bg-red-200' role='alert'>
                <svg
                  className='h-5 w-5 flex-shrink-0 text-red-700 dark:text-red-800'
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
                <div className='mt-1 ml-3 text-sm font-medium text-red-700 dark:text-red-800'>
                  {errors.email.message}
                </div>
              </div>
            )}
          </div>
          <div className='flex w-full flex-col space-y-2'>
            <label className='text-sm text-gray-800' htmlFor='password'>
              Password
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
              <div className='flex rounded-lg bg-red-100 p-4 dark:bg-red-200' role='alert'>
                <svg
                  className='h-5 w-5 flex-shrink-0 text-red-700 dark:text-red-800'
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
                <div className='ml-3 text-sm font-medium text-red-700 dark:text-red-800'>
                  {errors.password.message}
                </div>
              </div>
            )}
          </div>
          <button
            className='w-full rounded-lg bg-teal-500 px-3 py-2 text-lg font-semibold text-white focus:outline-none'
            type='submit'
          >
            登録
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp