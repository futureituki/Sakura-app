import { NextPageWithLayout } from 'next'
import { DiscographyListPage } from '@/components/templates/DiscographyListPage'
import { album_id } from '@/constant/music-list'
import { AppLayout } from '@/layout/AppLayout'

const SingleList: NextPageWithLayout = () => {
  return (
    <>
      <DiscographyListPage list={album_id} />
    </>
  )
}

SingleList.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default SingleList
