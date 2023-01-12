import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import { FavoritePage } from '@/components/templates/FavoriteMember'
import { Layout } from '@/layout/Layout'
const Favorite: NextPageWithLayout = () => {
  return (
    <>
      <FavoritePage />
    </>
  )
}
Favorite.getLayout = (page) => <Layout>{page}</Layout>

export default Favorite
