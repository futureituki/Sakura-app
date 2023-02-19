import { Router } from '@mui/icons-material'
import { Box } from '@mui/material'
import axios from 'axios'
import { NextPageWithLayout, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { PrimaryButton } from '@/components/atoms/Button'
import { MusicListPage } from '@/components/templates/MusicListPage'
import { music_id } from '@/constant/music-list'
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
