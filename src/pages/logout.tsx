import { NextPageWithLayout } from 'next'
import { Logout } from '@/components/templates/Logout'
import { Layout } from '@/layout/Layout'
const LogoutPage: NextPageWithLayout = () => {
  return (
    <>
      <Logout />
    </>
  )
}
LogoutPage.getLayout = (page) => <Layout>{page}</Layout>

export default LogoutPage
