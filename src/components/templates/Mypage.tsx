import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const MyPage = () => {
  const user = useSelector((state) => state.user)
  console.log(user)
  const router = useRouter()
  useEffect(() => {
    if (user.user.uid === '') {
      router.push('/login')
    }
  }, [])
  return <h1 style={{ color: '#000' }}>{user.user.username}</h1>
}
