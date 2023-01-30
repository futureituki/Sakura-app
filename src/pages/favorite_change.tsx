import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { FavoriteChangePage } from '@/components/templates/FavoriteChangePage'
import { AppLayout } from '@/layout/AppLayout'
import useLogin from '@/lib/hook/useLogin'
import { LargeProgress } from '@/components/atoms/Loading/progress'
const FavoriteChange: NextPageWithLayout = () => {
  const router = useRouter()
  const { data, error } = useLogin()
  if (!data) return <LargeProgress />
  if (data.user === null) router.push('/login')
  return (
    <>
      <FavoriteChangePage />
    </>
  )
}
FavoriteChange.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default FavoriteChange
