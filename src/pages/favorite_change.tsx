import { NextPageWithLayout, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import nookies from 'nookies'
import { FavoriteChangePage } from '@/components/templates/FavoriteChangePage'
import { AdminAUTH } from '@/firebase/server'
import { AppLayout } from '@/layout/AppLayout'

const FavoriteChange: NextPageWithLayout = (email) => {
  return (
    <>
      <FavoriteChangePage />
    </>
  )
}
FavoriteChange.getLayout = (page) => <AppLayout>{page}</AppLayout>
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  const session = cookies.session || ''
  // セッションIDを検証して、認証情報を取得する
  const user = await AdminAUTH.verifySessionCookie(session, true).catch(() => null)

  // 認証情報が無い場合は、ログイン画面へ遷移させる
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      email: user.email,
    },
  }
}
export default FavoriteChange
