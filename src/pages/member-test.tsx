import { Router } from '@mui/icons-material'
import { Box } from '@mui/material'
import axios from 'axios'
import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { MemberTestPage } from '@/components/templates/MemberTestPage'
import { Layout } from '@/layout/Layout'

const MemberTest: NextPageWithLayout = () => {
  return (
    <>
      <MemberTestPage />
    </>
  )
}

MemberTest.getLayout = (page) => <Layout>{page}</Layout>

export default MemberTest
