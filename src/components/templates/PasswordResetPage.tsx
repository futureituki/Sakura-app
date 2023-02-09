import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Alert, Avatar, Box, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { PrimaryButton } from '../atoms/Button'
import { usePasswordReset } from '@/firebase/firestore'
import styles from '@/styles/Form.module.css'

type SendForm = {
  email: string
}
export const PasswordResetPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const { error, success, passwordReset } = usePasswordReset()
  const isValid: SubmitHandler<SendForm> = async (data: SendForm) => {
    passwordReset(data.email)
  }
  const isInValid: SubmitErrorHandler<SendForm> = (errors: any) => {
    console.log(errors)
    console.log('Fail Login')
  }
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SendForm>()
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      component='div'
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        パスワード再設定
      </Typography>
      <Box component='form' onSubmit={handleSubmit(isValid, isInValid)} noValidate sx={{ mt: 1 }}>
        <TextField
          {...register('email', { required: 'メールアドレスを入力してください' })}
          margin='normal'
          required
          fullWidth
          id='email'
          label='メールアドレス'
          name='email'
          autoComplete='email'
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            gap: '20px',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
          component='div'
        >
          <PrimaryButton label='send_button' variant='contained' color='#fff' background='#ccc'>
            <Link href='/login'>
              <span>戻る</span>
            </Link>
          </PrimaryButton>
          <PrimaryButton label='send_button' variant='contained' color='#fff' background='#ff69b8'>
            送信
          </PrimaryButton>
        </Box>
      </Box>
      {error && <Alert severity='error'>メールアドレスに送信できませんでした</Alert>}
      {success && <Alert severity='success'>メールアドレスに送信しました</Alert>}
    </Box>
  )
}
