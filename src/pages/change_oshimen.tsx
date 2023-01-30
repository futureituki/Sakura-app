import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { LargeProgress } from '@/components/atoms/Loading/progress'
import { ChangeOshimenPage } from '@/components/templates/ChangeOshimenPage'
import { AppLayout } from '@/layout/AppLayout'
import useLogin from '@/lib/hook/useLogin'
const ChangeOshimen: NextPageWithLayout = () => {
  const router = useRouter()
  const { data, error } = useLogin()
  if (!data) return <LargeProgress />
  if (data === null) router.push('/login')
  return (
    <>
      <ChangeOshimenPage />
    </>
  )
}
ChangeOshimen.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default ChangeOshimen
