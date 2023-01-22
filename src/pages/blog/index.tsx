import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { BlogHomePage } from '@/components/templates/BlogHomePage'
import { Member } from '@/components/templates/Member'
import { AppLayout } from '@/layout/AppLayout'

const BlogHome: NextPageWithLayout = () => {
  return (
    <>
      <BlogHomePage />
    </>
  )
}

BlogHome.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default BlogHome
