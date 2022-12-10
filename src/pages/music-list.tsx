import { NextPageWithLayout } from 'next'
import { TitleBar } from '@/components/atoms/TitleBar'
import { MusicListPage } from '@/components/templates/MusicListPage'
import { musicList } from '@/constant/music-list'
import { Layout } from '@/layout/Layout'
const MusicList: NextPageWithLayout = () => {
  return (
    <>
      <MusicListPage />
    </>
  )
}
MusicList.getLayout = (page) => <Layout>{page}</Layout>

export default MusicList
