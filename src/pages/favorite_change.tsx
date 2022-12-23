import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FavoriteChangePage } from '@/components/templates/FavoriteChangePage'
import { AppLayout } from '@/layout/AppLayout'
import { Layout } from '@/layout/Layout'
const FavoriteChange: NextPageWithLayout = () => {
  return (
    <>
      <FavoriteChangePage />
    </>
  )
}
FavoriteChange.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default FavoriteChange
