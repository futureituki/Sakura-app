import { NextPageWithLayout } from 'next'
import { PasswordResetPage } from '@/components/templates/PasswordResetPage'
import { AppLayout } from '@/layout/AppLayout'
const Reset: NextPageWithLayout = () => {
  return (
    <>
        <PasswordResetPage />
    </>
  )
}
Reset.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Reset
