import { NextPageWithLayout } from 'next'
import { Suspense } from 'react'
import { LargeProgress } from '@/components/atoms/Loading/progress'
import { HomePage } from '@/components/templates/HomePage'
import { Layout } from '@/layout/Layout'
const Home: NextPageWithLayout = () => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <HomePage />
    </div>
  )
}
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
