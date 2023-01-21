import axios from 'axios'
import { NextPageWithLayout, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import useSWR from 'swr'
import { FavoriteChangePage } from '@/components/templates/FavoriteChangePage'
import { AdminAUTH } from '@/firebase/server'
import { AppLayout } from '@/layout/AppLayout'
import useLogin from '@/lib/hook/useLogin'
const FavoriteChange: NextPageWithLayout = () => {
  const router = useRouter()
  const { data, error } = useLogin()
  if (!data) return <div>Loading</div>
  if (data.user === null) router.push('/login')
  return (
    <>
      <FavoriteChangePage />
    </>
  )
}
FavoriteChange.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default FavoriteChange
