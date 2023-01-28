import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SelectTagPostPage } from '@/components/templates/SelectTagPostPage'
import { TagListPage } from '@/components/templates/TagListPage'
import { AppLayout } from '@/layout/AppLayout'
const TagList: NextPageWithLayout = () => {
  const router = useRouter()
  return (
    <>
      <TagListPage />
    </>
  )
}
TagList.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default TagList
