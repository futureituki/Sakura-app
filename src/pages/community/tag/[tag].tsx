import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SelectTagPostPage } from '@/components/templates/SelectTagPostPage'
import { AppLayout } from '@/layout/AppLayout'
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
