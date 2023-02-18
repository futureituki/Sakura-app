import { NextPageWithLayout } from 'next'
import { DiscographyListPage } from '@/components/templates/DiscographyListPage'
import { single_id } from '@/constant/music-list'
import { AppLayout } from '@/layout/AppLayout'

const SingleList: NextPageWithLayout = () => {
  return (
    <>
      <DiscographyListPage list={single_id} />
    </>
  )
}

SingleList.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default SingleList
