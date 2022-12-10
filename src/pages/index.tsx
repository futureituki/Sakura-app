import { NextPageWithLayout } from 'next'
import { HomePage } from '@/components/templates/HomePage'
import { Layout } from '@/layout/Layout'

const Home: NextPageWithLayout = () => {
  return (
    <>
        <HomePage />
    </>
  )
}
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
