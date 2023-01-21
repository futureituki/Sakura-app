import axios from 'axios'
import { NextPageWithLayout, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { ChangeOshimenPage } from '@/components/templates/ChangeOshimenPage'
import { AppLayout } from '@/layout/AppLayout'
import useLogin from '@/lib/hook/useLogin'
const ChangeOshimen: NextPageWithLayout = () => {
  const router = useRouter()
  const { data, error } = useLogin()
  if (!data) return <div>Loading</div>
  if (data === null) router.push('/login')
  return (
    <>
      <ChangeOshimenPage />
    </>
  )
}
ChangeOshimen.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default ChangeOshimen
