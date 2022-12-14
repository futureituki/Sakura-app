import { NextPageWithLayout } from 'next'
import { HomePage } from '@/components/templates/HomePage'
import { Layout } from '@/layout/Layout'
import { Suspense } from 'react'

const Home: NextPageWithLayout = () => {
  return (
    <>
    <Suspense fallback={'loading'}>
      <HomePage />
    </Suspense>
    </>
  )
}
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
