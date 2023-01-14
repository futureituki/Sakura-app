import { ParsedUrlQuery } from 'querystring'
import { GetStaticProps, NextPageWithLayout } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SelectTagPostPage } from '@/components/templates/SelectTagPostPage'
import { AppLayout } from '@/layout/AppLayout'

const SelectTagPost: NextPageWithLayout = () => {
  const router = useRouter()
  if (router.query.tag === undefined) return <div>Loading</div>
  const { tag } = router.query
  return (
    <>
      <SelectTagPostPage tagName={tag as string} />
    </>
  )
}
SelectTagPost.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default SelectTagPost
