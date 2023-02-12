import { NextPageWithLayout } from 'next'
import { SpotifySinglePage } from '@/components/templates/SpotifySingleListPage'
import { AppLayout } from '@/layout/AppLayout'
import useLoginApi from '@/lib/hook/useLoginApi'

const SingleList: NextPageWithLayout = () => {
  const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi()

  return (
    <>
      <SpotifySinglePage />
    </>
  )
}

SingleList.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default SingleList
