import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { User } from '@/types/user'

export const MyPage = () => {
  const user = useSelector((state: any) => state.user.user as User)
  console.log(user)
  const router = useRouter()
  useEffect(() => {
    if (user.uid === '') {
      router.push('/login')
    }
  }, [])
  return (
    <div>
      <h1 style={{ color: '#000' }}>{user.username}</h1>
      <ul>
        {user.favorite.map((bookmark, index) => (
          <li key={index}>
            <span>{bookmark}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
