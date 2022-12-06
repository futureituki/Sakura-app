import { ThemeProvider } from '@mui/material/styles'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import { PasswordResetPage } from '@/components/templates/PasswordResetPage'
import { homeFontTheme } from '@/config/fontFamilry'
import { AppLayout } from '@/layout/AppLayout'
const Reset: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
      </Head>
      <ThemeProvider theme={homeFontTheme}>
        <PasswordResetPage />
      </ThemeProvider>
    </>
  )
}
Reset.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Reset
