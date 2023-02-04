import { NextPageWithLayout } from 'next'
import { Suspense } from 'react'
import { LargeProgress } from '@/components/atoms/Loading/progress'
import { HomePage } from '@/components/templates/HomePage'
import { Layout } from '@/layout/Layout'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Suspense fallback={<LargeProgress />}>
        <HomePage />
      </Suspense>
    </>
  )
}
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
