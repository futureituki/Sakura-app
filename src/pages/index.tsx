import { NextPageWithLayout } from 'next'
import { Suspense } from 'react'
import { HomePage } from '@/components/templates/HomePage'
import { Layout } from '@/layout/Layout'

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
