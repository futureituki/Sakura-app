import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { BlogPage } from '@/components/templates/BlogPage'
import { AppLayout } from '@/layout/AppLayout'
import { Getfetcher } from '@/lib/bing-search'
const Blog: NextPageWithLayout = () => {
  const router = useRouter()
  const name = router.query.blog
  return (
    <>
      <BlogPage name={name as string} />
    </>
  )
}

Blog.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Blog
