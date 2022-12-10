import { Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { MusicListPage } from '@/components/templates/MusicList'
import { homeFontTheme } from '@/config/fontFamilry'
import { musicList } from '@/constant/music-list'
import { Layout } from '@/layout/Layout'
const MusicList: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Sawarabi+Mincho' rel='stylesheet' />
      </Head>
      <ThemeProvider theme={homeFontTheme}>
        {musicList.map((music, index) => (
          <div key={index}>
            <MusicListPage src={music.src} name={music.name} img={music.img} />
          </div>
        ))}
      </ThemeProvider>
    </>
  )
}
MusicList.getLayout = (page) => <Layout>{page}</Layout>

export default MusicList
