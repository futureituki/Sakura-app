import { NextPageWithLayout } from 'next'
import { MusicListPage } from '@/components/templates/MusicListPage'
import { AppLayout } from '@/layout/AppLayout'
const MusicList: NextPageWithLayout = () => {
  return (
    <>
      <MusicListPage />
    </>
  )
}
MusicList.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default MusicList
