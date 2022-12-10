import { NextPageWithLayout } from 'next'
import { MusicListPage } from '@/components/templates/MusicList'
import { musicList } from '@/constant/music-list'
import { Layout } from '@/layout/Layout'
const MusicList: NextPageWithLayout = () => {
  return (
    <>
      {musicList.map((music, index) => (
        <div key={index}>
          <MusicListPage src={music.src} name={music.name} img={music.img} />
        </div>
      ))}
    </>
  )
}
MusicList.getLayout = (page) => <Layout>{page}</Layout>

export default MusicList
