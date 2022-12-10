import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import SignUp from '@/components/templates/SignUp'
import { Layout } from '@/layout/Layout'
const Sign: NextPageWithLayout = () => {
  return (
    <>
      <SignUp />
    </>
  )
}
Sign.getLayout = (page) => <Layout>{page}</Layout>
export default Sign
