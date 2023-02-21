import { NextPageWithLayout } from 'next'
import { PasswordResetPage } from '@/components/templates/PasswordResetPage'
import { Layout } from '@/layout/Layout'
const Reset: NextPageWithLayout = () => {
  return (
    <>
      <PasswordResetPage />
    </>
  )
}
Reset.getLayout = (page) => <Layout>{page}</Layout>

export default Reset
