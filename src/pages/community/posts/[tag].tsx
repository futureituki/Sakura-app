import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { AppLayout } from '@/layout/AppLayout'
import { SelectTagPostPage } from '@/components/templates/SelectTagPostPage'
import { useRouter } from 'next/router'
const SelectTagPost: NextPageWithLayout = () => {
  const router = useRouter()
  const { tag } = router.query
  return (
    <>
      <SelectTagPostPage tagName={tag as string} />
    </>
  )
}
SelectTagPost.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default SelectTagPost
